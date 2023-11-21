const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        unique: true, 
        require: true, 
        validate: {
            validator: (email) => RegExp('/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/').test(email),
            message: "Email validation failed"
        }
    },
    thoughts: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Thought'
    },
    friends: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

userSchema.virutal('friendCount').get(() => this.friends.length);

const User = mongoose.model("User", userSchema);



module.exports = User;