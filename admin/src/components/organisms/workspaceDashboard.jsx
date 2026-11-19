import { WORKSPACE_AREAS } from "../../data/workspaceAreas";
import { Paragraph } from "../atoms/paragraph";
import { Title } from "../atoms/titles";
import { RegenerateCodesForm } from "./auth/regenerateCodesForm";
import { ChangePasswordForm } from "./auth/changePasswordForm";
import { AreaCard } from "../molecules/areaCard";

export function WorkspaceDashboard({ admin }) {
  const visibleAreas = WORKSPACE_AREAS.filter((area) =>
    area.roles.includes(admin.role),
  );

  return (
    <>
      <section aria-labelledby="areas-heading" className="pt-8">
        <div className="mb-5">
          <Title level="h2" id="areas-heading" text="Áreas de trabajo" />
          <Paragraph
            size="sm"
            text="Selecciona un módulo según las funciones asignadas a tu cuenta."
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-4">
          {visibleAreas.map(
            ({ slug, path, Icon, title, description, pending }) => (
              <AreaCard
                key={slug}
                path={path}
                Icon={Icon}
                title={title}
                description={description}
                pending={pending}
              />
            ),
          )}
        </div>
      </section>

      <section
        aria-labelledby="security-heading"
        className="mt-12 border-t border-line/75 pt-8"
      >
        <Title
          level="h2"
          id="security-heading"
          text="Seguridad de mi cuenta"
        />
        <Paragraph
          size="sm"
          text="Opciones protegidas con contraseña actual y un código nuevo de tu autenticador."
          className="mt-1"
        />
        <div className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <RegenerateCodesForm />
          <ChangePasswordForm />
        </div>
      </section>
    </>
  );
}
