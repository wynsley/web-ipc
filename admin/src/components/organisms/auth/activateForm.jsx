import { useState } from "react";
import { completeRecovery } from "../../../services/accountRecovery";
import { activateAccount } from "../../../services/activateAccount";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Field } from "../../molecules/field";
import { PasswordField } from "../../molecules/passwordField";
import { StatusBanner } from "../../molecules/statusBanner";

export function ActivateForm({ onActivated, onBack, recovering = false }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    const token = fields.get("token").trim();
    const password = fields.get("password");
    const confirmPassword = fields.get("confirmPassword");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (recovering) {
        await completeRecovery(token, password);
        onActivated(
          "Contraseña restablecida. Inicia sesión para verificar tu identidad.",
        );
        return;
      }
      await activateAccount(token, password);
      onActivated(
        "Cuenta activada. Inicia sesión para configurar el autenticador.",
      );
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Paragraph
        text={
          recovering
            ? "Solicita un código de restablecimiento al responsable del IPC. Tras verificar tu identidad, te lo entregará por un canal privado."
            : "Introduce el código de invitación de un solo uso y crea una contraseña de al menos 15 caracteres."
        }
      />
      <form onSubmit={submit} aria-busy={busy} className="mt-8 grid gap-4.5">
        <Field
          label={
            recovering ? "Código de restablecimiento" : "Código de activación"
          }
          name="token"
          type="text"
          pattern="[A-Za-z0-9_\-]{43}"
          maxLength={43}
          autoComplete="off"
          spellCheck={false}
          required
          disabled={busy}
        />
        <PasswordField
          label="Nueva contraseña"
          name="password"
          minLength={15}
          maxLength={128}
          autoComplete="new-password"
          required
          disabled={busy}
        />
        <PasswordField
          label="Confirmar contraseña"
          name="confirmPassword"
          minLength={15}
          maxLength={128}
          autoComplete="new-password"
          required
          disabled={busy}
        />
        {error && <StatusBanner role="alert" variant="danger" text={error} />}
        <Button
          type="submit"
          disabled={busy}
          text={
            busy
              ? "Guardando…"
              : recovering
                ? "Restablecer contraseña"
                : "Activar cuenta"
          }
        />
      </form>
      <div className="mt-3 flex flex-wrap justify-between gap-2.5">
        <Button
          variant="link"
          disabled={busy}
          text="Volver al acceso"
          onClick={() => onBack("")}
        />
      </div>
    </>
  );
}
