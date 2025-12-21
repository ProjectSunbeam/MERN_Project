const express = require("express");

const pool = require("../db/pool");
const result = require("../utils/createResult");

const router = express.Router();

router.post("/register-to-course",(req,res)=>{
  const {name,email,course_id,mobile_no} = req.body;
  const sql = `insert into students(name,email,course_id,mobile_no) 
  values(?,?,?,?)`;
  pool.query(sql,[name,email,course_id,mobile_no],(error,data)=>{
    res.send(result.createResult(error,data));
  })
})

router.put("/change-password",(req,res)=>{
  const uid = req.headers.uid;
  if (!uid) {
    return res.send(result.createResult("Unauthorized"));
  }
  const {newPassword,confirmPassword} = req.body;
  if(newPassword == confirmPassword){
    const sql = `update users set password = ? where uid = ?`;
    pool.query(sql,[newPassword,uid],(error,data)=>{
      res.send(result.createResult(error,data));
    })
  }
  else{
    res.send(`Password Does Not Match`);
  }
})

router.get("/my-course",(req,res)=>{
  const uid = req.headers.uid;
  if (!uid) {
    return res.send(result.createResult("Unauthorized"));
  }
  const sql =  `select distinct(u.uid),u.name,c.course_id,c.course_name 
  from users u inner join students s on (u.email = s.email) 
  inner join courses c on (c.course_id = s.course_id) 
  where u.uid = ?`;
  pool.query(sql,[uid],(error,data)=>{
    res.send(result.createResult(error,data));
  })
})  

router.get("/my-course-with-videos", (req, res) => {
  const uid = req.headers.uid;
  if (!uid) {
    return res.send(result.createResult("Unauthorized"));
  }
  const sql = `select distinct(u.uid),u.name AS student_name,
    c.course_id,c.course_name,
    v.video_id,v.title,v.description,v.youtube_url,v.added_at
    from users u
    inner join students s ON u.email = s.email
    inner join courses c ON c.course_id = s.course_id
    inner join videos v ON v.course_id = c.course_id
    where u.uid = ?
    and DATE_ADD(v.added_at, INTERVAL c.video_expire_days DAY) >= CURDATE()
    ORDER BY c.course_id, v.added_at`;
    pool.query(sql,[uid],(error, data) => {
      res.send(result.createResult(error,data));
   })
})

module.exports = router;