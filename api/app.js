const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/authRoutes");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
