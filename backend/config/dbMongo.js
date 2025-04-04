const mongoose = require('mongoose');



const connectMongoDB = (mongoURI, dbName) => {
    mongoose
       .connect(mongoURI, {dbName})
       .then( () => console.log('Connected to MongoDB'))
       .catch(error => console.log(error))
}

module.exports = connectMongoDB;