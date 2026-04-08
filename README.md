# Learning App — Homepage & Login Modal

A full-stack learning platform for students and teachers. This README focuses on the **Homepage** and **Login/Signup Modal**, which were the primary areas of development, including session persistence and bcrypt-hashed password authentication against a MySQL database.

---

## Project Structure

```
In2formation-Learning-App-Login-Page/
├── 2510-L4FT20-missionx-backend-t3/   # Node.js / Express API
│   ├── server.js                        # All routes and DB connection
│   ├── hash.js                          # Bcrypt hashing utility
│   └── .env                             # DB credentials (not committed)
└── 2510-L4FT20-missionx-frontend-t3/   # React / Vite frontend
    └── src/
        ├── App.jsx                      # Route definitions
        ├── context/AuthContext.jsx      # Auth state provider
        └── pages/
            ├── HomePage/                # Homepage components
            └── LoginSignup/             # Login/Signup modal
```

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 19, React Router 7, Vite, CSS Modules |
| Backend  | Node.js, Express 5                      |
| Database | MySQL2                                  |
| Auth     | bcrypt (hashed passwords)               |
| Other    | dotenv, cors, multer                    |

---

## Setup

### Backend

```bash
cd 2510-L4FT20-missionx-backend-t3
npm install
```

Create a `.env` file:

```
MYSQL_HOST=localhost
MYSQL_USER=your_user
MYSQL_PASS=your_password
MYSQL_DATABASE=your_database
PORT=4000
```

```bash
npm run dev
```

Server runs on `http://localhost:4000`

### Frontend

```bash
cd 2510-L4FT20-missionx-frontend-t3
npm install
npm run dev
```

App runs on `http://localhost:5173`

---

## Homepage

**File:** `src/pages/HomePage/HomePage.jsx`

The homepage is the app's entry point and manages the login modal's open/close state. It passes the logged-in `student` object down to child components so the header can reflect the current session.

**Components rendered on the homepage:**

| Component              | Purpose                                      |
|------------------------|----------------------------------------------|
| `Header`               | Nav bar — receives `student` and modal opener |
| `HeroBanner`           | Hero section with a "Get Started" CTA         |
| `RegisterLogin`        | Login/Signup modal (controlled by `isModalOpen`) |
| `WhatWeOffer`          | Programme overview section                   |
| `FunctionalElements`   | Feature highlights                           |
| `HowProgHelpsFunctional` | Tabbed content switcher                    |
| `CallToAction`         | Bottom CTA that also opens the modal         |
| `Footer`               | Global footer                                |

The modal can be triggered from three places: the Header, the HeroBanner, and the CallToAction block.

---

## Login / Signup Modal

**File:** `src/pages/LoginSignup/RegisterLogin.jsx`

A single modal component that handles both students and teachers, with Login and Signup tabs. The modal resets all form fields when closed.

### How it works

- `isOpen` prop controls whether the modal renders at all (`if (!isOpen) return null`)
- `activeTab` state (`"login"` or `"signup"`) switches between the two forms
- On close, a `useEffect` clears all four form state objects
- The exit button checks `localStorage` — if a session exists it logs the user out, otherwise it just closes the modal

### Session Persistence

On successful login, the user object returned from the backend is saved to `localStorage`:

```js
localStorage.setItem("loggedInUser", JSON.stringify(data.student));
```

On app load (`App.jsx`), this is read back to restore the session:

```js
const [student, setStudent] = useState(() => {
  const saved = localStorage.getItem("loggedInUser");
  return saved ? JSON.parse(saved) : null;
});
```

---

## API Routes

Backend runs on `http://localhost:4000`

### Auth Routes (my work)

| Method | Route             | Description                                      |
|--------|-------------------|--------------------------------------------------|
| POST   | `/student-login`  | Validates email, compares bcrypt hash, returns student object |
| POST   | `/student-signup` | Hashes password with bcrypt, inserts into `student` table |
| POST   | `/teacher-login`  | Same as student login but queries `teacher` table |
| POST   | `/teacher-signup` | Same as student signup but inserts into `teacher` table |

### Password Hashing

Passwords are never stored in plain text. On signup, bcrypt hashes the password with a salt round of 10:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

On login, bcrypt compares the submitted password against the stored hash:

```js
const match = await bcrypt.compare(password, result[0].password);
```

### Other Routes (team)

| Method | Route                       | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/`                         | Test route — returns all students  |
| GET    | `/projects`                 | All projects (optional subscription filter) |
| GET    | `/projects/:id`             | Single project by ID               |
| GET    | `/students/:id`             | Single student by ID               |
| POST   | `/api/projects/submit`      | Upload project image (multer)      |
| GET    | `/api/projects/submissions` | All submitted projects             |
| GET    | `/api/download`             | Download a submitted file          |

---

## Frontend Routes

Defined in `src/App.jsx`:

| Path                                    | Component            | Notes                              |
|-----------------------------------------|----------------------|------------------------------------|
| `/`                                     | `HomePage`           | Entry point, manages modal state   |
| `/loginsignup`                          | `RegisterLogin`      | Standalone modal route             |
| `/projectlibrary`                       | `ProjectLibrary`     | Redirect target after student login |
| `/studentdashboard`                     | `StudentDashboard`   | Nested layout route                |
| `/studentdashboard/learningobjective`   | `LearningObjective`  | Nested                             |
| `/studentdashboard/instructions`        | `Instructions`       | Nested                             |
| `/studentdashboard/videotutorial`       | `VideoTutorial`      | Nested                             |
| `/studentdashboard/makeproject`         | `MakeProject`        | Nested                             |
| `/studentdashboard/submitproject`       | `SubmitProject`      | Nested                             |
| `/teacherdashboard`                     | `TeacherDashboard`   | Nested layout route                |
| `/teacherdashboard/progresstracker`     | `ProgressTracker`    | Nested                             |
| `/teacherdashboard/studentprofiles`     | `StudentProfiles`    | Nested                             |
| `/teacherdashboard/helprequests`        | `HelpRequest`        | Nested                             |
| `/teacherdashboard/projectsubmissions`  | `ProjectSubmissions` | Nested                             |
| `/studentprofileviewer`                 | `StudentProfileViewer` |                                  |
| `/teacherprofileviewer`                 | `TeacherProfileViewer` |                                  |

After a successful student login the app redirects to `/projectlibrary`. After a successful teacher login it redirects to `/teacherdashboard`.
