const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize
// Create a connection object
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(
    process.env.JAWSDB_URL,
  {
    username: 'obxhjbhh0lqcs21m',
    password: 'm2j6uy1xndlhw59e',
    database: 'e5zf9wu5fnpe4hbe',
    host: 'jtb9ia3h1pgevwb1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql'
  })
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  )
};

module.exports = sequelize;
