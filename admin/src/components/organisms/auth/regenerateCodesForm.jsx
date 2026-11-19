import { useState } from "react";
import { regenerateCodes } from "../../../services/accountRecovery";
import { Paragraph } from "../../atoms/paragraph";
import { RecoveryCodes } from "./recoveryCodes";
import { ReauthenticationForm } from "./reauthenticationForm";

export function RegenerateCodesForm() {
  const [codes, setCodes] = useState(null);
  async function submit(proof) {
    const data = await regenerateCodes(proof);
    setCodes(data.recoveryCodes);
  }
  return (
    <ReauthenticationForm
      title="Renovar mis códigos de recuperación"
      submitText="Generar nuevos códigos"
      onSubmit={submit}
      result={
        codes && (
          <RecoveryCodes
            codes={codes}
            confirmText="Ya guardé los códigos"
            onSaved={() => setCodes(null)}
          />
        )
      }
    >
      <Paragraph text="Al generar diez códigos nuevos se invalidan todos los anteriores." />
    </ReauthenticationForm>
  );
}
