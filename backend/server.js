const express = require("express");
const coursesRouter = require("./routes/courses");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/students");

const app = express();
const PORT = 4000;

app.use(express.json())
app.use("/admin/",adminRouter);
app.use("/courses", coursesRouter);
app.use("/students",studentRouter);

app.listen(PORT,"localhost",()=>{
  console.log(`Server Started At Port ${PORT}`);
})  