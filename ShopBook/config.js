const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}`.trim() + '.env')
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000,
    DATABASE : process.env.DATABASE,
    DBUSER : process.env.DBUSER,
    DBPASS : process.env.DBPASS,
    EMAIL_API_KEY : process.env.EMAIL_API_KEY,
    FROM_EMAIL: process.env.FROM_EMAIL
}