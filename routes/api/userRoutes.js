const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../../models/Users');


// Return the signup/login form
router.get('/getLoginForm', (req, res) => {
  if (req.session && req.session.loggedIn) {
    console.log('session exists')
    res.status(200).send('session exists, about to redirect ...')
    res.redirect('/'); // Is this right?
    return;
  } else {
    console.log('session NOT exists')
    res.status(500).send('session NOT exists, about to return login form')
    res.render('login');
  }
});

// Sign up a user.
router.post('/signUp', async (req, res) => {
  console.log('now in /signup')
  try {
    const newUser = req.body;
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // create the newUser with the hashed password and save to DB
    const userData = await Users.create(newUser);
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(userData);
      console.log("router post signUP worked")
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
    console.log("router post signUP did NOT work")
  }
});

// Login a user who already has an account.
router.post('/login', async (req, res) => {
  // console.log('now in /login')
  console.log('now in /login', req.body.username)

  try {
    const dbUserData = await Users.findOne({
      where: { username: req.body.username },

    });
    console.log("TRY REQUEST WORKED")
    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect username. Please try again!' });
      console.log("NO USERNAME")
      return;
    }
    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      console.log("NO PASSWORD")
      return;
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
      console.log("router post login worked")
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);     
    console.log("router post login did NOT worked")
  }
});

// Logout a user who is logged in.
router.post('/logout', (req, res) => {
  console.log('now in /logout')
  if (req.session.loggedIn) {
    console.log("pre dead")
    req.session.destroy(() => {
      console.log("post dead")
      res.status(204).end();
      console.log("Session Destroyed")
    });
  } else {
    console.log("wut")
    res.status(404).end();
    console.log("Session not Destroyed")
  }
});

// Set bio field of user.
router.put('/bio', async (req, res) => {
  Users.update(
    {
      bio: req.body.bio
    },
    {
      where: {
        id: req.session.userId
      },
    }
  )
    .then((updatedUser) => {
      // Sends the updated book as a json response
      res.json(updatedUser);
    })
    .catch((err) => res.json(err));
})

// Get bio field of user.
router.get('/bio', async (req, res) => {
  try {
      const user = await Users.findByPk(req.session.userId);
      res.status(200).json(user.bio);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add favorite for user.

// GetFavorites of user.

module.exports = router;
