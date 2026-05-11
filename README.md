# Raft ATS

Enterprise-grade Applicant Tracking System built with modern web technologies.

## Architecture

This is a monorepo setup using pnpm workspaces.

### Frontend
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: shadcn/ui
- State Management: Zustand

### Backend
- Framework: FastAPI
- Database: PostgreSQL
- ORM: SQLAlchemy
- Migrations: Alembic

### AI Modules
Independent services for ML/AI operations:
- Resume Parser
- Matching Engine
- Interview Analyzer

## Project Structure
```text
raft-ats/
├── apps/
│   ├── frontend/         # Next.js Application
│   ├── backend/          # FastAPI Service
│   └── ai-modules/       # AI Services
├── packages/
│   ├── ui/               # Shared UI Components
│   └── config/           # Shared Configurations
├── pnpm-workspace.yaml
└── package.json
```
