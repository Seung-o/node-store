"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const Goods = mongoose_1.default.model("Goods", goodsSchema);
exports.default = Goods;
