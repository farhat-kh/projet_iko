const express = require('express');
const app = require('./app');
const ENV = require('./config/env');
app.use(express.json());

// PORT 
const PORT = ENV.PORT || 8080;

// listen
app.listen(PORT, () => {
    console.log(`Server running at port  hhttp://localhost:${PORT}`);
});

