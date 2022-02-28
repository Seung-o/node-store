import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/voyage")
    .catch((err: any) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

export default connect;
