"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const goods_1 = __importDefault(require("../schemas/goods"));
const cart_1 = __importDefault(require("../schemas/cart"));
const express_1 = __importDefault(require("express"));
const goodsRouter = express_1.default.Router();
goodsRouter.get("/goods", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query;
        const goods = yield goods_1.default.find(category).sort("-goodsId");
        res.json({ goods: goods });
    }
    catch (err) {
        next(err);
    }
}));
goodsRouter.get("/goods/:goodsId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { goodsId } = req.params;
    const goods = yield goods_1.default.findOne({ goodsId });
    res.json({ detail: goods });
}));
goodsRouter.post("/goods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const goods = req.body;
    const isExist = yield goods_1.default.find({ goodsId: goods.goodsId });
    if (isExist.length === 0) {
        yield goods_1.default.create(goods);
    }
    res.send({ result: "success" });
}));
goodsRouter.post("/goods/:goodsId/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { goodsId } = req.params;
    const { quantity } = req.body;
    const isCart = yield cart_1.default.find({ goodsId });
    if (isCart.length) {
        yield cart_1.default.updateOne({ goodsId }, { $set: { quantity } });
    }
    else {
        yield cart_1.default.create({ goodsId: goodsId, quantity: quantity });
    }
    res.send({ result: "success" });
}));
goodsRouter.delete("/goods/:goodsId/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { goodsId } = req.params;
    const isGoodsInCart = yield cart_1.default.find({ goodsId });
    if (isGoodsInCart.length > 0) {
        yield cart_1.default.deleteOne({ goodsId });
    }
    res.send({ result: "sucess" });
}));
goodsRouter.patch("/goods/:goodsId/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { goodsId } = req.params;
    const { quantity } = req.body;
    const isGoodsInCart = yield cart_1.default.find({ goodsId });
    if (isGoodsInCart.length > 0) {
        yield cart_1.default.updateOne({ goodsId }, { $set: { quantity } });
    }
    res.send();
}));
goodsRouter.get("/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_1.default.find({});
    const goodsId = cart.map((cart) => cart.goodsId);
    const goodsInCart = yield goods_1.default.find().where("goodsId").in(goodsId);
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
}));
exports.default = goodsRouter;
