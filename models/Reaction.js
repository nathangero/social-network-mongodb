const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.ObjectId,
        default: new mongoose.Schema.ObjectId()
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
});

function formatDate(createdAt) {
    const month = createdAt.getMonth() + 1;
    const date = createdAt.getDate();
    const year = createdAt.getYear();

    const hour = createdAt.getHour();
    const minute = createdAt.getMinute();

    return `${month}/${date}/${year} - ${hour}:${minute}`
}


module.exports = reactionSchema;