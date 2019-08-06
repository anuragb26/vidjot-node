const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const ideas = require("./routes/ideas");
const user = require("./routes/users");
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

// const Idea = mongoose.model("ideas");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());

// global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
const port = 5000;

app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", { title });
});

app.get("/about", (req, res) => {
  const title = "Welcome";
  res.render("about", { title });
});

app.use("/ideas", ideas);
app.use("/users", user);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
