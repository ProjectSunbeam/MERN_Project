const express = require("express");
const coursesRouter = require("./routes/courses");
const videosRouter = require("./routes/videos");

const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/video", videosRouter);

app.listen(PORT, "localhost", () => {
  console.log(`Server Started At Port ${PORT}`);
});
