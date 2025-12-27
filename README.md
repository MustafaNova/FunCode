# FunCode

**FunCode** – An app where you learn to code with fun! Whether it’s full-stack web development or cybersecurity, everything is included. Enjoy different coding events and game modes, like **1v1 Coding Battles** in real time or **Blind Coding Battles**.

## Features

* Full-stack web development & cybersecurity tutorials
* Real-time 1v1 Coding Battles
* Blind Coding Battles mode
* Tournament mode and League system to climb the ranks
* Open source: contribute and help improve the platform

## Our Philosophy

Analyze all other coding learning apps, find the best features, and improve them in our **FunCode** community. Spot weaknesses and make learning to code even better.

## Get Involved

So, what are you waiting for? Join this project and help make the world a little better, one line of code at a time.

---

*Contributions are welcome! Check out the repository, open issues, or submit pull requests.*

---

## Project Setup

### Prerequisites

#### Frontend (Angular)

* **Node.js**: v24.12.0
* **pnpm**: v10.26.2
* Optional: **Angular CLI** (if not installed globally)

#### Backend (NestJS)

* **NestJS**: v11.0.14
* **pnpm**: v10.26.2
---

## Running the App Locally

FunCode consists of **two separate applications** that must be running **at the same time**:

* 🧠 **Backend** – NestJS API (`/backend`)
* 🎨 **Frontend** – Angular app (`/frontend`)

> ⚠️ **Important:** Both the backend and frontend must be running for the app to work correctly.

---

### 1️⃣ Start the Backend (NestJS)

Open a terminal and run:

```bash
cd backend
pnpm install
pnpm run start
```

The backend will be available at `http://localhost:3000`.

---

### 2️⃣ Start the Frontend (Angular)

Open **another terminal** and run:

```bash
cd frontend
pnpm install
ng serve
```

The frontend will be available at `http://localhost:4200`.

---

### ✅ Recommended Workflow

* Terminal 1 → Backend (`pnpm run start`)
* Terminal 2 → Frontend (`ng serve`)
