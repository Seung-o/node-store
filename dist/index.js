"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = __importDefault(require("./schemas"));
const goods_1 = __importDefault(require("./routers/goods"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
(0, schemas_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use("/api", [goods_1.default]);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express_1.default.static(__dirname + "."));
app.get("/", (req, res) => {
    res.send("Hello it is node store");
});
app.get("/home", (req, res) => {
    res.render("index");
});
app.get("/detail", (req, res) => {
    const goodsId = req.query.goodsId;
    res.render("detail", { goodsId });
});
app.get("/cart", (req, res) => {
    res.render("cart");
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
