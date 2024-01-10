const Product = require("../models/Product");
const User = require("../models/User");
const render = require("../util/render");
const fileHelper = require("../util/fileHelper");
const NUMBER_PRODUCT = 3;
exports.getAdmin = async (req, res, nxt) => {
  const page = +req.query.page || 1;
  const totalItem = await Product.countDocuments();
  const products = await Product.find()
    .skip((page - 1) * NUMBER_PRODUCT)
    .limit(NUMBER_PRODUCT);
  render(req, res, "admin/admin", "ADMIN", null, [], {
    products,
    page: page,
    prevPage: page - 1,
    hasPrevPage: page > 1,
    hasNxtPage: page * NUMBER_PRODUCT < totalItem,
    nxtPage: page + 1,
    lastPage: Math.ceil(totalItem / NUMBER_PRODUCT),
  });
};
exports.deleteProduct = async (req, res, nxt) => {
  const prodId = req.params.prodId;
  const product = await Product.findById(prodId);
  if (!product) {
    return nxt(new Error("PRODUCT NOT FOUND"));
  }
  fileHelper(product.imagePath);
  await Product.deleteOne({ _id: prodId, userId: req.user._id });
};
exports.getEdit = async (req, res, nxt) => {
  const editMode = req.query.edit;
  const prodId = req.params.prodId;
  if (!editMode) {
    return res.redirect("/");
  }
  const product = await Product.findById(prodId);
  render(req, res, "shop/add-product", "EDIT", null, [], {
    edit: editMode,
    product,
  });
};
exports.EditProduct = async (req, res, nxt) => {
  const title = req.body.title;
  const price = req.body.price;
  const prodId = req.body.prodId;
  const product = await Product.findOne({ _id: prodId, userId: req.user._id });
  console.log('product =>',product);
  console.log('prodId =>',prodId);
  const image = req.file;
  console.log('title =>',title);
  console.log('price =>',price);
  console.log('image =>',image);
};
