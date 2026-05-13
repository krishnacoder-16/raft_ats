# RAFT ATS

Modern Applicant Tracking System (ATS) built with Next.js, Express.js, Prisma ORM, and PostgreSQL.

## Overview

RAFT ATS is a recruitment management platform that helps recruiters manage:

- Candidates
- Job Requisitions
- Hiring Pipeline
- Recruitment Analytics

The platform includes a modern enterprise dashboard UI and a fully connected backend with PostgreSQL database integration.

---

# Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Zustand (State Management)
- Tailwind CSS / Custom UI Components

## Backend
- Node.js
- Express.js
- Prisma ORM

## Database
- PostgreSQL
- Supabase (Cloud PostgreSQL)

---

# Project Architecture

```txt
Frontend (Next.js)
        ↓
Backend API (Express.js)
        ↓
Prisma ORM
        ↓
Supabase PostgreSQL
```

---

# Features Implemented

## Dashboard
- Modern ATS dashboard UI
- KPI cards
- Hiring funnel visualization
- Analytics layout
- Responsive design

---

# Candidates Module

## Candidate Management
- Add new candidate
- Delete candidate
- Fetch live candidates from database
- Full-page candidate creation flow
- Dynamic candidate table

## Candidate Fields Supported

### Basic Information
- Full Name
- Email
- Phone Number
- City
- State
- ZIP

### Professional Information
- Current Company
- Current Role
- Total Experience
- Notice Period
- Assigned Recruiter

### Compensation
- Current CTC
- Expected CTC

### Skills
- Technical Skills (Tag Input)

### Resume Upload
- Resume Upload UI

### Notes
- Recruiter Notes

---

# Jobs Module

## Job Requisition Management
- Create new job requisition
- Delete jobs
- Edit job support
- Dynamic jobs table
- Full-page requisition form

## Job Fields Supported

### Basic Information
- Job Title
- Client Company
- Employment Type
- Priority Level

### Team Assignment
- Assigned Recruiters

### Experience & Compensation
- Experience Range
- Salary Budget
- Budget Currency
- Openings Count

### Skills & Education
- Education Requirement
- Required Skills & Technologies

### Job Description
- Summary & Description

### Hiring Locations
- Multiple Office Locations

### Publishing Settings
- Requisition Status

---

# Backend Setup Completed

## Installed Packages

```bash
npm install express cors dotenv pg prisma @prisma/client nodemon
```

---

# Prisma Setup

Initialized Prisma with PostgreSQL.

Created:
- prisma/schema.prisma
- .env

---

# Prisma Version Fix

Resolved Prisma v7 configuration issues by:
- Downgrading to Prisma v6
- Removing prisma.config.ts
- Restoring stable Prisma setup

---

# Database Connection

## Supabase PostgreSQL
Connected backend successfully with Supabase cloud PostgreSQL database.

## Important Fix
Database password contained:

```txt
@
```

Fixed using URL encoding:

```txt
%40
```

---

# API Endpoints

## Root API

```http
GET /
```

Returns:

```txt
ATS Backend Running 🚀
```

---

# Candidate APIs

## Get Candidates

```http
GET /candidates
```

## Create Candidate

```http
POST /candidates
```

## Delete Candidate

```http
DELETE /candidates/:id
```

---

# Job APIs

## Get Jobs

```http
GET /jobs
```

## Create Job

```http
POST /jobs
```

## Delete Job

```http
DELETE /jobs/:id
```

## Update Job

```http
PUT /jobs/:id
```

---

# Frontend Improvements Completed

## UI/UX Enhancements
- Consistent typography across dashboard, candidates, and jobs
- Fixed sidebar sizing and spacing
- Full-page forms instead of modal cards
- Better spacing and responsive layouts
- Sticky-free navigation improvements
- Proper table layouts

## Candidate Improvements
- Fixed table rendering
- Fixed action dropdown behavior
- Fixed scroll and overlay issues

## Jobs Improvements
- Fixed recruiter dropdown overlap
- Added enterprise salary input layout
- Fixed NaN input issues
- Fixed action menu clipping
- Fixed edit job flow

---

# State Management

Frontend state now supports:
- Loading states
- Error states
- Auto-refresh after CRUD actions
- Real-time UI sync after create/delete

---

# Database Models

## Candidate Model

Includes:
- personal details
- professional details
- salary details
- recruiter assignment
- technical skills
- notes

---

## Job Model

Includes:
- requisition details
- salary details
- hiring locations
- recruiter assignment
- publishing settings

---

# Running the Project

## Frontend

```bash
npm run dev
```

Runs on:

```txt
http://localhost:3000
```

---

# Backend

Navigate to backend:

```bash
cd apps/backend
```

Run server:

```bash
npm run dev
```

Runs on:

```txt
http://localhost:5000
```

---

# Prisma Commands

## Push Schema

```bash
npx prisma db push
```

## Generate Prisma Client

```bash
npx prisma generate
```

---

# Current Project Status

| Module | Status |
|---|---|
| Dashboard UI | ✅ Completed |
| Candidate UI | ✅ Completed |
| Candidate Backend | ✅ Completed |
| Jobs UI | ✅ Completed |
| Jobs Backend | ✅ Completed |
| PostgreSQL Integration | ✅ Completed |
| Prisma ORM | ✅ Completed |
| CRUD Operations | ✅ Completed |
| API Integration | ✅ Completed |

---

# Next Recommended Features

- Authentication & Role Management
- Resume Parsing
- AI Candidate Matching
- Email Notifications
- Interview Scheduling
- Activity Timeline
- File Storage Integration
- Advanced Analytics
- Pipeline Drag & Drop
- Search & Filters
- Pagination
- Production Deployment

---

# Author

RAFT ATS Development Project
