const User = require("../models/User");
exports.favratios = async (req, res) => {
  const user = req.user.id;
  const findUser = await User.findById(user);

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ fav: findUser.fav });
};
