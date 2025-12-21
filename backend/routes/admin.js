const express = require("express");

const pool = require("../db/pool");
const result = require("../utils/createResult");

const router = express.Router();

router.get("/enrolledstudents",(req,res)=>{
  const {cid} = req.query;
  const sql = "select s.name,c.course_id,c.course_name from students s inner join courses c on (c.course_id=s.course_id) where c.course_id = ?"
  pool.query(sql,[cid],(error,data)=>{
    res.send(result.createResult(error,data));
  })
})

module.exports = router;