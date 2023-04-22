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
    stand: {
        type: String,
        required: false
    },
    standAbility: {
        type: String,
        required: false
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    }

});

const StandGen = mongoose.model('StandGen', StandGenSchema);
module.exports = StandGen;
