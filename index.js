const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { formatErrors } = require('./helpers');

const config = require('./config');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/comments', async (req, res, next) => {
    try {
        const comments = await models.Comment.find();
        res.send(comments);
    } catch (err) {
        next(err);
    }
});

app.post('/comment', async (req, res, next) => {
    try {
        const { email, message } = req.body;
        const comment = await new models.Comment({
            email,
            message
        }).save();
        
        res.send(comment);

    } catch (err) {
        next(err);
    }
});


app.use((err, req, res, next) => {
    res.status(400);
    res.send(formatErrors(err));
})

mongoose
    .connect(config.mongodb_uri)
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Server is listening on ${config.port}`)
        });
    }).catch((err) => {
        console.log(err);
    });


