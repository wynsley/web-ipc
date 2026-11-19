import { useCallback, useEffect, useRef, useState } from "react";
import { clearRecoveryPending } from "../../../services/session";
import { RECOVERY_KEY } from "../../../services/session/recoveryPending";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { StatusBanner } from "../../molecules/statusBanner";
import { ActivateForm } from "./activateForm";
import { LoginForm } from "./loginForm";
import { MfaForm } from "./mfaForm";
import { RecoveryCodes } from "./recoveryCodes";

export function AccessForm({ onAuthenticated, initialNotice }) {
  const [activating, setActivating] = useState(false);
  const [challenge, setChallenge] = useState(null);
  const [verified, setVerified] = useState(null);
  const [notice, setNotice] = useState(initialNotice);
  const heading = useRef(null);
  useEffect(() => {
    if (!verified) return;
    const cancel = (event) => {
      if (event.key === RECOVERY_KEY && !event.newValue) {
        setVerified(null);
        setNotice("Se canceló el acceso desde otra pestaña.");
      }
    };
    window.addEventListener("storage", cancel);
    return () => window.removeEventListener("storage", cancel);
  }, [verified]);
  useEffect(() => {
    setNotice(initialNotice);
  }, [initialNotice]);
  const back = useCallback((message) => {
    setActivating(false);
    setChallenge(null);
    setNotice(message);
  }, []);
  function accept(result) {
    setChallenge(null);
    if (result.recoveryCodes) {
      setVerified(result);
    } else {
      onAuthenticated(result.session);
    }
  }

  let title = "Iniciar sesión";
  if (activating)
    title = activating === "recover" ? "Recuperar cuenta" : "Activar cuenta";
  if (challenge)
    title = challenge.enrollmentRequired
      ? "Configurar el autenticador"
      : "Verificar identidad";
  if (verified) title = "Guarda tus códigos de recuperación";
  useEffect(() => {
    heading.current?.focus();
  }, [title]);

  const isSuccessNotice = notice?.startsWith("Cuenta activada");

  return (
    <section className="w-[min(100%,430px)] rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-8">
      <div className="flex items-center gap-2.5 border-b border-line pb-3">
        <div
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-blue-light"
        />
        <Paragraph
          as="span"
          size="small"
          variant="institutional"
          weight="semi"
          text="Acceso institucional · Personal IPC"
        />
      </div>
      <Title
        level="h2"
        size="page"
        tabIndex={-1}
        ref={heading}
        text={title}
        className="mt-5 mb-2"
      />
      {verified ? (
        <RecoveryCodes
          codes={verified.recoveryCodes}
          onSaved={() => {
            clearRecoveryPending();
            onAuthenticated(verified.session);
          }}
        />
      ) : challenge ? (
        <MfaForm challenge={challenge} onBack={back} onVerified={accept} />
      ) : activating ? (
        <ActivateForm
          recovering={activating === "recover"}
          onActivated={back}
          onBack={back}
        />
      ) : (
        <>
          <Paragraph text="Accede al panel con tu cuenta institucional." />
          {notice && (
            <StatusBanner
              role="status"
              variant={isSuccessNotice ? "success" : "info"}
              text={notice}
              className="mt-4"
            />
          )}
          <LoginForm
            onChallenge={(data) => {
              setNotice("");
              setChallenge({
                ...data,
                deadline: Date.now() + data.expiresIn * 1000,
              });
            }}
          />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
            <Button
              variant="link"
              text="Activar cuenta con código"
              onClick={() => {
                setNotice("");
                setActivating("activate");
              }}
            />
            <Button
              variant="link"
              text="Recuperar cuenta"
              onClick={() => {
                setNotice("");
                setActivating("recover");
              }}
            />
          </div>
        </>
      )}
    </section>
  );
}
