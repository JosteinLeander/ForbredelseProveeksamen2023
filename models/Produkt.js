const mongoose = require("mongoose");

const produktSchema = new mongoose.Schema({
    tittel: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    modell: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    merke: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    pris: {
        type: Number,
        require: true,
        unique: true,
        lowercase: true
    },
    artikkelnummer: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    dato: {
        type: Date,
        require: true,
        unique: true,
        lowercase: true
    },
});

const Produkt = mongoose.model("produkt", produktSchema);

module.exports = Produkt;