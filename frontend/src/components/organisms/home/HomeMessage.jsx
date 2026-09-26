import { Button } from "../../atoms/button";
import { ContactSteps } from "../../molecules/shared/contactSteps";
import { FormField } from "../../molecules/shared/formField";
import { CONTACT_FORM_GROUPS } from "../../../data/contactFormFields";
import { useContactForm } from "../../../hooks/globals/useContactForm";
import { Toast } from "../../molecules/shared/toast";

function HomeMessage() {
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
    <section
      className=" relative
        my-10 md:my-20 p-4 grid grid-cols-1 md:grid-cols-[9em_1fr] lg:grid-cols-[12em_1fr] gap-5
        mx-auto w-[96%] md:w-[90%] md:max-w-7xl py-6
        bg-blue-deep
      "
    > 
      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onClose={closeToast}
      />
      <ContactSteps activeStep={activeStep} errorStep={errorStep} orientation="responsive" />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 gap-5"
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

        <div className="col-span-2 sm:col-span-1 sm:row-span-1 flex flex-col sm:justify-around">
          {CONTACT_FORM_GROUPS[2].map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={setValue(field.name)}
              error={!!fieldErrors[field.name]}
            />
          ))}
          <Button
            type="submit"
            text={submitting ? "Enviando..." : "Enviar"}
            variant="danger"
            className="mx-auto"
            disabled={submitting}
          />
        </div>
      </form>
    </section>
  );
}

export { HomeMessage };