const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectMongoDB = require('./config/dbMongo');
const ENV = require('./config/env');
const requestLogger = require('./middlewares/requestLogger');

// IMPORT ROUTES 

const userRouter = require('./router/user.router');
const categoriesRouter = require('./router/categories.router');
const produitRouter = require('./router/produit.router');

const messageRouter = require('./router/message.router');
const commandeRouter = require('./router/commande.router');


app.set('trust proxy', 1); 

// CONNECT TO MONGODB
connectMongoDB(ENV.MONGO_URI, ENV.DB_NAME);


// MIDDLEWARES

app.use(express.json());
app.use(requestLogger);

// CORS configuration with environment variables
const allowedOrigins = [
  ENV.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());

// HEALTH CHECK ENDPOINT
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

// URLS API PREFIX

app.use('/api/user', userRouter);
app.use('/api/produit', produitRouter);
app.use('/api/categorie', categoriesRouter);
app.use('/api/messages', messageRouter);
app.use('/api/commande', commandeRouter);




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