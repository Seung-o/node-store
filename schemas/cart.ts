import mongoose from "mongoose";

const { Schema } = mongoose;
const cartSchema = new Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
