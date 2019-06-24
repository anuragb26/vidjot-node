const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(
    `mongodb+srv://anuragb26:anuragb26@cluster0-nx9b3.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log("err", err));

require("./ models/Idea");
const Idea = mongoose.model("ideas");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const port = 5000;

app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", { title });
});

app.get("/about", (req, res) => {
  const title = "Welcome";
  res.render("about", { title });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
