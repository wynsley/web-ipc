import { useState } from "react";
import { Button } from "../../atoms/button";
import { Field } from "../../molecules/field";
import { PasswordField } from "../../molecules/passwordField";
import { StatusBanner } from "../../molecules/statusBanner";

export function ReauthenticationForm({
  title,
  submitText,
  children,
  onSubmit,
  result,
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setBusy(true);
    setError("");
    try {
      await onSubmit(
        { password: fields.get("password"), code: fields.get("code") },
        fields,
      );
      form.reset();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="mt-6 rounded-lg border border-line bg-white p-5">
      <summary className="cursor-pointer font-bold text-blue-dark">
        {title}
      </summary>
      {result || (
        <form onSubmit={submit} className="mt-4 grid max-w-md gap-4">
          {children}
          <PasswordField
            label="Tu contraseña actual"
            name="password"
            autoComplete="current-password"
            maxLength={128}
            required
          />
          <Field
            label="Código nuevo de tu autenticador"
            name="code"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            autoComplete="one-time-code"
            required
          />
          {error && <StatusBanner variant="danger" role="alert" text={error} />}
          <Button type="submit" disabled={busy} text={submitText} />
        </form>
      )}
    </details>
  );
}
