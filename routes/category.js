const express = require("express");
const router = express.Router();

const connection = require("../database/db");

// show
router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM categories WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) throw err;
      res.render("pages/category/show", { category: results[0] });
    }
  );
});

module.exports = router;
