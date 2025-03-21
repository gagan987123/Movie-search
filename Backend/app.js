const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const tvRoutes = require("./routes/tvRoutes");
const movieRoutes = require("./routes/movieRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const verifytoken = require("./middleware/authMiddleware");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://10.150.9.234:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 2 * 60 * 60,
    }),
    cookie: { secure: false, maxAge: 2 * 60 * 60 * 1000 },
  })
);

app.use(authRoutes);
app.use("/movie", verifytoken, movieRoutes);
app.use("/tv", tvRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
    app.listen(PORT, "0.0.0.0", () => console.log(`running on server ${PORT}`));
  })
  .catch((err) => {
    console.error("MONGODB connection error", err);
  });
