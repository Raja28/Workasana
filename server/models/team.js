const mongoose = require('mongoose');
// Team Schema
const teamSchema = new mongoose.Schema({
    name: {// Team names must be unique
        type: String,
        required: true,
        unique: true
    },
    description: { type: String } // Optional description forthe team
}, 
// { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
