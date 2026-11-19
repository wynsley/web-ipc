import { useEffect, useState } from "react";
import {
  deactivateAccount,
  listAccounts,
} from "../../../services/accounts";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { AccountItem } from "../../molecules/admin/accountItem";
import { StatusBanner } from "../../molecules/statusBanner";

export function AccountList({ revision }) {
  const [attempt, setAttempt] = useState(0);
  const requestKey = `${revision}:${attempt}`;
  const [fetched, setFetched] = useState({
    key: "",
    accounts: null,
    error: "",
  });
  const [actionError, setActionError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [confirmingId, setConfirmingId] = useState(null);
  const [submittingId, setSubmittingId] = useState(null);

  useEffect(() => {
    let active = true;
    listAccounts()
      .then(({ accounts: loaded }) => {
        if (active) setFetched({ key: requestKey, accounts: loaded, error: "" });
      })
      .catch((failure) => {
        if (active)
          setFetched({
            key: requestKey,
            accounts: null,
            error: failure.message,
          });
      });
    return () => {
      active = false;
    };
  }, [requestKey]);

  const accounts = fetched.key === requestKey ? fetched.accounts : null;
  const error =
    actionError || (fetched.key === requestKey ? fetched.error : "");

  const activeAdminCount = (accounts || []).filter(
    (item) => item.role === "admin" && item.isActive,
  ).length;

  async function handleConfirmDeactivate(target) {
    setActionError("");
    setFeedback("");
    setSubmittingId(target.id);
    try {
      const { admin: updated } = await deactivateAccount(target.id);
      setFetched((current) => ({
        ...current,
        accounts: (current.accounts || []).map((item) =>
          item.id === updated.id
            ? { ...item, ...updated, deactivated: true }
            : item,
        ),
      }));
      setConfirmingId(null);
      setFeedback(
        `Cuenta de ${target.name} (${target.email}) desactivada. Sus sesiones activas fueron revocadas.`,
      );
    } catch (failure) {
      setActionError(failure.message);
    } finally {
      setSubmittingId(null);
    }
  }

  return (
    <section aria-labelledby="accounts-heading" className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Title level="h2" id="accounts-heading" text="Cuentas del personal" />
        <Button
          variant="link"
          disabled={!accounts && !error}
          text="Actualizar listado"
          onClick={() => {
            setActionError("");
            setFeedback("");
            setConfirmingId(null);
            setAttempt((value) => value + 1);
          }}
        />
      </div>

      {feedback && (
        <StatusBanner
          role="status"
          variant="success"
          text={feedback}
          className="mt-3 mb-0"
        />
      )}

      {error && (
        <StatusBanner
          role="alert"
          variant="danger"
          text={error}
          className="mt-3 mb-0"
        />
      )}

      {!accounts && !error ? (
        <Paragraph role="status" className="mt-3" text="Cargando cuentas…" />
      ) : accounts && !accounts.length ? (
        <Paragraph
          className="mt-3"
          text="Todavía no hay cuentas registradas."
        />
      ) : accounts ? (
        <ul className="mt-4 grid gap-3">
          {accounts.map((account) => (
            <AccountItem
              key={account.id}
              account={account}
              isProtectedLastAdmin={
                account.role === "admin" && activeAdminCount <= 1
              }
              confirming={confirmingId === account.id}
              submitting={submittingId === account.id}
              onStartConfirm={(id) => {
                setActionError("");
                setFeedback("");
                setConfirmingId(id);
              }}
              onCancelConfirm={() => setConfirmingId(null)}
              onConfirmDeactivate={handleConfirmDeactivate}
            />
          ))}
        </ul>
      ) : null}
    </section>
  );
}
