import { Navigate, Route, Routes } from "react-router-dom";
import { RoleRoute } from "./components/organisms/roleRoute";
import { WorkspaceDashboard } from "./components/organisms/workspaceDashboard";
import { AccessPage } from "./components/pages/accessPage";
import { AreaPage } from "./components/pages/areaPage";
import { WorkspacePage } from "./components/pages/workspacePage";
import { WORKSPACE_AREAS } from "./data/workspaceAreas";
import { useAdminSession } from "./hooks/useAdminSession";
import { logoutSession } from "./services/session";
import { WAITING_NOTICE } from "./services/session/recoveryPending";
import { Button } from "./components/atoms/button";
import { Paragraph } from "./components/atoms/paragraph";

import { useUnsavedChanges } from "./context/unsavedChanges";

export function AdminApp() {
  const { confirmExit } = useUnsavedChanges();
  const {
    session,
    restoring,
    waiting,
    notice,
    onAuthenticated,
    cancelPending,
  } = useAdminSession();
  if (restoring || waiting)
    return (
      <main className="grid min-h-svh place-content-center gap-4 bg-surface p-6 text-center">
        <Paragraph
          role="status"
          align="center"
          text={restoring ? "Recuperando sesión…" : notice || WAITING_NOTICE}
        />
        {waiting && !restoring && (
          <Button
            variant="secondary"
            text="Cancelar el acceso pendiente"
            onClick={cancelPending}
          />
        )}
      </main>
    );
  if (!session) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <AccessPage
              onAuthenticated={onAuthenticated}
              initialNotice={notice}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        element={
          <WorkspacePage
            admin={session.admin}
            onLogout={() => {
              if (confirmExit()) logoutSession();
            }}
          />
        }
      >
        <Route index element={<WorkspaceDashboard admin={session.admin} />} />
        {WORKSPACE_AREAS.map((area) => (
          <Route
            key={area.slug}
            path={area.path}
            element={
              <RoleRoute role={session.admin.role} allowed={area.roles}>
                <AreaPage area={area} />
              </RoleRoute>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
