const express = require('express');
const mongoose = require('mongoose'); 
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const app = express(); 

if (process.env.ENV === 'production'){              
    mongoose.connect(process.env.MONGODB_URI);
}else {
    mongoose.connect('mongodb://localhost/my-blog'); 
};

mongoose.Promise = Promise; 

app.use(morgan('dev')); 
app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));
app.use((req, res, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 404);
    res.json({
        error:{
            message: error.message
        }
    });
});

app.get('/', (req, res, next) => {
    res.status(200).send('This is the root of server!');
});

module.exports = app;
