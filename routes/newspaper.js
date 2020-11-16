const express = require("express");
const router = express.Router();

const connection = require("../database/db");

// Show
router.get("/:slug.html", (req, res) => {
  const slug = req.params.slug.split("-");
  const id = slug[slug.length - 1];

  connection.query(
    "SELECT * FROM newspapers WHERE id = ?",
    [id],
    (err, results1) => {
      if (err) throw err;
      results1[0].newspaper_title = results1[0].newspaper_title.replace(
        /(<([^>]+)>)/gi,
        ""
      );
      connection.query(
        "SELECT * FROM newspapers WHERE category_id = ? AND id != ? ORDER BY RAND() LIMIT 3",
        [results1[0].category_id, id],
        (err, results2) => {
          if (err) throw err;
          results2.forEach(news => {
            news.newspaper_title = news.newspaper_title.replace(
              /(<([^>]+)>)/gi,
              ""
            );
            const slug = require("slug");
            news.slug = slug(news.newspaper_title) + `-${news.id}.html`;
          });
          res.render("pages/newspaper/show", {
            news: results1[0],
            relativeNews: results2
          });
        }
      );
    }
  );

  // res.render("pages/newspaper/show", { news: "Hello World" });
});

module.exports = router;
