# ShareCircle

ShareCircle is a community sharing platform built with **React + TypeScript + Vite** and **Supabase** for authentication and database.

## 🚀 Features
- User authentication with Supabase (signup, login, logout).
- Email confirmation flow:
  - After signup → Confirmation page (check your email).
  - After clicking email link → Email confirmed page (success, go to login).
- User profiles store `name` in metadata.
- Navbar updates dynamically:
  - Shows **Login / Signup** if not logged in.
  - Shows **User’s name + Logout** if logged in.
- Dashboard placeholder for shared items.
- Tailwind CSS for styling.

## 🛠 Tech Stack
- **React + TypeScript + Vite**
- **Supabase** (auth + database)
- **Tailwind CSS**

## 📦 Setup

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd g-share-circle-frontend
