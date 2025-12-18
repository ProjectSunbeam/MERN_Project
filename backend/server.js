const express = require("express");
const coursesRouter = require("./routes/courses");

const app = express();
const PORT = 4000;

app.use(express.json())
app.use("/courses", coursesRouter);

app.listen(PORT,"localhost",()=>{
  console.log(`Server Started At Port ${PORT}`);
})