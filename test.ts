import express from "express";
import connect from "./schemas";
// import goodsRouter from "./routers/goods";
// import bodyParser from "body-parser";

const app = express();
const port = 3000;
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(bodyParser.json());
// app.use("/api", [goodsRouter]);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.send("Hello it is node store");
});
app.get("/home", (req, res) => {
  res.render("index");
});

// app.get("/detail", (req, res) => {
//   const goodsId = req.query.goodsId;
//   res.render("detail", { goodsId });
// });

// app.get("/cart", (req, res) => {
//   res.render("cart");
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
