# Tutor Match MVP

Web app to match freelance tutors with parents/students by subject, age group, city/zip, and price. Tutors can toggle active/inactive; students can request matches and chat once accepted.

## Tech Stack

- Frontend: React (Vite), Axios, React Router
- Backend: Flask, Flask-JWT-Extended, Flask-PyMongo
- Database: MongoDB Atlas
- Deployment: Render (Flask web service + static React site) [web:17][web:24][web:27]

## Monorepo Structure

- `client/` – React app
  - `src/routes/` – pages (Login, Register, SearchTutors, Dashboards, Chat)
  - `src/components/` – UI components (Navbar, TutorCard, ChatWindow, etc.)
  - `src/services/` – API clients (authApi, tutorApi, matchApi, messageApi)
  - `src/context/` – `AuthContext` for auth state

- `server/` – Flask API
  - `app/__init__.py` – app factory, CORS, blueprints
  - `app/config.py` – settings + fixed SUBJECTS and AGE_GROUPS
  - `app/extensions.py` – Mongo + JWT instances
  - `app/models/` – thin Mongo helpers
  - `app/routes/` – auth, tutors, matches, messages, users
  - `app/utils/` – security and validation helpers
  - `wsgi.py` – entrypoint for gunicorn
  - `requirements.txt` – backend dependencies

## Backend Setup

From `server/`:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
