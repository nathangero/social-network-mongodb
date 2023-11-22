const mongoose = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: {
            validator: (text) => text.length > 0 && text.length <= 280,
            message: "Text validation failed"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;