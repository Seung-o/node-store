import Goods from "../schemas/goods";
import express from "express";
import { goodsDTO } from "./DTO/goodsDTO";

const goodsRouter = express.Router();

goodsRouter.get("/goods", async (req, res, next) => {
  try {
    const { category } = req.query;
    const goods = await Goods.find({ category }).sort("-goodsId");
    res.json({ goods: goods });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

goodsRouter.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  const goods = await Goods.findOne({ goodsId: goodsId });
  res.json({ detail: goods });
});

goodsRouter.post("/goods", async (req, res) => {
  console.log("Body: ", req);
  const goods: goodsDTO = req.body;

  const isExist = await Goods.find({ goodsId: goods.goodsId });

  if (isExist.length === 0) {
    await Goods.create(goods);
  }
  res.send({ result: "success" });
});

export default goodsRouter;
