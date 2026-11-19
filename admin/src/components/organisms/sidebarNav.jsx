import { useState } from "react";
import { FiGrid, FiLogOut } from "react-icons/fi";
import { ROLE_LABELS, WORKSPACE_AREAS } from "../../data/workspaceAreas";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { Link } from "../atoms/links";
import { Paragraph } from "../atoms/paragraph";
import { Brand } from "../molecules/brand";

export function SidebarNav({ admin, busy, onLogout }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const visibleAreas = WORKSPACE_AREAS.filter((area) =>
    area.roles.includes(admin.role),
  );

  return (
    <aside className="self-start border-b border-line bg-blue-deep px-5 py-3.5 text-ink lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0 lg:px-5 lg:py-6">
      <div className="flex items-center justify-between gap-3 lg:border-b lg:border-line lg:pb-5">
        <Link onClick={close} to="/" variant="plain" className="text-white">
          <Brand />
        </Link>
        <Button
          variant="light"
          size="sm"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="workspace-menu"
          text="Menú"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        id="workspace-menu"
        className={
          open
            ? "mt-4 flex flex-col gap-5 lg:flex-1"
            : "hidden lg:mt-6 lg:flex lg:flex-1 lg:flex-col lg:gap-5"
        }
      >
        <nav
          aria-label="Navegación del panel"
          className="flex flex-col gap-1"
        >
          <Link nav onClick={close} to="/" end className="min-h-11">
            <FiGrid aria-hidden="true" className="shrink-0 text-[17px]" />
            <Paragraph as="span" text="Escritorio" />
          </Link>
          {visibleAreas.map(({ slug, path, Icon, title, pending }) => (
            <Link
              nav
              onClick={close}
              key={slug}
              to={path}
              className="min-h-11 justify-between"
            >
              <Paragraph as="span" className="flex items-center gap-3">
                <Icon aria-hidden="true" className="shrink-0 text-[17px]" />
                <Paragraph as="span" text={title} />
              </Paragraph>
              {pending && (
                <Paragraph
                  as="span"
                  size="small"
                  weight="normal"
                  text="En preparación"
                  className="text-[11px] opacity-75"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-line pt-4">
          <div className="mb-3 flex items-center justify-between gap-2 px-1">
            <Paragraph
              size="sm"
              variant="ink"
              weight="bold"
              text={admin.name}
              className="truncate"
            />
            <Badge
              variant="institutional"
              text={ROLE_LABELS[admin.role]}
              className="shrink-0"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            data-logout
            disabled={busy}
            onClick={onLogout}
            className="w-full"
          >
            <FiLogOut aria-hidden="true" />
            {busy ? "Cerrando sesión…" : "Cerrar sesión"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
