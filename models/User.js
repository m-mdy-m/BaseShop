const { Schema, default: mongoose } = require("mongoose");

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Token: String,
  dateToken: Date,
  cart: [
    {
      nameProduct: {
        type: String,
        ref: "Product",
        required: true,
      },
      prodId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: { type: Number, required: true },
    },
  ],
});
User.methods.addCart = async function (product) {
  if (!this.cart) {
    this.cart = [];
  }
  let CartUser = [...this.cart];
  let newQty = 1;
  const cartIndex = CartUser.findIndex((item) => {
    return item.prodId.toString() === product._id.toString();
  });
  if (cartIndex >= 0) {
    newQty = this.cart[cartIndex].qty + 1;
    CartUser[cartIndex].qty = newQty;
  } else {
    CartUser.push({
      nameProduct: product.title,
      prodId: product._id,
      qty: newQty,
    });
  }
  this.cart = CartUser;
  return await this.save();
};
module.exports = mongoose.model("User", User);
