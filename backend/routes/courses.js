const express = require("express");
const pool = require("../db/pool");
const request = require("../utils/createResult");
const router = express.Router();

router.get("/all-active-courses",(req,res)=>{
  const sql = "SELECT * FROM courses WHERE CURDATE() BETWEEN start_date AND end_date"
  pool.query(sql,(error,data)=>{
    res.send(request.createResult(error,data));
  })
})

router.get("/all-courses", (req, res) => {
  const { startDate, endDate } = req.query;

  let sql = "SELECT * FROM courses";
  const params = [];

  if (startDate && endDate) {
    sql += " WHERE start_date <= ? AND end_date >= ?";
    params.push(endDate, startDate);
  }

  pool.query(sql, params, (error, data) => {
    res.send(request.createResult(error, data));
  });
});

// router.post("/courseUser",(req,res)=>{
//   const {course_name,description,fees,end_date,video_expire_days} = req.body
//   const sql = "insert into courses(course_name , description , fees , end_date , video_expire_days) values (?,?,?, SYSDATE(),?,?)";
//   pool.query(sql,[course_name , description , fees , end_date , video_expire_days],(error,data)=>{
//     res.send(request.createResult(error,data));
//   })
// })

router.post("/add",(req,res)=>{
  const {course_name,description,fees,start_date,end_date,video_expire_days} = req.body
  const sql = "insert into courses(course_name , description , fees , start_date , end_date , video_expire_days) values (?,?,?,?,?,?)";
  pool.query(sql,[course_name , description , fees , start_date , end_date , video_expire_days],(error,data)=>{
    res.send(request.createResult(error,data));
  })
})

router.put("/update",(req,res)=>{
  const {course_name,description,fees,start_date,end_date,video_expire_days,course_id} = req.body
  const sql = "update courses set course_name =? , description=? , fees=? , start_date=? , end_date=? , video_expire_days=? where course_id = ?";
  pool.query(sql,[course_name,description,fees,start_date,end_date,video_expire_days,course_id],(error,data)=>{
    res.send(request.createResult(error,data));
  })
})

router.delete("/delete",(req,res)=>{
  const {course_id} = req.body;
  const sql = "delete from courses where course_id = ?";
  pool.query(sql,[course_id],(error,data)=>{
    res.send(request.createResult(error,data));
  })
})

module.exports = router;