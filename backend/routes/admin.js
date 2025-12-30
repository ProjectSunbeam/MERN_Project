const express = require("express");
const { roleAuthorization } = require("../utils/auth");
const pool = require("../db/pool");
const result = require("../utils/createResult");
const router = express.Router();

router.get("/enrolledstudents", roleAuthorization, (req, res) => {
  const sql = `
    select s.name, c.course_id, c.course_name
    from students s
    inner join courses c on (c.course_id = s.course_id)`;

  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});
module.exports = router;
