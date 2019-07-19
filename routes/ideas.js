const express = require("express");
const Idea = require("../models/Idea");
const router = express.Router();

router.get("/", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", { ideas });
    });
});

router.get("/edit/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    res.render("ideas/edit", { idea });
  });
});

router.get("/add", (req, res) => {
  res.render("ideas/add");
});

router.post("/", (req, res) => {
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
        req.flash("success_msg", "Video Idea Added");
        res.redirect("/ideas");
      })
      .catch(err => {
        console.log("err", err);
      });
  }
});

router.put("/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save().then(idea => {
      req.flash("success_msg", "Video Idea Updated");
      res.redirect("/ideas");
    });
  });
});

router.delete("/:id", (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Video Idea removed");
    res.redirect("/ideas");
  });
});

module.exports = router;
