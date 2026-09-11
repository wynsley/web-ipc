
# WEb-IPC
Monorepo fullstack con **Express** + **Prisma** (backend) y **React + Vite** (frontend) para la plataforma del Instituto Privado Celendín, organizados mediante **pnpm workspaces**.
---

## Estructura
```
web-ipc/
├── package.json          ← Raíz: scripts globales de orquestación
├── pnpm-workspace.yaml  ← Configuración de espacios de trabajo pnpm
├── backend/              ← API REST con Express + Prisma
└── frontend/             ← SPA con React + Vite + Tailwind CSS
```

---

## Requisitos
- Node.js
- PostgreSQL

---

## Instalación
```bash
# 1. Clonar el repositorio
git clone [https://github.com/wynsley/web-IPC-C.git](https://github.com/wynsley/web-IPC-C.git)
cd web-ipc
 
# 2. Instalar dependencias, copiar .env y migrar la base de datos
pnpm run setup
# 2.1. Luego abre `backend/.env` y completa tus credenciales de ser necesario

# 3. Ejecutar en modo desarrollo
pnpm run dev
```

---

## Scripts disponibles
 
| Comando | Descripción |
|---|---|
| `pnpm run setup` | Instala deps + copia `.env.example` → `.env` + migra DB |
| `pnpm run dev` | Levanta backend y frontend en paralelo |
| `pnpm run db:migrate` | Corre migraciones de Prisma en el backend |
| `pnpm run build:frontend` | Build de producción del frontend |
| `pnpm run install:all` | Instala dependencias en raíz, backend y frontend |
| `pnpm run env` | Solo copia el `.env.example` al `.env` del backend |

---

## Desarrollo
 
```bash
pnpm run dev
```
 
| Servicio | URL por defecto |
|---|---|
| Backend (Express) | http://localhost:3000 |
| Frontend (Vite) | http://localhost:5173 |
 
---

## Base de datos
 
Las migraciones usan **Prisma**. Para crearlas manualmente:
 
```bash
pnpm run db:migrate
```
 
Esto ejecuta `prisma migrate dev && prisma generate` dentro del backend.
 
---
