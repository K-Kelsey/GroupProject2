const router = require("express").Router()

router.get( '/' , async (req, res) => {
  try {
      // res.render("layouts/main");
      console.log(req.session.loggedIn)
      res.render('body', {
        loggedIn: req.session.loggedIn,
      });
  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
});


module.exports = router