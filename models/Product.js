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
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
    ref: "User",
  },
});
module.exports = mongoose.model("Product", Product);
