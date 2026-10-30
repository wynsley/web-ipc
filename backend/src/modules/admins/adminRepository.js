export const publicAdmin = { id: true, name: true, email: true, role: true, isActive: true };

export function createAdminRepository(db) {
  return {
    findByEmail: (email) => db.admin.findUnique({ where: { email } }),
  };
}
