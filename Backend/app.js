const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routerssuth = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 30,
    }),
    cookie: { secure: false, maxAge: 2 * 60 * 60 * 1000 },
  })
);

app.use(routerssuth);
app.use(userRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => console.log(`running on server ${PORT}`));
  })
  .catch((err) => {
    console.error("MONGODB connection error", err);
  });
