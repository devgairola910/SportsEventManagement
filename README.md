# Sports Event Management System

A robust, full-stack application for managing and registering college sports events. Built with a modern Next.js frontend and a secure Node.js backend.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Auth

## Features
- **Public**: View upcoming sports events with a beautiful, modern UI.
- **Students**: Register accounts, enroll in events, and view registration status via their dashboard.
- **Admins**: Login securely, access the administration console, manage (CRUD) events, and approve/reject athlete registrations.

---

## Step-by-Step VS Code Setup Instructions

### Prerequisites
1. Ensure [Node.js](https://nodejs.org/) is installed.
2. Ensure [MongoDB](https://www.mongodb.com/try/download/community) is installed and running locally on port `27017` (or have a MongoDB Atlas connection string ready).

### 1. Backend Setup
1. Open up VS Code and open an integrated terminal (`Ctrl+~`).
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment:
   The backend already has a `.env` file generated with defaults:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sports-event-db
   JWT_SECRET=your_super_secret_jwt_key_here
   ```
   *(If you are using MongoDB Atlas, replace the URI above).*
5. Run the server:
   ```bash
   node server.js
   ```
   *(It should log: `Connected to MongoDB` and `Server running on port 5000`)*

### 2. Frontend Setup
1. Open *another* integrated terminal in VS Code (click the `+` icon in the terminal panel).
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to [http://localhost:3000](http://localhost:3000).

---

## Manual Verification Flow

To test the complete system, try the following flow:
1. **Create an Admin**: Click `Sign Up` in the top right. Register a new account and select **Administrator** as your role.
2. **Create an Event**: Once logged in as admin, go to **Manage Events** on the sidebar and create an event (e.g., Annual Football Championship).
3. **Logout**: Click sign out from the admin portal.
4. **Create a Student**: Click `Sign Up` and register a new account choosing **Athlete / Student**.
5. **Register for Event**: Find the event you just created on the homepage and click **View Details**, then **Register Now**.
6. **Admin Approval**: Logout of the student, login as the admin again, and navigate to **Registrations** to **Approve** the student's request.
7. **Verify**: Log back into the student account to see the `Approved` status on the dashboard!

---
*Built as a college project deliverable.*
