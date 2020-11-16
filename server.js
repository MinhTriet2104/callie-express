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

// Passing data to all view
app.use((req, res, next) => {
  connection.query("SELECT * FROM categories", (err, results) => {
    if (err) throw err;
    res.locals.categories = results;
    res.locals.categories.forEach(category => {
      connection.query(
        "SELECT * FROM newspapers WHERE category_id = ? ORDER BY newspaper_date DESC LIMIT 3",
        [category.id],
        (err, results) => {
          if (err) throw err;
          category.newspapers = results;
          category.newspapers.forEach(news => {
            news.slug =
              slug(news.newspaper_title.replace(/(<([^>]+)>)/gi, "")) +
              `-${news.id}.html`;
            news.newspaper_title = news.newspaper_title.replace(
              /(<([^>]+)>)/gi,
              ""
            );
          });
        }
      );
    });
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

app.use((req, res, next) => {
  connection.query("SELECT * FROM authors", (err, results) => {
    if (err) throw err;
    res.locals.authors = results;
    next();
  });
});

// Router
const indexRouter = require("./routes/index");
const newspaperRouter = require("./routes/newspaper");
const categoryRouter = require("./routes/category");

// PORT
app.listen(process.env.PORT || 3000, () => console.log("Server Running"));

// Routes
app.use("/", indexRouter);
app.use("/news", newspaperRouter);
app.use("/category", categoryRouter);
