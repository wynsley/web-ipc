import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ROLE_LABELS } from "../../data/workspaceAreas";
import { Link } from "../atoms/links";
import { Paragraph } from "../atoms/paragraph";
import { Title } from "../atoms/titles";
import { StatusBanner } from "../molecules/statusBanner";
import { SidebarNav } from "../organisms/sidebarNav";

export function WorkspacePage({ admin, onLogout }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const main = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    main.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  async function exit() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await onLogout();
    } catch (failure) {
      setError(failure.message);
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-svh grid-cols-1 grid-rows-[auto_1fr] bg-surface lg:grid-cols-[264px_minmax(0,1fr)] lg:grid-rows-1">
      <Link
        href="#main-content"
        variant="button"
        text="Saltar al contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      />
      <SidebarNav admin={admin} busy={busy} onLogout={exit} />
      <main
        id="main-content"
        ref={main}
        tabIndex={-1}
        className="mx-auto w-full max-w-285 px-6 py-8 outline-none md:px-12 md:py-12"
      >
        <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
          <Title level="h1" size="section" text="Panel administrativo" />
          <Paragraph size="small" variant="default">
            {admin.name} · {ROLE_LABELS[admin.role]}
          </Paragraph>
        </header>
        {error && (
          <StatusBanner
            role="alert"
            variant="danger"
            text={error}
            className="mt-4"
          />
        )}
        <Outlet />
      </main>
    </div>
  );
}
