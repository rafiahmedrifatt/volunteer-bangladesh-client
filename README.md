# 🌟 VolunteerConnect – A Volunteer Management Platform

## 📌 Project Purpose

VolunteerConnect is a user-friendly platform for managing volunteer activities. It allows users to post their volunteer needs and lets others join as volunteers. The platform promotes social contribution by making it easy to connect organizers and volunteers.

## 🌐 Live URL

[🔗 Live Website](https://your-volunteer-site.web.app)  
[🔗 Server Live URL (Vercel)](https://your-volunteer-api.vercel.app)

## 🛠️ Key Features

- 🔐 **Authentication System**
  - Email/Password login and registration
  - Google Sign-In
  - JWT-based route protection
- 🏠 **Home Page**
  - Responsive slider
  - Upcoming volunteer needs (sorted by deadline)
  - "See all" navigation
- 📋 **Post Management**
  - Add, update, delete posts (CRUD)
  - Display posts with detailed view
  - Volunteer request system with real-time decrement of volunteer slots
- 🔍 **Search Functionality**
  - Search volunteer posts by title (via backend)
- 🧑‍💼 **Profile Page**
  - Manage your added posts
  - View and cancel your volunteer requests
- 🎨 **Modern Design**
  - Fully responsive (mobile, tablet, desktop)
  - Light/Dark theme toggle
  - Framer Motion animation
- 🔒 **Secure**
  - Firebase config & MongoDB credentials are protected using `.env`
  - Private routes with route guarding
- 📦 **Bonus Features**
  - Change layout (card to table view)
  - Spinner during loading
  - Dynamic page titles
  - 404 Not Found page

## 📦 NPM Packages Used

### Client Side

- `react-router-dom`
- `firebase`
- `axios`
- `react-datepicker`
- `sweetalert2`
- `framer-motion`
- `react-helmet-async`
- `react-icons`
- `tailwindcss` `daisyUI`

## ⚙️ Setup Instructions (Local Development)

### Client

```bash
cd client
npm install
npm run dev
```
