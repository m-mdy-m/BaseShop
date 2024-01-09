const { Schema, default: mongoose } = require("mongoose");

const Product = new Schema({
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("Product", Product)
