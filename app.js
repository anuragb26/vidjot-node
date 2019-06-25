const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
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
app.use(methodOverride("_method"));

const port = 5000;

app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", { title });
});

app.get("/about", (req, res) => {
  const title = "Welcome";
  res.render("about", { title });
});

app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", { ideas });
    });
});

app.get("/ideas/edit/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    res.render("ideas/edit", { idea });
  });
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

app.put("/ideas/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save().then(idea => {
      res.redirect("/ideas");
    });
  });
});

app.delete("/ideas/:id", (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    res.redirect("/ideas");
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
