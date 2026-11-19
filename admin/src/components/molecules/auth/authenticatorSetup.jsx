import { useEffect, useState } from "react";
import { Image } from "@ipc/image";
import { renderQrWithLogo } from "../../../services/renderQrWithLogo";
import { Code } from "../../atoms/code";
import { Paragraph } from "../../atoms/paragraph";

export function AuthenticatorSetup({ provisioningUri, secret }) {
  const [source, setSource] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    if (!provisioningUri?.startsWith("otpauth://totp/")) {
      setFailed(true);
      return;
    }
    renderQrWithLogo(provisioningUri).then(
      (url) => {
        if (active) setSource(url);
      },
      () => {
        if (active) setFailed(true);
      },
    );
    return () => {
      active = false;
    };
  }, [provisioningUri]);

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
          onError={() => setFailed(true)}
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
