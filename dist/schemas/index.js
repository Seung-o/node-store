"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    mongoose_1.default
        .connect("mongodb://localhost:27017/voyage")
        .catch((err) => console.log(err));
};
mongoose_1.default.connection.on("error", (err) => {
    console.error("몽고디비 연결 에러", err);
});
exports.default = connect;
