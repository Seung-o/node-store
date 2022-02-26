import express from "express";
import goodsRouter from "./routes/goods";
import userRouter from "./routes/user";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/goods", goodsRouter);
app.use("/user", userRouter);

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
