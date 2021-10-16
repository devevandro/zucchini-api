const mongoose = require('mongoose');

const radioFavoriteSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    url: String,
    city: String,
    state: String,
    img: String
});

const RadioFavorite = mongoose.model('Favorite', radioFavoriteSchema);

module.exports = RadioFavorite;
