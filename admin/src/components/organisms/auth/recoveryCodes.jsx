import { useEffect, useState } from "react";
import { copyText } from "../../../services/copyText";
import { Button } from "../../atoms/button";
import { Code } from "../../atoms/code";
import { Link } from "../../atoms/links";
import { Paragraph } from "../../atoms/paragraph";

export function RecoveryCodes({ codes, onSaved, confirmText = "Ya guardé los códigos. Abrir escritorio" }) {
  const [copied, setCopied] = useState(false);
  const downloadUrl =
    "data:text/plain;charset=utf-8," +
    encodeURIComponent(codes.join("\n") + "\n");

  useEffect(() => {
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  async function copyCodes() {
    setCopied(await copyText(codes.join("\n")));
  }

  return (
    <>
      <Paragraph text="Guarda estos códigos en un lugar seguro antes de continuar. Solo se muestran esta vez y cada uno permite un acceso." />
      <ul className="my-4.5 grid list-none gap-1 rounded-[7px] bg-soft p-3.5">
        {codes.map((code) => (
          <li key={code}>
            <Code text={code} />
          </li>
        ))}
      </ul>
      <div className="grid gap-2.5">
        {downloadUrl && (
          <Link
            href={downloadUrl}
            download="ipc-codigos-de-recuperacion.txt"
            variant="button"
            text="Descargar códigos (.txt)"
          />
        )}
        <Button
          variant="secondary"
          text={copied ? "Códigos copiados" : "Copiar códigos"}
          onClick={copyCodes}
        />
        <Button
          text={confirmText}
          onClick={onSaved}
        />
      </div>
    </>
  );
}
