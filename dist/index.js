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
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/goods", goods_1.default);
app.use("/user", user_1.default);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.send("Hello it is node store");
});
app.get("/test", (req, res) => {
    const name = req.query.name;
    res.render("test", { name });
});
app.get("/home", (req, res) => {
    res.render("index");
});
app.get("/detail", (req, res) => {
    const goodsId = req.query.goodsId;
    res.render("detail", { goodsId });
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
