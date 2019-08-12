module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      // Availaible via passport
      return next();
    }
    req.flash("error_msg", "Not Authorized");
    res.redirect("/users/login");
  }
};
