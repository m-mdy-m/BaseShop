const Product = require('../models/Product')
const User = require('../models/User')
const render = require('../util/render')
const NUMBER_PRODUCT = 3;
exports.getAdmin = async (req, res, nxt) => {
  const page = +req.query.page || 1;
  const totalItem = await Product.countDocuments();
  const products = await Product.find()
    .skip((page - 1) * NUMBER_PRODUCT)
    .limit(NUMBER_PRODUCT);
  console.log("=>", Math.ceil(totalItem / NUMBER_PRODUCT));
  render(req, res, "shop/index", "HOME", null, [], {
    products,
    page: page,
    prevPage: page - 1,
    hasPrevPage: page > 1,
    hasNxtPage: page * NUMBER_PRODUCT < totalItem,
    nxtPage: page + 1,
    lastPage: Math.ceil(totalItem / NUMBER_PRODUCT),
  });
};
