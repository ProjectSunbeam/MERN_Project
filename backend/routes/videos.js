const express = require("express");
const pool = require("../db/pool");
const request = require("../utils/createResult");
const router = express.Router();


router.get("/add-videos/:course_id", (req, res) => {
  const course_id = req.params.course_id;

  const sql = `SELECT * FROM videos WHERE course_id = ?`;

  pool.query(sql, [course_id], (error, data) => {
    res.send(request.createResult(error, data));
  });
});



router.post("/add",(req,res) =>{
    const {course_id,title,youtube_url,description}  = req.body;
    const sql = `INSERT INTO videos  (course_id,title,youtube_url,description) VALUES(?,?,?,?)`;
    pool.query(sql,[course_id,title,youtube_url,description],(error,data) => {
        res.send(request.createResult(error,data))
    });
});


module.exports = router;