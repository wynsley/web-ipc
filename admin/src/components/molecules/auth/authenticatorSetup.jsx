import { useEffect, useState } from "react";
import { Image } from "@ipc/image";
import { renderQrWithLogo } from "../../../services/renderQrWithLogo";
import { Code } from "../../atoms/code";
import { Paragraph } from "../../atoms/paragraph";

export function AuthenticatorSetup({ provisioningUri, secret }) {
  const [result, setResult] = useState({ uri: "", source: null, failed: false });
  const validUri = Boolean(provisioningUri?.startsWith("otpauth://totp/"));

  useEffect(() => {
    if (!validUri) return;
    let active = true;
    renderQrWithLogo(provisioningUri).then(
      (url) => {
        if (active) setResult({ uri: provisioningUri, source: url, failed: false });
      },
      () => {
        if (active) setResult({ uri: provisioningUri, source: null, failed: true });
      },
    );
    return () => {
      active = false;
    };
  }, [provisioningUri, validUri]);

  const isCurrent = result.uri === provisioningUri;
  const failed = !validUri || (isCurrent && result.failed);
  const source = isCurrent ? result.source : null;

  return (
    <>
      <Paragraph
        text={
          failed
            ? "No se pudo mostrar el QR. Usa la clave manual para configurar el autenticador."
            : "En Authy u otra aplicación autenticadora, añade una cuenta y escanea este QR."
        }
      />
      <div className="my-4 inline-block rounded-xl border border-line bg-white p-2.5">
        <Image
          src={failed ? null : source}
          alt="QR para configurar el autenticador de IPC"
          className="aspect-square w-[min(100%,220px)] rounded-lg bg-blue-dark"
          loading="eager"
          onError={() =>
            setResult({ uri: provisioningUri, source: null, failed: true })
          }
        />
      </div>
      <details open={failed || undefined} className="rounded-lg border border-line bg-soft p-3">
        <summary className="cursor-pointer">
          <Paragraph
            as="span"
            variant="institutional"
            weight="semi"
            text="Introducir la clave manualmente"
          />
        </summary>
        <Code text={secret} className="mt-2 block" />
      </details>
    </>
  );
}
