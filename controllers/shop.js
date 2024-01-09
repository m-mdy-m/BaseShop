const render = require("../util/render");
const Product = require("../models/Product");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const NUMBER_PRODUCT = 4;
exports.getShop = async (req, res, nxt) => {
  const page = +req.query.page;
  const nap = await Product.countDocuments(); // ** NAP => number all product

  const products = await Product.find()
    .skip((page - 1) * NUMBER_PRODUCT)
    .limit(NUMBER_PRODUCT);
  render(req, res, "shop/index", "HOME", null, [], {
    products,
    page,
    hasNxtPage: NUMBER_PRODUCT * page < nap,
    hasPrevPage: page > 1,
    nxtPage: page + 1,
    prevPage: page - 1,
    lastPage: Math.ceil(nap / NUMBER_PRODUCT),
  });
};
exports.getAddProduct = (req, res, nxt) => {
  render(req, res, "shop/add-product", "ADD_PRODUCT", null, [], {
    edit: false,
    hasError: false,
  });
};
exports.postAddProduct = async (req, res, nxt) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const err = validationResult(req);
  const user = req.user;
  const imagePath = image.path;
  if (!err.isEmpty()) {
    let errors = err.array();
    const msgErr = err.array()[0].msg;
    return render(req, res, "shop/add-product", "ADD PRODUCT", msgErr, errors, {
      edit: false,
      hasError: true,
      product: {
        title: title,
        price: price,
      },
    });
  }
  const userId = await User.findById(user._id);
  if (!userId) {
    return render(req, res, "shop/index", "add-product", "HAS NOT USER FOUND");
  }
  const product = await Product.create({
    title,
    imagePath,
    price,
    userId,
    username: user.name,
  });
  await product.save();
  console.log("CREATE NEW PRODUCT ");
  res.redirect("/");
};
