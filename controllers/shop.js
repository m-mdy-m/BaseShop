const render = require("../util/render");

exports.getShop = (req, res, nxt) => {
  render(req, res, "shop/index", "HOME");
};
