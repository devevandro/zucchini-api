const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PlayListModel = require('../models/playlist-model');

router.get('/', async (req, res) => {
    try {
        const playlist = await PlayListModel.find({}, {
            _id: 1,
            name: 1,
            image: 1,
        }).exec();

        res.json({
            playlists: playlist
        });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: "Erro ao buscar as playlist!"
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const playlistModel = new PlayListModel({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            image: req.body.image,
            musics: [],
        });

        await playlistModel.save();
        res.status(200).send('Lista criada com sucesso!');
    } catch (err) {
        res.status(500).send({
            error: err,
            message: 'Erro ao criar uma playlist!'
        });
    }
});

router.put('/:id/music', async (req, res) => {
    try {
        const playlistUpdate = PlayListModel.findByIdAndUpdate(req.params['id'], {
            $push: {
                musics: {
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    url: req.body.url,
                },
            },
        });

        await playlistUpdate.exec();
        res.send({
            message: 'Música adicionada com sucesso!'
        });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: 'Erro ao inserir uma música!'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const docPlaylist = await PlayListModel.findById(req.params['id']).exec();

        res.json({
            playlist: docPlaylist,
        });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: 'Erro ao buscar a playlist!'
        });
    }
});

router.get('/music/:id', async (req, res) => {
    try {
        const docPlaylist = await PlayListModel.findOne({ 'musics._id': req.params['id'] }, { 'musics.$': 1 }).exec();
        
        res.json({
            music: docPlaylist.musics[0]
        });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: 'Erro ao buscar música!'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await PlayListModel.findByIdAndRemove(req.params['id']).exec();

        res.send({ message: 'Playlist excluída com sucesso!'})
    } catch (error) {
        res.status(500).send({
            error: err,
            message: 'Erro ao excluir a playlist!'
        });
    }
});

router.delete('/:id/music/:idMusic', async (req, res) => {
    try {
        await PlayListModel.findByIdAndUpdate(req.params['id'], {
            $pull: {
                musics: {
                    _id: req.params['idMusic']
                },
            },
        }).exec();

        res.send({ message: 'Música excluída com sucesso!' });
    } catch (err) {
        res.status(500).send({
            error: err,
            message: 'Erro ao exlcuir a'
        });
    }
});

module.exports = router;
