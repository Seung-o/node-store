"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let goodsRouter = express_1.default.Router();
goodsRouter.get("/list", function (req, res, next) {
    res.send("Router 상품 목록 페이지");
});
goodsRouter.get("/detail", function (req, res, next) {
    res.send("Router 상품 상세 페이지");
});
exports.default = goodsRouter;
