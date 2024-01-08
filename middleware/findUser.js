const User = require("../models/User");
module.exports = async (req, res, nxt) => {
  if (req.session.user) {
    try {
      const user = await User.findById(req.session.user._id);
      if (!user) {
        nxt();
      }
      req.user = user;
      nxt();
    } catch (err) {
      console.log(err);
    }
  }
};
