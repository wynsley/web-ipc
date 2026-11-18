export const scheduleSnapshot = (event) => ({
  status: event.status,
  startsAt: event.startsAt.toISOString(),
  endsAt: event.endsAt?.toISOString() ?? null,
  published: event.published,
});
export function recordScheduleChange(tx, before, after, action, reason, actor) {
  return tx.eventChange.create({
    data: {
      eventId: after.id,
      action,
      reason,
      before: scheduleSnapshot(before),
      after: scheduleSnapshot(after),
      actorId: actor.admin.id,
      actorName: actor.admin.name,
    },
  });
}
