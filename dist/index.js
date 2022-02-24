"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goods_1 = __importDefault(require("./routes/goods"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const port = 3000;
app.use("/goods", goods_1.default);
app.use("/user", user_1.default);
app.get("/", (req, res) => {
    res.send("Hi. This is express router");
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
