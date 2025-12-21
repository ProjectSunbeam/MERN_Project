const express = require("express");

const userRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const videosRouter = require("./routes/videos");
const authUser = require("./utils/auth");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(authUser);

app.use("/users", userRouter);
app.use("/courses", coursesRouter);
app.use("/video", videosRouter);

app.listen(PORT, "localhost", () => {
  console.log(`Server Started At Port ${PORT}`);
});
