const express = require("express");
const pool = require("../db/pool");
const request = require("../utils/createResult");
const authUser = require("../utils/auth");
const {isAdmin} = require('../utils/role_validation')
const router = express.Router();

router.get("/all-active-courses",(req,res)=>{
  const sql = "SELECT * FROM courses WHERE CURDATE() BETWEEN start_date AND end_date"
  pool.query(sql,(error,data)=>{
    res.send(request.createResult(error,data));
  });
});

router.get("/all-courses",(req, res) => {
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

router.post("/add",authUser,isAdmin,(req,res)=>{
  const {course_name,description,fees,start_date,end_date,video_expire_days} = req.body
  const sql = "insert into courses(course_name , description , fees , start_date , end_date , video_expire_days) values (?,?,?,?,?,?)";
  pool.query(sql,[course_name , description , fees , start_date , end_date , video_expire_days],(error,data)=>{
    res.send(request.createResult(error,data));
  })
})

router.put("/update/:course_id",authUser,isAdmin, (req, res) => {
  const { course_id } = req.params;
  const { course_name, description, fees, start_date, end_date, video_expire_days } = req.body;

  const sql = `
    UPDATE courses 
    SET course_name = ?, description = ?, fees = ?, start_date = ?, end_date = ?, video_expire_days = ?
    WHERE course_id = ?
  `;

  pool.query(
    sql,
    [course_name, description, fees, start_date, end_date, video_expire_days, course_id],
    (error, data) => {
      res.send(request.createResult(error, data));
    }
  );
});


router.delete("/delete/:course_id", authUser, isAdmin, (req, res) => {
  const { course_id } = req.params;

  const sql = "DELETE FROM courses WHERE course_id = ?";

  pool.query(sql, [course_id], (error, data) => {
    if (error) {
      return res.send(request.createResult(error));
    }

    if (data.affectedRows === 0) {
      return res.send(request.createResult("Course not found"));
    }

    res.send(request.createResult(null, "Course deleted successfully"));
  });
});


module.exports = router;