import { useState } from "react";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { InvitationResult } from "../../molecules/admin/invitationResult";
import { RegisterAdminForm } from "./registerAdminForm";
import { ReissueActivationForm } from "./reissueActivationForm";
import { AssistedRecoveryForm } from "./assistedRecoveryForm";
import { AccountList } from "./accountList";

export function AccountInvitations() {
  const [invitation, setInvitation] = useState(null);

  return (
    <section aria-labelledby="invitations-heading">
      <AccountList revision={invitation} />
      <div className="mt-10 border-t border-line/75 pt-8">
        <div className="mb-5">
          <Title
            level="h2"
            id="invitations-heading"
            text="Cuentas e invitaciones"
          />
          <Paragraph
            size="sm"
            text="Emisión de códigos de activación y restablecimiento asistido."
            className="mt-0.5"
          />
        </div>
        {invitation && (
          <InvitationResult
            key={invitation.activationToken}
            invitation={invitation}
          />
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <RegisterAdminForm onIssued={setInvitation} />
          <ReissueActivationForm onIssued={setInvitation} />
        </div>
        <div className="mt-4">
          <AssistedRecoveryForm />
        </div>
      </div>
    </section>
  );
}
