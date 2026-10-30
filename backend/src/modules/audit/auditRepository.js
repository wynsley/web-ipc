// Recibe la transacción existente para conservar la atomicidad de la operación.
export function recordAudit(tx, action, actorId, targetId, requestId) {
  return tx.auditLog.create({ data: { action, actorId, targetId, requestId } });
}
