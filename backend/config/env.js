const dotenv = require('dotenv');

dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    NOM_DOMAIN: process.env.NOM_DOMAIN,
    PORT_APPLICATION_FRONT: process.env.PORT_APPLICATION_FRONT,
    DB_NAME: process.env.DB_NAME,
    MONGO_URI: process.env.MONGO_URI,
    MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL,
    TOKEN: process.env.TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
}

module.exports = ENV;