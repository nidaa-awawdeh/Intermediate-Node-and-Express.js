const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM users");
    return res.json(result.rows);
  } catch (e) {
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *",
      [req.body.username, hashedPassword]
    );
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
