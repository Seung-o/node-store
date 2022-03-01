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
const express_1 = __importDefault(require("express"));
const goodsRouter = express_1.default.Router();
goodsRouter.get("/goods", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.query;
        const goods = yield goods_1.default.find(category).sort("-goodsId");
        res.json({ goods: goods });
    }
    catch (err) {
        console.error(err);
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
exports.default = goodsRouter;
