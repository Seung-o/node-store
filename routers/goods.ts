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

goodsRouter.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const isGoodsInCart = await Cart.find({ goodsId });

  if (isGoodsInCart.length > 0) {
    await Cart.deleteOne({ goodsId });
  }

  res.send({ result: "sucess" });
});

goodsRouter.patch("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const isGoodsInCart = await Cart.find({ goodsId });
  if (isGoodsInCart.length > 0) {
    await Cart.updateOne({ goodsId }, { $set: { quantity } });
  }
  res.send();
});

goodsRouter.get("/cart", async (req, res) => {
  const cart = await Cart.find({});
  const goodsId = cart.map((cart) => cart.goodsId);

  const goodsInCart = await Goods.find().where("goodsId").in(goodsId);

  const concatCart = cart.map((c) => {
    for (let i = 0; i < goodsInCart.length; i++) {
      if (goodsInCart[i].goodsId == c.goodsId) {
        return { quantity: c.quantity, goods: goodsInCart[i] };
      }
    }
  });

  res.json({
    cart: concatCart,
  });
});

export default goodsRouter;
