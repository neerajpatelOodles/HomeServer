# HomeCare Central — Milestone 2 Part 1

This package is limited to the agreed Part 1 scope:
- HR applicant dashboard
- Admin, Staff, Client, HR and Caregiver roles
- Public applicant form without document uploads
- Hiring stages: Applied, Screening, Interview, Offer, Hired, Rejected
- Automatic caregiver account creation when HR hires an applicant
- Default caregiver password: `Test@1234`

Email notifications, applicant document uploads, caregiver/client management, scheduling, visit management and operational caregiver/client dashboards are not included in this Part 1 package.

## Run
1. Copy `.env.example` to `.env` and set PostgreSQL credentials (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
2. `npm install`
3. `npm run db:setup`
4. `npm run dev`

The API defaults to port 5000. Use the root health endpoint `/api/health`.
