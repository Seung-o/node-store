import express from "express";
import connect from "./schemas";
import goodsRouter from "./routers/goods";

const app = express();
const port = 3000;
connect();

app.use("/api", [goodsRouter]);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

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
