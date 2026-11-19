import { useId } from "react";
import { ROLE_LABELS } from "../../../data/workspaceAreas";
import { inquiryNextActions } from "../../../helpers/inquiryMeta";
import { Button } from "../../atoms/button";
import { Select } from "../../atoms/select";

export function InquiryActionsBar({
  inquiry,
  isAdmin,
  assignees,
  busy,
  onAction,
  onAssign,
}) {
  const assigneeSelectId = useId();
  const actions = inquiryNextActions(inquiry);
  const canAssign =
    isAdmin && (inquiry.status === "new" || inquiry.status === "in_progress");

  const assigneeOptions = [
    { value: "", text: "Sin asignar" },
    ...assignees.map((person) => ({
      value: person.id,
      text: `${person.name} (${ROLE_LABELS[person.role] || person.role})`,
    })),
  ];
  if (
    inquiry.assignedTo &&
    !assignees.some((person) => person.id === inquiry.assignedTo.id)
  ) {
    assigneeOptions.push({
      value: inquiry.assignedTo.id,
      text: `${inquiry.assignedTo.name} (cuenta inactiva)`,
      disabled: true,
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line/80 bg-card/80 px-3.5 py-3">
      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            size="sm"
            text={action.label}
            disabled={busy}
            onClick={() => onAction(inquiry, action)}
          />
        ))}
      </div>

      {canAssign && (
        <div className="flex items-center gap-2">
          <label
            htmlFor={assigneeSelectId}
            className="font-poppins text-xs font-semibold text-muted"
          >
            Responsable
          </label>
          <Select
            id={assigneeSelectId}
            value={inquiry.assignedToId ?? ""}
            options={assigneeOptions}
            disabled={busy}
            onChange={(event) => onAssign(inquiry, event.target.value)}
            className="min-h-10 py-1.5 text-sm"
          />
        </div>
      )}
    </div>
  );
}
