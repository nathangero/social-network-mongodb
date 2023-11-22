const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            console.log("users:", users);
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}