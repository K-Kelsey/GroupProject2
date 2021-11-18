const express = require('express');
const path = require("path")
const exphbs = require('express-handlebars')
const routes = require('./routes');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

// Import the connection object
const app = express();
const PORT = process.env.PORT || 3001;
 
const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');

// app.engine('hbs', exphbs({
//   layoutsDir : __dirname + '/views/layouts',
//   defaultLayout : "mainLayout",
//   extname : "hbs",
//   partialsDir : __dirname + '/views/partials/'
// }))

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(routes);


// Connect to the database before starting the Express.js server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



