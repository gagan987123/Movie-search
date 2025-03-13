
This project is built using **React** with **Vite** for frontend and **Node.js/Express** for backend. It includes environment variables for secure key management and follows best practices for deployment and development.

## Features
- Fast and optimized development with **Vite**.
- Backend powered by **Node.js** and **Express**.
- Environment variables managed through `.env` for security.
- Includes user authentication with session and JWT support.


---

## Environment Variables Setup

### **Frontend (`frontend/.env`)**
```env
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY= your-api-key
```

### **Backend (`backend/.env`)**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydatabase
SESSION_SECRET=your_session_secret_key
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ Ensure your `.env` files are added to `.gitignore` to avoid exposing sensitive data.

---

## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Step 2: Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Step 3: Run the Project
```bash
# Start Backend Server
cd backend
npm start

# Start Frontend Server
cd ../frontend
npm run dev
```

### Step 4: Access the Project
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)

---

## API Routes
### Authentication
- **`POST /register`** – Register a new user.
- **`POST /login`** – Login with valid credentials.
- **`POST /logout`** – Logout and destroy the session.

### User Management
- **`GET /profile`** – Get user profile details.
- **`GET /fav`** – View user's favorite movies (requires authentication).

---

## Best Practices
✅ Use `.env` for sensitive data.  
✅ Follow RESTful API conventions.  
✅ Use `saveUninitialized: false` in sessions to avoid unnecessary empty entries.  
✅ Implement JWT expiry for enhanced security.  

---

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push the branch (`git push origin feature-name`).
5. Create a pull request.

---


