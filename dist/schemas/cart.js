"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const Cart = mongoose_1.default.model("Cart", cartSchema);
exports.default = Cart;
