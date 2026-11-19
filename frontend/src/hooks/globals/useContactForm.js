import { useRef, useState } from "react";
import { CONTACT_FORM_GROUPS } from "../../data/contactFormFields";
import { submitContact } from "../../helpers/submitContact";
import { ContactFormValidator } from "../../validations/validationCredentials";

const ALL_FIELDS = CONTACT_FORM_GROUPS.flat();

const buildInitialValues = () =>
  ALL_FIELDS.reduce((acc, field) => {
    acc[field.name] = field.type === "select" ? "0" : "";
    return acc;
  }, {});

const initialToast = { visible: false, type: "error", message: "" };

function createIdempotencyKey() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `ipc-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function mapServerFieldErrors(fields) {
  if (!fields || typeof fields !== "object") return {};
  const mapped = {};
  for (const [key, messages] of Object.entries(fields)) {
    const first = Array.isArray(messages) ? messages[0] : messages;
    if (first && key !== "_form") mapped[key] = first;
  }
  return mapped;
}

function useContactForm() {
  const [values, setValues] = useState(buildInitialValues);
  const [activeStep, setActiveStep] = useState(1);
  const [errorStep, setErrorStep] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [toast, setToast] = useState(initialToast);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sending = useRef(false);
  const idempotencyKeyRef = useRef(null);

  const closeToast = () => setToast(initialToast);

  const setValue = (name) => (e) => {
    if (sending.current) return;
    let val = e.target.value;

    if (name === "phone") {
      // Solo dígitos y un '+' opcional al inicio
      val = val.replace(/[^\d+]/g, "");
      // Si hay más de un '+', deja solo el primero (y solo al inicio)
      val = val.replace(/(?!^)\+/g, "");
    }
    idempotencyKeyRef.current = null;
    setValues((prev) => ({ ...prev, [name]: val }));
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));
    setErrorStep((prev) => (prev ? null : prev));
    setActiveStep((prev) => (prev < 2 ? 2 : prev));
  };

  const validate = async () => {
    try {
      await ContactFormValidator.validateAsync(values, { abortEarly: false });
      return { valid: true, errors: {}, firstMessage: "" };
    } catch (err) {
      const errors = {};
      err.details.forEach((detail) => {
        const key = detail.path[0];
        if (!errors[key]) errors[key] = detail.message;
      });
      return {
        valid: false,
        errors,
        firstMessage:
          err.details[0]?.message || "Revisa los campos del formulario.",
      };
    }
  };

  const reset = () => {
    idempotencyKeyRef.current = null;
    setValues(buildInitialValues());
    setActiveStep(1);
    setErrorStep(null);
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending.current) return;
    sending.current = true;

    const { valid, errors, firstMessage } = await validate();

    if (!valid) {
      sending.current = false;
      setFieldErrors(errors);
      setErrorStep(activeStep);
      setToast({ visible: true, type: "error", message: firstMessage });
      return;
    }

    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = createIdempotencyKey();
    }

    setFieldErrors({});
    setErrorStep(null);
    setActiveStep(3);
    setSubmitting(true);

    try {
      await submitContact(values, {
        idempotencyKey: idempotencyKeyRef.current,
      });

      reset();
      setActiveStep(4);
      setSubmitted(true);
    } catch (err) {
      console.error("Error al enviar el formulario de contacto:", err);
      const serverErrors = mapServerFieldErrors(err.fields);
      if (Object.keys(serverErrors).length > 0) {
        setFieldErrors(serverErrors);
        idempotencyKeyRef.current = null;
      }
      setErrorStep(err.status === 422 ? 2 : 4);
      setToast({
        visible: true,
        type: "error",
        message: err.message || "Ocurrió un error al enviar. Intenta de nuevo.",
      });
    } finally {
      sending.current = false;
      setSubmitting(false);
    }
  };

  const startAgain = () => {
    idempotencyKeyRef.current = null;
    setSubmitted(false);
    setActiveStep(1);
  };

  return {
    values,
    activeStep,
    errorStep,
    fieldErrors,
    toast,
    closeToast,
    submitted,
    startAgain,
    submitting,
    setValue,
    handleSubmit,
  };
}

export { useContactForm };
