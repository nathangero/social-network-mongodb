const mongoose = require("mongoose");

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
    userName: {
        type: String,
        required: true
    },
    reactions: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Reactions'
    }
});

thoughtSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;