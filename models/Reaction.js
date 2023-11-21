const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;