const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

require("dotenv").config();
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true });

const con = mongoose.connection;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  con.on("open", () => {
    console.log("mongoDB connected!!!");
  });
} catch (error) {
  console.log("Error: " + error);
}

const PORT = process.env.PORT;

const imageRouter = require("./routers/img");
app.use("/api", imageRouter);

const ProfilePhotoRouter = require("./routers/ProfilePhoto");
app.use("/api", ProfilePhotoRouter);

const userRouter = require("./routers/User");
app.use("/api", userRouter);

const mailRouter = require("./routers/Mail");
app.use("/api", mailRouter);

const profileRouter = require("./routers/Profile");
app.use("/api", profileRouter);

app.listen(PORT, () => {
  console.log("This Node application is running on port " + PORT);
});
