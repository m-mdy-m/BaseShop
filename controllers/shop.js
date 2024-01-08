const render = require("../util/render");

exports.getShop = (req, res, nxt) => {
  const msgErr = req.flash("ERROR");
  render(req, res, "shop/index", "SHOP", msgErr);
};
