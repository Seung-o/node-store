import Goods from "../schemas/goods";
import Cart from "../schemas/cart";
import express from "express";
import { goodsDTO } from "./DTO/goodsDTO";

const goodsRouter = express.Router();

goodsRouter.get("/goods", async (req, res, next) => {
  try {
    const category = req.query;
    const goods = await Goods.find(category).sort("-goodsId");
    res.json({ goods: goods });
  } catch (err) {
    next(err);
  }
});

goodsRouter.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  const goods = await Goods.findOne({ goodsId });
  res.json({ detail: goods });
});

goodsRouter.post("/goods", async (req, res) => {
  const goods: goodsDTO = req.body;
  const isExist = await Goods.find({ goodsId: goods.goodsId });
  if (isExist.length === 0) {
    await Goods.create(goods);
  }
  res.send({ result: "success" });
});

goodsRouter.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const isCart = await Cart.find({ goodsId });
  if (isCart.length) {
    await Cart.updateOne({ goodsId }, { $set: { quantity } });
  } else {
    await Cart.create({ goodsId: goodsId, quantity: quantity });
  }
  res.send({ result: "success" });
});

export default goodsRouter;
