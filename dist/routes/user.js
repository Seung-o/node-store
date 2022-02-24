"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.get("/login", (req, res) => {
    res.send("로그인 페이지");
});
userRouter.get("/register", (req, res) => {
    res.send("회원가입 페이지");
});
exports.default = userRouter;
