require("dotenv").config();
// const config = require('./config.js');

const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

// const { authenticateToken } = require("./middleware/auth");

// router
const userRouter = require("./routes/userRoute");
const transactionRouter = require("./routes/transactionRoute");

app.use("/api/users", userRouter);
app.use("/api/transaction", transactionRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
