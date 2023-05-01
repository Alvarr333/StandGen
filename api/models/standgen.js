const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StandGenSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    personality: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "No stand"
    },
    appereance: {
        type: String,
        default: "No stand"
    },
    standAbility: {
        type: String,
        default: "No stand"
    },
    power: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    
    speed: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    range: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    durability: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    precision: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    potential: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    }
});

const StandGen = mongoose.model('StandGen', StandGenSchema);
module.exports = StandGen;