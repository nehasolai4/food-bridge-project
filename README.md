# Food Bridge

**A food redistribution platform connecting food donors with those in need — reducing waste and fighting hunger.**

---

## About

Food Bridge is a full-stack web application that acts as a bridge between surplus food sources (restaurants, events, households) and individuals or organizations that need it. The platform enables donors to list available food, and recipients to find and claim it — all in one place.

---

## 👩‍💻 My Contributions

Led development of the majority (~80%) of the project across both frontend and backend.

- Built backend APIs using Node.js and Express.js
- Designed MongoDB schemas and handled database integration
- Implemented authentication system 
- Developed core features: food listing, request & claim system
- Worked on frontend using HTML, CSS, and JavaScript
- Integrated frontend with backend APIs and handled data flow

---

## 👥 Team

This project was developed as a team project.

- Neha Solai – Led development (full-stack (frontend + backend))
- Vidya R – Assisted with UI / testing 

---

## ✨ Features

- 🤝 **Donor & Recipient Roles** — Register as a food donor or a recipient organization
- 📋 **Food Listings** — Donors can post available food with details like quantity, type, and pickup location
- 🔔 **Request & Claim System** — Recipients can browse and claim food listings
- 🔐 **User Authentication** — Secure login and registration for all users
- 📊 **Dashboard** — Manage your listings, requests, and history

---

## 🛠️ Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | HTML, CSS, JavaScript       |
| Backend  | Node.js, Express.js         |
| Database | MongoDB (via Mongoose)      |
| Auth     | JWT-based authentication    |

---

## 📁 Project Structure

```
food-bridge-project/
├── client/          # Frontend — HTML, CSS, JavaScript
│   ├── index.html
│   ├── styles/
│   └── scripts/
└── server/          # Backend — Node.js + Express
    ├── routes/
    ├── models/
    ├── controllers/
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nehasolai4/food-bridge-project.git
   cd food-bridge-project
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file inside the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open the frontend**

   Open `client/index.html` in your browser, or serve it with a static server:
   ```bash
   cd ../client
   npx serve .
   ```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Inspired by the need to reduce food waste and address food insecurity
