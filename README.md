# 🌟 VolunteerConnect – A Volunteer Management Platform

## 📌 Project Purpose

VolunteerConnect is a user-friendly platform for managing volunteer activities. It allows users to post their volunteer needs and lets others join as volunteers. The platform promotes social contribution by making it easy to connect organizers and volunteers.

## 🌐 Live URL

[🔗 Live Website](https://volunteer-management-project.web.app/)

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

### ⚛️ Client Dependencies

| Package                                            | Purpose              |
| -------------------------------------------------- | -------------------- |
| `react` / `react-dom`                              | Core React           |
| `react-router`                                     | Routing              |
| `firebase`                                         | Auth & Firestore     |
| `axios`                                            | API calls            |
| `react-datepicker`                                 | Date input           |
| `sweetalert2`                                      | Pop-up notifications |
| `react-icons`                                      | Icons                |
| `react-helmet-async`                               | Dynamic titles       |
| `@tippyjs/react`                                   | Tooltips             |
| `date-fns`                                         | Date manipulation    |
| `embla-carousel-react` & `embla-carousel-autoplay` | Sliders              |
| `lottie-react`                                     | Animations           |
| `tailwindcss`                                      | Utility-first CSS    |
| `@tailwindcss/vite`                                | Tailwind integration |
| `daisyui`                                          | Tailwind UI plugin   |

## ⚙️ Setup Instructions (Local Development)

### Client

```bash
cd client
npm install
npm run dev
```
