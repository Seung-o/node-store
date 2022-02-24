import express from "express";

const userRouter = express.Router();

userRouter.get("/login", (req: any, res: any) => {
  res.send("로그인 페이지");
});

userRouter.get("/register", (req: any, res: any) => {
  res.send("회원가입 페이지");
});

export default userRouter;
