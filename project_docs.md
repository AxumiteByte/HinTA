# 📖 Project Documentation – HITA Website (MERN)

## 🌍 Vision
The **Harar Innovation & Technology Agency (HITA)** website drives **innovation, digital transformation, and startup support** in Harar. It connects **citizens, startups, and agency staff** through services, vacancies, programs, events/news, and success stories, powered by a **fully admin-controlled CMS**.

## 🎯 Goals
- Promote **innovation, research, and digital literacy**.
- Provide a **centralized portal** for directorates, services, programs, and updates.
- Enable **transparent vacancy and job application management**.
- Empower admins with **full control over all pages**.
- Ensure **scalable, multilingual, and responsive design**.

## 👥 User Roles & Stories

### Roles
- **Visitor**: Browse content, services, programs, events/news, and vacancies.
- **User**: Register/login, apply for vacancies, track applications.
- **Admin**: Full control over content, users, vacancies, programs, events/news, directorates, and applicants.
- **Directorate Staff**: Manage content for their directorate pages only.

### Stories
- As a **visitor**, I can view services, programs, events/news, and vacancies.
- As a **user**, I can apply for vacancies and receive email updates.
- As an **admin**, I can manage all pages, media, and users.
- As a **directorate staff**, I can update only my department’s section.

## 🛡️ Admin Control System

The admin dashboard is a **comprehensive CMS** for managing website content, media, and users.

### 🔑 Features
- **Page & Content Management**:
  - Edit **Hero, About, Services, Directorates, Programs, Vacancies, Innovations, Events, and News**.
  - Upload and optimize images/PDFs via **Cloudinary**.
  - Support multilingual text (i18n).
- **Vacancy & Applicant Management**:
  - Create, edit, delete **vacancies**.
  - Review **applicants**, filter by status, update progress.
- **User Management**:
  - Manage **registered users** and roles (Admin, Staff, User).
  - Assign **directorate responsibilities** to staff.
- **Directorates & Services**:
  - Staff update their **department content**.
  - Admins approve or override edits.
- **Programs, Events, & News**:
  - Publish **programs, announcements, or success stories**.
  - Attach images/PDFs via **Cloudinary**.
- **System Settings**:
  - Manage **supported languages** (i18n).
  - Update **branding** (logos, footer, theme).
  - Configure **email templates** for notifications.

## ⚙️ System Workflow
1. **Visitors** browse services, vacancies, programs, events/news, and innovations.
2. **Users** register/login and apply for vacancies.
3. **Admins** manage programs, events/news, vacancies, directorates, applicants, and all pages via the CMS.
4. **Directorate staff** update their department’s content.
5. **Emails** sent via Mailtrap (dev) or SMTP (production).
6. **Images/media** uploaded and optimized via Cloudinary.

## 🧩 Architecture
```
[React Frontend] <--> [Express Backend] <--> [MongoDB Atlas]
(UI)               (REST API)            (Data Storage)
```
- **Frontend**: React 19, TailwindCSS, Framer Motion, i18n
- **Backend**: Node.js, Express.js, JWT Auth
- **Database**: MongoDB Atlas with Mongoose
- **Email**: Nodemailer + Mailtrap (development)
- **Image/Media**: Cloudinary (upload and optimization)
- **Deployment**: Vercel (frontend), Render/Heroku (backend)

## 📬 Email System (Mailtrap)

### Why Mailtrap?
Safely test emails (signup, password reset, application updates) **without sending to real users**.

### Setup
1. Create an account at [Mailtrap](https://mailtrap.io).
2. Get SMTP credentials.
3. Add to `/server/.env`:
```env
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
MAIL_FROM=no-reply@hita.gov
```
4. Preview emails in Mailtrap’s inbox.

## 🗓 Project Timeline (2 Months)

### 📅 Month 1 – Foundation
- ✅ Setup frontend (React, Tailwind, Framer Motion)
- ✅ Setup backend (Express, MongoDB Atlas)
- ✅ JWT authentication
- ✅ Mailtrap integration
- ✅ Initial Agile backlog

### 📅 Month 2 – Features
- ✅ Hero section with animated cards (i18n)
- ✅ Services, directorates, programs, events/news pages
- ✅ Vacancy/job application system
- ✅ Admin dashboard (CMS for all pages, programs, events/news, directorates, applicants)
- ✅ Navbar with dropdowns
- ✅ Responsive design (mobile-first)
- ✅ CI/CD pipelines (GitHub Actions, Vercel, Render)
- ✅ Cloudinary media upload integration

## 📋 Current Backlog
- [ ] **Vacancy filtering & search** (supports `?page=&limit=&status=`)
- [ ] **Directorate content editor** for staff
- [ ] **Analytics dashboard** for admins
- [ ] **Real-time notifications** (email/SMS)
- [ ] Expand **i18n translations**

## 🔮 Roadmap
- 📊 **Data analytics** for agency performance
- 🏢 **Collaboration tools** for startups & directorates
- 🔔 **Real-time notifications**
- 🌐 Integration with **national innovation networks**

## ⚙️ Developer Guide

### 🔧 Prerequisites
- **Node.js** ≥ 18
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Git**
- **Cloudinary** account

### 📥 Clone Repository
```bash
git clone https://github.com/your-org/hita.git
cd hita
```

### ⚙️ Environment Variables
**Backend (`/server/.env`):**
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hita
JWT_SECRET=supersecretkey
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
MAIL_FROM=no-reply@hita.gov
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (`/client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 📦 Install Dependencies
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### ▶️ Run the App
```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5000/api`

### 🧪 Run Tests
```bash
npm run test
```
*Note*: APIs include error handling (400, 401, 404) with JSON responses.

## 📂 Project Structure
```
/client
  /src
    /components   # Reusable UI components
    /pages        # Page-level views
    /store        # State management (Zustand/hooks)
    /i18n         # Multilingual config
/server
  /routes         # API endpoints
  /models         # Mongoose schemas
  /controllers    # Business logic
  /middleware     # Auth/validation
  /config         # DB, SMTP, Cloudinary setup
```

## 📈 Agile Workflow
- **Sprint Length**: 2 weeks
- **Scrum Board**: GitHub Projects / Trello / Jira
- **Meetings**: Weekly planning & retrospective
- **Definition of Done**:
  - Code **peer-reviewed** and merged
  - Tests **passing**
  - Deployed to **staging**
  - Docs **updated**

## 🤝 Contributing
1. Fork and clone the repo.
2. Create a branch: `git checkout -b feature/xyz`
3. Commit: `git commit -m "Add feature xyz"`
4. Push: `git push origin feature/xyz`
5. Open a **Pull Request**.

## 📜 License
MIT © 2025 Harar Innovation & Technology Agency

## 📚 API Reference
All endpoints use **JSON** payloads. JWT required for protected routes (`Authorization: Bearer <token>`).

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/register` | POST | Register a new user | No |
| `/api/auth/login` | POST | User login, returns JWT | No |
| `/api/users` | GET | List all users | Admin |
| `/api/users/:id` | PUT | Update user role/details | Admin |
| `/api/vacancies` | GET | List all vacancies | No |
| `/api/vacancies` | POST | Create a vacancy | Admin |
| `/api/vacancies/:id` | PUT | Update a vacancy | Admin |
| `/api/vacancies/:id` | DELETE | Delete a vacancy | Admin |
| `/api/applicants` | GET | List all applicants | Admin |
| `/api/applicants/:id` | PUT | Update applicant status | Admin |
| `/api/programs` | GET | List all programs | No |
| `/api/programs` | POST | Create a program | Admin |
| `/api/programs/:id` | PUT | Update a program | Admin |
| `/api/events` | GET | List all events | No |
| `/api/events` | POST | Create an event | Admin |
| `/api/news` | GET | List all news | No |
| `/api/news` | POST | Create a news article | Admin |
| `/api/director` | GET | List all directorates | No |
| `/api/director/:id` | PUT | Update directorate content | Admin/Staff |

*Notes*:
- **Auth**: Use `Authorization: Bearer <token>` header for protected routes.
- **Error Handling**: Returns JSON with `status` (e.g., 400, 401) and `message`.
- **Cloudinary**: Media uploads are handled via `/api/upload` (POST, Admin/Staff).