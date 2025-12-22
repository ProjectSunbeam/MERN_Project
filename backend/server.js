const express = require("express");
const coursesRouter = require("./routes/courses");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/students");
const authUser = require("./utils/auth");
const userRouter = require("./routes/users");
const videosRouter = require("./routes/videos");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/users',userRouter);
app.use(authUser);
app.use("/admin/",adminRouter);
app.use("/courses", coursesRouter);
app.use("/students",studentRouter);
app.use("/video", videosRouter);

app.listen(PORT, "localhost", () => {
  console.log(`Server Started At Port ${PORT}`);
})