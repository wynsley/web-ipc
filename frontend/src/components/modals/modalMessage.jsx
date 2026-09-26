import { useClickOutside } from "../../hooks/modal/usClickOutside";
import { Button } from "../atoms/button";
import { useContactForm } from "../../hooks/globals/useContactForm";
import { CONTACT_FORM_GROUPS } from "../../data/contactFormFields";
import { ContactSteps } from "../molecules/shared/contactSteps";
import { FormField } from "../molecules/shared/formField";
import { Toast } from "../molecules/shared/toast";

function ModalMessage({ toggleModal }) {
  const modalRef = useClickOutside(toggleModal);
  const {
    values,
    activeStep,
    errorStep,
    fieldErrors,
    toast,
    closeToast,
    submitting,
    setValue,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-1000 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="relative w-md mx-5 sm:mx-auto md:w-xl p-5 bg-blue-deep"
      >
        <Toast
          type={toast.type}
          message={toast.message}
          visible={toast.visible}
          onClose={closeToast}
        />

        <ContactSteps
          activeStep={activeStep}
          errorStep={errorStep}
          orientation="horizontal"
          align="center"
          title="Comunícate con un asesor"
        />
        <hr className="my-5 text-blue" />

        <form
          onSubmit={handleSubmit}
          className="relative grid grid-cols-2 gap-y-5 gap-x-3"
        >
          <div className="flex flex-col justify-around">
            {CONTACT_FORM_GROUPS[0].map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={setValue(field.name)}
                error={!!fieldErrors[field.name]}
              />
            ))}
          </div>

          <div className="flex flex-col justify-around">
            {CONTACT_FORM_GROUPS[1].map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={setValue(field.name)}
                error={!!fieldErrors[field.name]}
              />
            ))}
          </div>

          <div className="col-span-2 flex flex-col gap-5">
            {CONTACT_FORM_GROUPS[2].map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={values[field.name]}
                onChange={setValue(field.name)}
                error={!!fieldErrors[field.name]}
              />
            ))}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                text="Cancelar"
                variant="secondary"
                onClick={toggleModal}
              />
              <Button
                type="submit"
                text={submitting ? "Enviando..." : "Enviar"}
                variant="danger"
                disabled={submitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export { ModalMessage };