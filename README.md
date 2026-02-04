# Recruitment & Career Opportunities Platform (Frontend)

A modern, responsive frontend application for the Recruitment & Career Opportunities Platform. This interface allows job seekers to explore and apply for jobs, employers to manage job postings, and admins to monitor platform activity.

________________________________________

## Project Overview

The frontend is a React + TypeScript application that consumes the backend REST API. It focuses on usability, performance, and responsive design to deliver a smooth experience across devices.

### Main Goals
- Help job seekers easily find and apply for jobs
- Allow employers to manage job postings and applications
- Provide admins with dashboards and reports

________________________________________

## Team Members
- Patrick Niyigena
- Polycarpe Tuyishime
- Teta hugutte
- Tresor Mugisha

________________________________________

## Tech Stack
- **Framework:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Query / Context API
- **HTTP Client:** Axios
- **Build Tool:** Vite

________________________________________

## Project Structure

```
src/
│── components/       # Reusable UI components
│── pages/            # Page-level components
│── layouts/          # App layouts (Auth, Dashboard)
│── services/         # API calls (Axios)
│── routes/           # Route definitions
│── assets/           # Images & static files
│── App.tsx
│── main.tsx
```

________________________________________

## Core Features

### Job Seeker Features
- Browse job listings
- Search jobs by keyword
- Filter by category, location, or company
- View job details
- Apply for jobs
- Track application status

### Employer Features
- Create, edit, and delete job postings
- View applications per job
- Update application status
- View job performance (views & applications)

### Admin Features (Optional)
- Manage users and employers
- View platform statistics
- Access reports and analytics

________________________________________

## Authentication & Authorization
- JWT-based authentication
- Protected routes based on roles:
  - Job Seeker
  - Employer
  - Admin
- Unauthorized users are redirected to login

________________________________________

## API Integration

The frontend communicates with the backend using Axios.

```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

Environment variables are used to configure API endpoints.

________________________________________

## Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/recruitment-platform-frontend.git
cd recruitment-platform-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file:
```
VITE_API_URL=http://localhost:3000/api
```

### 4. Run the App
```bash
npm run dev
```

________________________________________

## Responsiveness & UX
- Fully responsive for desktop and mobile
- Accessible UI with clean layouts
- Fast loading using optimized API calls

________________________________________

## Future Enhancements
- AI-powered job recommendations
- Push notifications for new jobs
- Saved jobs feature
- Dark mode
- Progressive Web App (PWA)

________________________________________

## License

This project is developed for academic and learning purposes.

________________________________________

## Contribution Guidelines
- Follow component-based architecture
- Keep components reusable and clean
- Use meaningful commit messages
- Coordinate changes with the team

Happy building 🚀
