const express = require("express");
const Idea = require("../models/Idea");
const router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth");

router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({ user: req.user.id })
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", { ideas });
    });
});

router.get("/edit/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    if (idea.user !== req.user.id) {
      req.flash("error_msg", "Not Authorized");
      res.redirect("/ideas");
    } else {
      res.render("ideas/edit", { idea });
    }
  });
});

router.get("/add", ensureAuthenticated, (req, res) => {
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
    const newIdea = {
      title: req.body.title,
      details: req.body.details.trim(),
      user: req.user.id
    };
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
