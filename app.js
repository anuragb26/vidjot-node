const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

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
