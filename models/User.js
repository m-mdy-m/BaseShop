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
      proId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("User", User);
