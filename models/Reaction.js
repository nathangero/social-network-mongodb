const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        validate: {
            validator: (text) => text.length <= 280,
            message: "Text validation failed"
        }
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
}, {
    toJSON: { 
        getters: true 
    },
    id: false
});

function formatDate(createdAt) {
    const month = createdAt.getMonth() + 1;
    const date = createdAt.getDate();
    const year = createdAt.getFullYear();

    const hour = createdAt.getHours();
    const minute = createdAt.getMinutes();

    return `${month}/${date}/${year} - ${hour}:${minute}`
}


module.exports = reactionSchema;