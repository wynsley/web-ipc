import { useState } from "react";
import { issueRecovery } from "../../../services/accountRecovery";
import { Paragraph } from "../../atoms/paragraph";
import { Code } from "../../atoms/code";
import { Button } from "../../atoms/button";
import { Field } from "../../molecules/field";
import { ReauthenticationForm } from "../auth/reauthenticationForm";

export function AssistedRecoveryForm() {
  const [token, setToken] = useState("");
  async function submit(proof, fields) {
    const result = await issueRecovery({
      ...proof,
      email: fields.get("email").trim(),
      resetMfa: fields.has("resetMfa"),
      identityVerified: fields.has("verified"),
    });
    setToken(result.token);
  }
  return (
    <ReauthenticationForm
      title="Restablecer el acceso de otra cuenta"
      submitText="Emitir código de restablecimiento"
      onSubmit={submit}
      result={
        token && (
          <div className="mt-4 grid gap-3">
            <Paragraph text="Entrega este código al titular por el canal privado verificado. Vence en 15 minutos." />
            <Code text={token} />
            <Button text="Terminar entrega" onClick={() => setToken("")} />
          </div>
        )
      }
    >
      <Field
        name="email"
        label="Correo institucional de la persona"
        type="email"
        required
      />
      <label>
        <input type="checkbox" name="resetMfa" /> Reemplazar también el
        autenticador y anular sus códigos anteriores
      </label>
      <label>
        <input type="checkbox" name="verified" required /> Verifiqué la
        identidad de la persona con el registro institucional y confirmé un
        canal privado de entrega.
      </label>
    </ReauthenticationForm>
  );
}
