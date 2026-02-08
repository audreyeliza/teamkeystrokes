# TutorMatch

TutorMatch is a web app that connects freelance tutors with students and parents, allowing matching by subject, age group, city/ZIP code, and hourly rate. Tutors can toggle their availability, receive match requests, and chat with students once a request is accepted.

## Live Site

Deployed app: `https://tutormatchfront.onrender.com/`

Monorepo: https://github.com/audreyeliza/teamkeystrokes

## Tech Stack

- Frontend: React (Vite), Axios, React Router.
- Backend: Flask, Flask-JWT-Extended, Flask-PyMongo.
- Database: MongoDB Atlas.
- Deployment: Render (Flask web service + static React site).

## Features

- Search for tutors by subject, age group, city/ZIP, and hourly rate.
- Student and tutor auth flows (login/register) with JWT-based authentication.
- Separate dashboards for tutors and students (e.g., managing profiles, matches, and messages).
- Tutor availability toggle (active/inactive) to control visibility in search results.
- Match request flow: students request a tutor, tutors accept/decline.
- Messaging/chat between tutors and students after a match is accepted.

## Monorepo Structure

- `client/` – React app.
  - `src/routes/` – Pages (Login, Register, SearchTutors, Dashboards, Chat).
  - `src/components/` – UI components (Navbar, TutorCard, ChatWindow, etc.).
  - `src/services/` – API clients (authApi, tutorApi, matchApi, messageApi).
  - `src/context/` – `AuthContext` for auth state.

- `server/` – Flask API.
  - `app/__init__.py` – App factory, CORS, blueprints.
  - `app/config.py` – Settings plus fixed `SUBJECTS` and `AGE_GROUPS`.
  - `app/extensions.py` – Mongo and JWT instances.
  - `app/models/` – Thin Mongo helpers.
  - `app/routes/` – Auth, tutors, matches, messages, users.
  - `app/utils/` – Security and validation helpers.
  - `wsgi.py` – Entrypoint for gunicorn.
  - `requirements.txt` – Backend dependencies.

## Local Development

### Prerequisites

- Node.js and npm for the frontend.
- Python 3.x and virtualenv (or equivalent) for the backend.

### Backend Setup (Flask API)

From the `server/` directory:

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
Set any required environment variables (e.g., MongoDB URI, JWT secret) in your preferred way (environment or .env).

Run the backend:

bash
flask run  # or python -m flask run, depending on your setup
The API will typically run on http://localhost:5000.

Frontend Setup (React + Vite)
From the client/ directory:

bash
npm install
npm run dev
By default, Vite will start the frontend on http://localhost:5173 (or the next available port).

Make sure the frontend API base URLs in src/services/ point to your local backend (e.g., http://localhost:5000).

About TutorMatch
After seeing inefficient and disconnected communication in freelance tutoring, Audrey Bolyard, Rashi Sharma, and Anishka Chokshi created TutorMatch as a one-stop platform for tutors and students. The goal is to make tutoring more transparent, efficient, and community-focused so that finding the right tutor feels easier than the subject itself.

text

4. Replace `https://YOUR-DEPLOY-URL-HERE` with your actual Render/Deploy URL.
5. Commit and push: `git add README.md && git commit -m "Update README" && git push`.
6. On GitHub, the repo homepage will automatically show the formatted README.
```
