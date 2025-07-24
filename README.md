# 🏨 Hotel Booking System (Frontend)

This project is a hotel booking web application developed with a separated frontend and [backend](XXX!!!), allowing users to book hotel rooms, pay deposits via QR code, and interact with an AI-powered chatbot.  
The separation of frontend and backend helps maintain clean architecture, easier scaling, and individual deployments for each service.

This project emphasizes modern web practices such as vector search for chatbot answers, admin room control, and real-time booking conflict prevention.

---

## 🔗 Related Links

- Live Demo: [Front-end](XXX!!!)
- Backend repository: [XXX!!!](XXX!!!)

---

## 📌 Description

This frontend application enables users to:

- Browse and filter available hotel rooms by date.
- Book a room and pay a deposit via a generated QR code.
- Prevent double bookings by temporarily locking the room during the booking process.
- Get 24/7 support through an AI chatbot. The chatbot uses backend-powered RAG (Retrieval-Augmented Generation) to generate responses based on hotel information.
- Admins can manage room availability (e.g., mark as under maintenance), view bookings, and update hotel info used by the chatbot.

The app is responsive and optimized for modern usage across mobile and desktop devices.

---

## 🌟 Features

- 🛏️ Room filtering by availability and date.
- 📅 Booking system with real-time conflict prevention (room lock during booking).
- 💸 QR code deposit payment via Omise API.
- 🤖 RAG-based AI chatbot using Xenova embeddings and Gemini 1.5 for response generation.
- 🛠️ Admin dashboard for managing rooms, bookings, and hotel data.
- 🔐 Authentication using Clerk.
- ⚙️ Communicates with backend via RESTful APIs.

---

## ⚙️ Client and Server Separation

The frontend and backend are maintained in **separate Git repositories** for better modularity and long-term maintainability.

- **Frontend (this repo):** handles UI, user interaction, and communication with backend.
- **Backend:** manages database operations, authentication logic, QR code generation, chatbot processing, and vector search.

You can find the backend code and README here:  
### 🔗 Backend Repo: [XXX!!!](XXX!!!)

---

## ⚙️ Technologies Used

- **Next.js** — React framework for production-grade web apps.
- **TypeScript** — Static typing for scalable development.
- **Tailwind CSS** — Utility-first CSS framework for rapid UI styling.
- **Clerk** — Authentication and user management.
- **Cloudinary** — Media (image) upload and optimization.
- **RESTful APIs** — Data communication between client and server.
