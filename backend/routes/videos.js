const express = require("express");
const pool = require("../db/pool");
const request = require("../utils/createResult");
const authUser = require("../utils/auth");
const { isAdmin } = require("../utils/role_validation");

const router = express.Router();

// Anyone logged-in (student + admin)
router.get("/add-video/:course_id", authUser, (req, res) => {
  const course_id = req.params.course_id;
  const sql = `SELECT * FROM videos WHERE course_id = ?`;

  pool.query(sql, [course_id], (error, data) => {
    res.send(request.createResult(error, data));
  });
});

// Admin only
router.post("/add", authUser, isAdmin, (req, res) => {
  const { course_id, title, youtube_url, description } = req.body;
  const sql = `INSERT INTO videos (course_id,title,youtube_url,description)
               VALUES (?,?,?,?)`;

  pool.query(sql, [course_id, title, youtube_url, description], (error, data) => {
    res.send(request.createResult(error, data));
  });
});

router.delete("/delete/:video_id", authUser, isAdmin, (req, res) => {
  const sql = `DELETE FROM videos WHERE video_id = ?`;
  pool.query(sql, [req.params.video_id], (error, data) => {
    res.send(request.createResult(error, data));
  });
});

router.put("/update/:video_id", authUser, isAdmin, (req, res) => {
  const { title, youtube_url, description } = req.body;
  const sql = `UPDATE videos
               SET title=?, youtube_url=?, description=?
               WHERE video_id=?`;

  pool.query(
    sql,
    [title, youtube_url, description, req.params.video_id],
    (error, data) => {
      res.send(request.createResult(error, data));
    }
  );
});

module.exports = router;
