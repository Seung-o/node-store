import express from "express";

let goodsRouter = express.Router();

goodsRouter.get("/list", function (req, res, next) {
  res.send("Router 상품 목록 페이지");
});

goodsRouter.get("/detail", function (req, res, next) {
  res.send("Router 상품 상세 페이지");
});

export default goodsRouter;
