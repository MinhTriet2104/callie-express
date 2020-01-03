const express = require("express");
const router = express.Router();

const connection = require("../database/db");

router.get("/:slug.html", (req, res) => {
  const slug = req.params.slug.split("-");
  const id = slug[slug.length - 1];

  connection.query(
    "SELECT * FROM newspapers WHERE id = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      results[0].newspaper_title = results[0].newspaper_title.replace(
        /(<([^>]+)>)/gi,
        ""
      );
      res.render("pages/newspaper/show", { news: results[0] });
    }
  );

  // res.render("pages/newspaper/show", { news: "Hello World" });
});

module.exports = router;
