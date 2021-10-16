const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const favoriteRouter = require('./routes/radio-favorite-routes.js');
const playlistRouter = require('./routes/playlist-routes.js');

const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 }

mongoose.connect('mongodb://localhost:27017/zucchini-api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));
app.use('/radio-favorite', favoriteRouter);
app.use('/playlists', playlistRouter);

module.exports = app;
