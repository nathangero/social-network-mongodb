const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find({});

            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: new ObjectId(req.params.id)});

            return res.status(200).json(user);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body)

            res.status(200).json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: req.params.id }, 
                req.body, 
                { new: true }
            );

            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete({ _id: new ObjectId(req.params.id) })

            res.status(200).json(deletedUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async deleteFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}