const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User
                .find({})
                .populate(['thoughts', 'friends'])

            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User
                .findById(new ObjectId(req.params.id))
                .populate(['thoughts', 'friends']);

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
            // res.status(200).json({ message: `added user ${newUser.username}`});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: new ObjectId(req.params.id) },
                req.body,
                { new: true }
            );

            res.status(200).json(updatedUser);
            // res.status(200).json({ message: "updated user"});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete({ _id: new ObjectId(req.params.id) })

            const deletedThoughts = [];
            deletedUser.thoughts.forEach(async (thought) => {
                const deletedThought = await Thought.findByIdAndDelete(new ObjectId(thought._id))
                deletedThoughts.push(deletedThought);
            })

            const deletedFriends = [];
            deletedUser.friends.forEach(async (friend) => {
                const deletedFriend = await User.findByIdAndUpdate(
                    friend._id,
                    { $pull: { friends: new ObjectId(req.params.id) } },
                    { new: true }
                )
                deletedFriends.push(deletedFriend);
            })

            const results = {
                deletedUser: deletedUser,
                deletedThoughts: deletedThoughts,
                deletedFriends: deletedFriends,
            }
            // console.log("deletedThoughts:", deletedThoughts);

            res.status(200).json(results);
            // res.status(200).json({ message: `deleted ${deletedUser.username}`});
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async addFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;

            const userAddFriend = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } },
            )

            // Check if the user is already friends with the user they're trying to friend or not
            if (userAddFriend.friends.includes(friendId)) {
                res.status(200).json({ message: `${userAddFriend.username} is already friends with this user` });
                return;
            }

            const friendAddUser = await User.findByIdAndUpdate(
                friendId,
                { $addToSet: { friends: userId } },
                { new: true }
            )

            res.status(200).json({
                message: `${userAddFriend.username} added friend ${friendAddUser.username}`,
                friendAddUser: friendAddUser
            });
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
                res.status(200).json({ message: `${user.username} is not friends with the user` });
                return;
            }

            const userDeleteFriend = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } },
            )

            const friendDeleteUser = await User.findByIdAndUpdate(
                friendId,
                { $pull: { friends: userId } },
                { new: true }
            )

            res.status(200).json({
                message: `${userDeleteFriend.username} removed friend ${friendDeleteUser.username}`,
                userDeleteFriend: userDeleteFriend,
                friendDeleteUser: friendDeleteUser
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}