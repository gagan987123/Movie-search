const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });
    await newUser.save();

    res.status(201).json({ message: "saved" });
  } catch (err) {
    res.status(500).json({ message: "not saved" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch)
      return res.status(400).json({ error: "Invalid credentials!" });

    console.log(user);
    const token = jwt.sign(
      { user: user }, // Use `user.email` for accuracy
      process.env.JWT_SECRET,
      {
        expiresIn: "2h", // Expiry duration is clear and reasonable
        algorithm: "HS256", // Explicitly set the algorithm for consistency
      }
    );

    req.session.user = { id: user._id, token };

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed!" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logout success" });
  });
};

exports.authCheck = (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("erorr in  authCheck controoller", error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
