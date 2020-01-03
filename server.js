// Add env var
if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

const express = require("express");
const app = express();
const pug = require("pug");
const slug = require("slug");

const connection = require("./database/db");

// MySql connection
connection.connect(err => {
  if (err) {
    console.log("Connection error");
  } else {
    console.log("MySQL connected");
  }
});

// View setup
app.set("view engine", "pug"); // Chọn view engine
app.set("views", __dirname + "/views"); // Chứa các file view
app.set("layout", "layouts/layout"); // Chứa các header footer

// Middlewares
app.use(express.static("public")); // Nơi chứa public/css, js, img

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  connection.query("SELECT * FROM categories", (err, results) => {
    if (err) throw err;
    res.locals.categories = results;
    // console.log(res.locals.categories);
    next();
  });
});

app.use((req, res, next) => {
  connection.query(
    "SELECT * FROM newspapers ORDER BY newspaper_date DESC LIMIT 6",
    (err, results) => {
      if (err) throw err;
      res.locals.hotNews = results;
      res.locals.hotNews.forEach(news => {
        news.slug =
          slug(news.newspaper_title.replace(/(<([^>]+)>)/gi, "")) +
          `-${news.id}.html`;
      });
      // console.log(res.locals.categories);
      next();
    }
  );
});

// Router
const indexRouter = require("./routes/index");
const newspaperRouter = require("./routes/newspaper");

// PORT
app.listen(process.env.PORT || 3000, () => console.log("Server Running"));

// Routes
app.use("/", indexRouter);
app.use("/news", newspaperRouter);
