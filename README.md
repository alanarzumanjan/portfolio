# 🧭 Personal Portfolio — Fullstack Developer Website

Welcome to my personal portfolio — a project designed to present my skills, projects, experience, and technical profile as a developer.

---

## 📌 Project Goals

- Present my CV, skillset, and experience
- Showcase real-world pet projects
- Allow users to leave reviews and feedback
- Serve as a professional, digital business card

---

## 🌐 Site Structure

| Route                   | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `/`                     | Home page: intro, highlights, navigation links          |
| `/about`                | About me: skills, education, experience                 |
| `/projects`             | List of projects with brief descriptions                |
| `/projects/[slug]`      | Detailed project page with screenshots and user reviews |
| `/contact`              | Contact form for messages                               |
| `/cv` _(optional)_      | Interactive or downloadable CV (PDF format)             |
| `/reviews` _(optional)_ | List of user reviews for projects                       |

---

## 🧱 Architecture

### 💻 Frontend

- **Next.js (React)** — modern framework for SSR/SSG
- **TypeScript** — strong typing for reliability
- **Tailwind CSS** — fast, utility-first styling
- **shadcn/ui** — beautiful UI components
- **Framer Motion** — animations and transitions

### ⚙️ Backend

- **ASP.NET Core Web API** — REST API for projects and reviews
- **SQLite** — lightweight local database
- **Entity Framework Core** — ORM for managing the data layer

---

## 🔄 API Endpoints

| Method | Endpoint                     | Description                      |
| ------ | ---------------------------- | -------------------------------- |
| `GET`  | `/api/projects`              | Get list of all projects         |
| `GET`  | `/api/projects/{slug}`       | Get detailed project information |
| `GET`  | `/api/reviews/{projectSlug}` | Get all reviews for a project    |
| `POST` | `/api/reviews`               | Submit a new review              |

---

## 🗃️ Database Structure

### 📁 Projects

| Column        | Type     |
| ------------- | -------- |
| `Id`          | int      |
| `Slug`        | string   |
| `Title`       | string   |
| `Description` | string   |
| `Tags`        | string[] |
| `GitHubUrl`   | string   |
| `LiveUrl`     | string   |
| `ImageUrl`    | string   |

### 📁 Reviews

| Column        | Type     |
| ------------- | -------- |
| `Id`          | int      |
| `ProjectSlug` | string   |
| `Name`        | string   |
| `Text`        | string   |
| `CreatedAt`   | DateTime |

---

## 🚀 Getting Started

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run
```

## Backend (ASP.NET Core + SQLite)

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```
