# 👥 Mentorship API

A backend API for managing a mentorship platform, built using **NestJS**, **TypeORM**, and **MySQL**. This system handles users, mentorship requests, sessions, feedback, authentication, and role-based access control.

---

## 🚀 Features

- **User Management**
  - Admin, Mentor, Mentee roles
  - Secure password hashing and login
- **Authentication**
  - JWT-based login
  - Role-based access control using decorators and guards
- **Mentorship Workflow**
  - Mentees can request mentorship
  - Mentors can accept or reject requests
  - Sessions can be scheduled, tracked, and marked as completed
- **Session Feedback**
  - Both mentor and mentee can leave feedback after a session
- **Scheduling Support**
  - Background jobs with `@nestjs/schedule` (for automated checks/reminders, etc.)
- **Admin Panel APIs**
  - Admin-only endpoints for managing users and sessions

---

## 🏗️ Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** MySQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Task Scheduling:** `@nestjs/schedule`

---

## 📁 Project Structure

src/
│
├── auth/ # Auth module (login, guards, roles)
├── database/
│ ├── entities/ # TypeORM entity definitions (User, MentorshipSession, etc.)
│ ├── repositories/ # Custom repositories (if needed)
│ └── data-source.ts # TypeORM config
│
├── module/
│ ├── users/ # Users module
│ ├── mentorship/ # Mentorship request logic
│ ├── mentorship-session/ # Session tracking
│ └── admin/ # Admin-only endpoints
│
├── libs/ # Configuration and shared constants
├── common/ # Shared utilities and decorators
└── main.ts # App entry point

yaml
Copy
Edit

---

## 🔐 Roles & Permissions

| Role   | Permissions                                     |
| ------ | ----------------------------------------------- |
| Admin  | Create users, manage sessions and feedback      |
| Mentor | Accept requests, manage sessions, give feedback |
| Mentee | Send requests, join sessions, give feedback     |

---

## 📦 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/mentorship-api.git
   cd mentorship-api
   Install dependencies:
   ```

bash
npm install
Configure environment variables:

bash
cp .env.example .env
Run the development server:

bash
npm run start:dev

⚙️ Configuration
Environment variables are managed in a .env file. Here's an example:

env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=mentorship_db
JWT_SECRET=your_jwt_secret
Make sure this matches the values referenced in your CONFIGURATION module.

🧪 Running Tests
Coming soon...

📖 API Documentation
Swagger documentation will be available at:

bash
http://localhost:3000/api
To enable Swagger, configure it inside main.ts or using a configureSwagger() function.

🛠 Development Tips
Run npm run build to build the project

Use npm run start:dev for development with hot reload

Keep entity filenames and import names case-matched exactly (important for TypeORM)

🧹 Troubleshooting
"Entity metadata ... was not found"
Make sure:

File names match the import case (User.entity.ts vs user.entity.ts)

All entities are correctly listed in your TypeORM entities array

You run rm -rf dist && npm run build after renaming/moving files

🙋‍♂️ Author
DAUDU TOBI
