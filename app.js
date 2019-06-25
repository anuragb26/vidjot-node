const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
mongoose
  .connect(
    `mongodb+srv://anuragb26:anuragb26@cluster0-nx9b3.mongodb.net/vidjot?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log("err", err));

const Idea = require("./models/Idea");
// const Idea = mongoose.model("ideas");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;

app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", { title });
});

app.get("/about", (req, res) => {
  const title = "Welcome";
  res.render("about", { title });
});

app.get("/ideas/add", (req, res) => {
  res.render("ideas/add");
});

app.post("/ideas", (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details.trim()) {
    errors.push({ text: "Please add some details" });
  }
  if (errors.length > 0) {
    res.render("ideas/add", {
      errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newIdea = { title: req.body.title, details: req.body.details.trim() };
    new Idea(newIdea)
      .save()
      .then(idea => {
        console.log("in then");
        res.redirect("/ideas");
      })
      .catch(err => {
        console.log("err", err);
      });
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
