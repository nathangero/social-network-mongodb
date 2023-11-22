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
            
            const userAddFriend = await User.findOneAndUpdate(
                { _id: new ObjectId(userId) }, 
                { $addToSet: { friends: friendId }},
            )   

            // Check if the user is already friends with the user they're trying to friend or not
            if (userAddFriend.friends.includes(friendId)) {
                res.status(200).json({ message: `${userAddFriend.username} is already friends with this user`});
                return;
            }

            const friendAddUser = await User.findOneAndUpdate(
                { _id: new ObjectId(friendId) }, 
                { $addToSet: { friends: userId }},
                { new: true }
            )

            res.status(200).json({ message: `${userAddFriend.username} added friend ${friendAddUser.username}` });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async deleteFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
            
            const user = await User.findById({ _id: new ObjectId(userId) });

            // Check if the user is already friends with the user they're trying to delete or not
            if (!user.friends.includes(friendId)) {
                res.status(200).json({ message: `${user.username} is not friends with the user`});
                return;
            }

            const userAddFriend = await User.findOneAndUpdate(
                { _id: new ObjectId(userId) }, 
                { $pull: { friends: friendId }},
            )

            const friendAddUser = await User.findOneAndUpdate(
                { _id: new ObjectId(friendId) }, 
                { $pull: { friends: userId }},
                { new: true }
            )

            res.status(200).json({ message: `${userAddFriend.username} removed friend ${friendAddUser.username}` });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}