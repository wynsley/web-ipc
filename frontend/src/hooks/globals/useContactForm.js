import { useState } from "react";
import { CONTACT_FORM_GROUPS } from "../../data/contactFormFields";
import { apiFetch } from "../../helpers/apiFetch";

const ALL_FIELDS = CONTACT_FORM_GROUPS.flat();

const buildInitialValues = () =>
  ALL_FIELDS.reduce((acc, field) => {
    acc[field.name] = field.type === "select" ? "0" : "";
    return acc;
  }, {});

function useContactForm() {
  const [values, setValues] = useState(buildInitialValues);
  const [activeStep, setActiveStep] = useState(1);
  const [errorStep, setErrorStep] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setValue = (name) => (e) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [name]: val }));
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: false } : prev));
    setErrorStep((prev) => (prev ? null : prev));
    setActiveStep((prev) => (prev < 2 ? 2 : prev));
  };

  const getMissingFields = () => {
    const missing = {};
    ALL_FIELDS.forEach((field) => {
      const val = values[field.name];
      const isEmpty = val === "" || val === "0";
      if (isEmpty) missing[field.name] = true;
    });
    return missing;
  };

  const reset = () => {
    setValues(buildInitialValues());
    setActiveStep(1);
    setErrorStep(null);
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const missing = getMissingFields();
    if (Object.keys(missing).length > 0) {
      setFieldErrors(missing);
      setErrorStep(activeStep);
      alert("Por favor, complete todos los campos.");
      return;
    }

    setFieldErrors({});
    setErrorStep(null);
    setActiveStep(3);
    setSubmitting(true);

    try {
      const response = await apiFetch("/contact", "POST", values);
      if (!response) throw new Error("Error en el envío");

      setActiveStep(4);
      setTimeout(reset, 2500);
    } catch (err) {
      console.error("Error al enviar el formulario de contacto:", err);
      setErrorStep(4);
      setTimeout(reset, 2500);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    activeStep,
    errorStep,
    fieldErrors,
    submitting,
    setValue,
    handleSubmit,
  };
}

export { useContactForm };