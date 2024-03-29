const render = require("../util/render");
const Product = require("../models/Product");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const NUMBER_PRODUCT = 3;
exports.getShop = async (req, res, nxt) => {
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
exports.postCart = async (req, res, nxt) => {
  const prodId = req.body.prodId;
  const user = req.user;
  const product = await Product.findOne({ _id: prodId });

  await user.addCart(product);
  res.redirect("/cart");
};
exports.getCart = async (req, res, nxt) => {
  const user = await req.user.populate("cart.prodId");
  const products = user.cart;
  console.log("products =>", products);
  render(req, res, "shop/cart", "CART", null, [], {
    products,
  });
};
exports.deleteCart = async (req, res, nxt) => {
  const prodId = req.params.prodId;
  const product = await Product.findOne({ _id: prodId });
  await req.user.removeCart(product._id)
  return res.status(200).json({message : "DELETE CART"})
};
