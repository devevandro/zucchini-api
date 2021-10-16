const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RadioFavoriteModel = require("../models/radio-favorite-model.js");

router.get("/", async (req, res) => {
  try {
    const favorites = await RadioFavoriteModel
      .find({}, {}).exec();

    res.json({
        favorites: favorites
    });
  } catch (err) {
    res.status(500).send({ 
        message: "Erro ao buscar as rádios favoritas",
        error: err
     });
  }
});

router.post("/", async (req, res) => {
    try {
        const { name, url, city, state, img } = req.body;
        const radioFavoriteModel = new RadioFavoriteModel({
            _id: mongoose.Types.ObjectId(),
            name,
            url,
            city,
            state,
            img
        });

        await radioFavoriteModel.save();
        res.status(200).send();
    } catch (error) {
        res.status(500).send({ 
            message: "Erro ao adicionar rádio aos favoritos",
            error: err
         });
    }
});

router.delete("/:id", async (req, res) => {
   try {
    const { id } = req.params ;
    await RadioFavoriteModel.findByIdAndRemove(id).exec();

    res.send({
        message: 'Removido com sucesso!'
    });
   } catch (err) {
        res.status(500).send({
            message: "Erro ao adicionar rádio aos favoritos",
            error: err
        });
   }
});

module.exports = router;
