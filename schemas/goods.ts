import mongoose from "mongoose";

const { Schema } = mongoose;
const goodsSchema = new Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Goods = mongoose.model("Goods", goodsSchema);

export default Goods;
