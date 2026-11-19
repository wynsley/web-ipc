import { Image } from "@ipc/image";
import campus from "@ipc/campus";
import { Paragraph } from "../atoms/paragraph";
import { Title } from "../atoms/titles";
import { Brand } from "../molecules/brand";
import { AccessForm } from "../organisms/auth/accessForm";

export function AccessPage({ onAuthenticated, initialNotice }) {
  return (
    <main className="grid min-h-svh grid-cols-1 bg-surface md:grid-cols-2">
      <section className="relative isolate overflow-hidden border-b border-line bg-blue-dark text-white after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(160deg,#070b12b8_0%,#0b152899_38%,#070b12f5_85%)] md:border-r md:border-b-0">
        <Image src={campus} alt="" fill loading="eager" className="-z-20" />
        <div className="flex min-h-auto flex-col justify-between gap-7 p-6 md:min-h-svh md:gap-12 md:p-[clamp(32px,5vw,84px)]">
          <Brand />
          <div>
            <div className="mb-5.5 hidden h-1 w-12 bg-orange md:block" />
            <Title level="h1" size="cover" variant="primary">
              Panel <br className="hidden md:inline" /> administrativo
            </Title>
            <Paragraph
              variant="primary"
              text="Instituto Privado Celendín"
              className="mt-4.5 hidden text-white/80 md:block"
            />
          </div>
          <Paragraph
            as="span"
            size="small"
            variant="primary"
            text="Celendín, Cajamarca"
            className="hidden text-white/65 md:inline"
          />
        </div>
      </section>
      <section className="grid place-items-center bg-surface px-6 py-8 md:p-[clamp(24px,5vw,76px)]">
        <AccessForm
          onAuthenticated={onAuthenticated}
          initialNotice={initialNotice}
        />
      </section>
    </main>
  );
}
