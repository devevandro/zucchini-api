const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    url: String,
});


const playlistSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    image: String,
    musics: [musicSchema],
});

module.exports = mongoose.model('Playlist', playlistSchema);
