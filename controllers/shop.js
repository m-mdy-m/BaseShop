const render = require("../util/render");
const Product = require("../models/Product");
const { validationResult } = require("express-validator");
exports.getShop = (req, res, nxt) => {
  render(req, res, "shop/index", "HOME");
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
  const imagePath = image.path
  if(!err.isEmpty()){
    let errors = err.array()
    const msgErr = err.array()[0].msg
    return render(req,res,'shop/add-product',"ADD PRODUCT",msgErr,errors,{
      edit : false,
      hasError : true,
      product:{
        title: title,
        price : price,
      }
    })
  }
};
