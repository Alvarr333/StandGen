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
    timeCreated: {
        type: Date,
        default: Date.now()
    }
});

const StandGen = mongoose.model('StandGen', StandGenSchema);
module.exports = StandGen;
