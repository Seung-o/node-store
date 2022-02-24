import express from "express";
import goodsRouter from "./routes/goods";
import userRouter from "./routes/user";

const app = express();
const port = 3000;

app.use("/goods", goodsRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hi. This is express router");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
