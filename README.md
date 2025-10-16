<xaiArtifact artifact_id="fad11124-b436-4465-a998-a8a7e49c7c73" artifact_version_id="7731e2ee-c158-476a-8266-7023cae28b96" title="readme.md" contentType="text/markdown">

# 🚀 Innovation & Technology Agency Website

[![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🌟 Project Overview

A modern, responsive **MERN stack** website for an Innovation & Technology Agency. This project showcases dynamic content management and seamless user experiences with features like programs, events, news, vacancies, services, and a powerful admin dashboard.

**Key Features:**

- **Responsive Design**: Built with **Tailwind CSS** for a sleek, mobile-first UI.
- **Engaging Animations**: Powered by **Framer Motion** for smooth transitions.
- **Dynamic Icons**: Integrated with **Lucide React** for a modern look.
- **Notifications**: Real-time feedback using **react-hot-toast**.
- **Email Testing**: Configured with **Mailtrap** for secure email workflows.
- **Authentication**: Full auth flow with signup, login, email verification, and password reset.
- **Admin Dashboard**: Manage programs, events, news, and vacancies effortlessly.


---

## 🌐 Live Demo

Explore the live site:  
[Live Demo](https://your-website-link.com) 

---

## 🛠 Technologies Used

| Frontend        | Backend        | Database | Utilities                   |
|-----------------|----------------|----------|-----------------------------|
| React 19        | Node.js        | MongoDB  | Mailtrap                    |
| React Router v6 | Express.js     | -        | react-hot-toast             |
| Tailwind CSS    | -              | -        | @vuer-ai/react-helmet-async |
| Framer Motion   | -              | -        | Lucide React                |

---

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/innovation-agency.git
cd innovation-agency
```

### 2️⃣ Backend Setup (Node.js + Express)

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` folder with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   MAILTRAP_HOST=smtp.mailtrap.io
   MAILTRAP_PORT=2525
   MAILTRAP_USER=your_mailtrap_user
   MAILTRAP_PASS=your_mailtrap_password
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run at: [http://localhost:5000](http://localhost:5000)

### 3️⃣ Frontend Setup (React + Tailwind)

1. Navigate to the frontend folder:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` folder (optional):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```
   Open your browser at: [http://localhost:5173](http://localhost:5173)

### 4️⃣ Email Testing with Mailtrap

The project uses **Mailtrap** for testing email functionalities like signup confirmations and password resets. Configure it in the backend as follows:

```javascript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

await transporter.sendMail({
  from: '"Innovation Agency" <no-reply@agency.com>',
  to: "test@example.com",
  subject: "Welcome to Innovation Agency",
  text: "This is a test email sent via Mailtrap.",
});
```

Emails will appear in your Mailtrap dashboard for inspection.



---


## 📂 Project Structure

```
innovation-agency/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Page components
│   │   ├── store/         # State management
│   │   ├── i18n/          # Localization
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.css          # Tailwind CSS
│   └── package.json
├── server/                # Node.js + Express backend
│   ├── controllers/       # Request handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   ├── server.js          # Backend entry point
│   └── package.json
├── assets/                # Images and media
│   ├── banner.png         # Project banner
│   ├── home.png           # Homepage screenshot
│   ├── services.png       # Services page screenshot
│   └── admin.png          # Admin dashboard screenshot
└── readme.md              # Project documentation
```

---

## 📜 License

MIT License © 2025  
See the [LICENSE](LICENSE) file for details.

---

## 🙌 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 📬 Contact

For questions or feedback, reach out via:  
- Email: [your-email@example.com](mailto:your-email@example.com)  
- GitHub Issues: [Create an Issue](https://github.com/yourusername/innovation-agency/issues)

</xaiArtifact>