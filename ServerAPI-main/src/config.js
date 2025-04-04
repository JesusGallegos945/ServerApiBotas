require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 5000
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSWL_PW,  // Verifica que la variable en .env se llame MYSWL_PW o MY_SQL_PW
    database: process.env.MYSQL_DB
  }
};
