import { changePassword } from "../../../services/accountRecovery";
import { logoutSession } from "../../../services/session";
import { Paragraph } from "../../atoms/paragraph";
import { PasswordField } from "../../molecules/passwordField";
import { ReauthenticationForm } from "./reauthenticationForm";

export function ChangePasswordForm() {
  async function submit(proof, fields) {
    const newPassword = fields.get("newPassword");
    if (newPassword !== fields.get("confirmPassword"))
      throw new Error("Las contraseñas nuevas no coinciden.");
    await changePassword({ ...proof, newPassword });
    await logoutSession("Contraseña cambiada. Inicia sesión nuevamente.");
  }
  return (
    <ReauthenticationForm
      title="Cambiar mi contraseña"
      submitText="Cambiar contraseña"
      onSubmit={submit}
    >
      <PasswordField
        name="newPassword"
        label="Nueva contraseña"
        minLength={15}
        maxLength={128}
        autoComplete="new-password"
        required
      />
      <PasswordField
        name="confirmPassword"
        label="Confirmar contraseña nueva"
        minLength={15}
        maxLength={128}
        autoComplete="new-password"
        required
      />
      <Paragraph text="Al guardar se cerrarán tus sesiones abiertas." />
    </ReauthenticationForm>
  );
}
