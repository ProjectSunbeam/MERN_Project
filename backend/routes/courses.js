const express = require("express");
const pool = require("../db/pool");
const request = require("../utils/createResult");
const router = express.Router();

router.get("/",(req,res)=>{
  const sql = "select * from courses"
  pool.query(sql,(error,data)=>{
    res.send(request.createRequest(error,data));
  })
})

router.post("/",(req,res)=>{
  const {course_id,course_name,description,fees,start_date,end_date,video_expire_days} = req.body
  const sql = "insert into courses(course_id,course_name,description,fees,start_date,end_date,video_expire_days) values(?,?,?,?,?,?,?)";
  pool.query(sql,[course_id,course_name,description,fees,start_date,end_date,video_expire_days],(error,data)=>{
    res.send(request.createRequest(error,data));
  })
})

router.put("/",(req,res)=>{
  const {fees,course_id} = req.body
  const sql = "update courses set fees=? where course_id = ?";
  pool.query(sql,[fees,course_id],(error,data)=>{
    res.send(request.createRequest(error,data));
  })
})

router.delete("/",(req,res)=>{
  const sql = "delete from courses where course_id = 6";
  pool.query(sql,(error,data)=>{
    res.send(request.createRequest(error,data));
  })
})

module.exports = router;