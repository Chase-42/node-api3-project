require("dotenv").config();
const express = require("express");
const server = express();
const logger = require("./middleware/logger");
const welcomeRouter = require("./routers/welcome");
const userRouter = require("./users/userRouter");

server.use(logger());

server.use(express.json());
const port = process.env.PORT || 4000;

server.use("/", welcomeRouter);
server.use("/users", userRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong 🙁"
  });
});

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
