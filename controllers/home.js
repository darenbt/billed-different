module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getBillChoice:  (req, res) => {
    res.render("landing.ejs", {user: req.user});
  }
};