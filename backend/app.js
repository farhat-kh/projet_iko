const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectMongoDB = require('./config/dbMongo');
const ENV = require('./config/env');


// IMPORT ROUTES 

const userRouter = require('./router/user.router');

const messageRouter = require('./router/message.router');






// CONNECT TO MONGODB
connectMongoDB(ENV.MONGO_URI, ENV.DB_NAME);

// MIDDLEWARES
app.use(express.json());
app.use(cors(
    {
        origin: `http://localhost:${ENV.PORT_APPLICATION_FRONT}`,
        credentials: true
    }
));
app.use(cookieParser());

// URLS API PREFIX 

app.use('/api/user', userRouter);
// app.use('/api/commande', commandeRouter);
// app.use('/api/produit', produitRouter);
// app.use('/api/categorie', categorieRouter);

app.use('/api/messages', messageRouter);




// Middleware de gestion des erreurs
app.use((error,req,res, next)=>{
    const status = error.status || 500;
    const message = error.message || "Une erreur est survenue"
    const details = error.details || null;

    res.status(status).json({
        error: {
            status,
            message,
            details
        }
    })
})

module.exports = app;