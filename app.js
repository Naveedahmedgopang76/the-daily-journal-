const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent =
  "Lorem ipsum is a dummy text without any sense. It is a sequence of Latin words that, as they are positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will subsequently be occupied from ad hoc texts composed by communication professionals.";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    StartingContent: homeStartingContent,
    posts: posts,
  });
});
//footer
app.get("/footer", function (req, res) {
  res.render("footer");
});

//Header
app.get("/header", function (req, res) {
  res.render("header");
});
//About Page
app.get("/about", function (req, res) {
  res.render("about");
});

//Contact Page
app.get("/contact", function (req, res) {
  res.render("contact");
});

//compose  page
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const newPost = {
    title: req.body.postTitle,
    content: req.body.content,
  };
  posts.push(newPost);
  // Here you would typically save the newPost to your database
  res.redirect("/");
});

app.get("/posts/:postTitle", function (req, res) {
  const requestedPostTitle = _.lowerCase(req.params.postTitle);

  posts.forEach(function (post) {
    const postTitle = _.lowerCase(post.title);
    if (postTitle === requestedPostTitle) {
      res.render("post", {
        post: post,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
