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

router.delete("/delete/:video_id",(req,res) =>{
    const video_id = req.params.video_id;
    const sql = `DELETE FROM videos WHERE video_id = ?`;
    pool.query(sql,[video_id],(error,data) => {

        res.send(request.createResult(error,data))
    });
});

router.put("/update/:video_id",(req,res) =>{
    const video_id = req.params.video_id;
    const {title,youtube_url,description}  = req.body;
    const sql = `UPDATE videos SET title = ? , youtube_url = ? , description = ? WHERE video_id = ?`;
    pool.query(sql,[title,youtube_url,description,video_id],(error,data) => {

        res.send(request.createResult(error,data))
    });
});




module.exports = router;