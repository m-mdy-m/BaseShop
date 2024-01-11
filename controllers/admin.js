const Product = require("../models/Product");
const render = require("../util/render");
const { validationResult } = require("express-validator");
const fileHelper = require("../util/fileHelper");
const NUMBER_PRODUCT = 3;
exports.getAdmin = async (req, res, nxt) => {
  const page = +req.query.page || 1;
  const totalItem = await Product.countDocuments();
  const products = await Product.find({userId : req.user._id})
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
  const image = req.file;
  const err = validationResult(req);
  const product = await Product.findOne({ _id: prodId, userId: req.user._id });
  if (!err.isEmpty()) {
    let errors = err.array();
    return render(
      req,
      res,
      "shop/add-product",
      "EDIT",
      err.array()[0].msg,
      errors,
      {
        edit: true,
        hasError: true,
        product: {
          title: title,
          price: price,
          imagePath: image.path,
        },
      }
    );
  }
  product.title = title;
  product.price = price;
  if (product.imagePath && image) {
    fileHelper(product.imagePath);
    product.imagePath = image.path;
  } else {
    product.imagePath = "";
  }
  await product.save();
  return res.status(200).json({ message: 'Product updated successfully.' });
};
