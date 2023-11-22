const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()

            res.status(200).json(thoughts)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id)

            res.status(200).json(thought)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async createThought(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username })

            if (!user) {
                res.status(404).json({ message: "Can't post a thought for a non-existent user" })
                return;
            }

            const newThought = await Thought.create(req.body)

            // Add the new thought id to the user who posted it
            const updatedUser = await User.findOneAndUpdate(
                { username: newThought.username },
                { $addToSet: { thoughts: newThought._id }},
                { new: true }
            )

            const results = {
                newThought: newThought,
                updatedUser: updatedUser
            }

            console.log("results:", results);

            res.status(200).json(results);
            // res.status(200).json({ message: `Posted new thought by ${newThought.username}`});
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            res.status(200).json(updatedThought);
            // res.status(200).json({ message: "Updated thought" });
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtId = req.params.id;

            const deletedThought = await Thought.findByIdAndDelete(req.params.id)

            // Delete the thought id from the user 
            const updatedUser = await User.findOneAndUpdate(
                { username: deletedThought.username },
                { $pull: { thoughts: thoughtId }},
                { new: true }
            )

            res.status(200).json(updatedUser)
            // res.status(200).json({ message: "deleted thought" })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async addReaction(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.id,
                { $push: { reactions: req.body }},
                { new: true }
            )

            res.status(200).json(updatedThought);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async deleteReaction(req, res) {
        try {
            // Go into the reactions array, then target the specific reactionId
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.id,
                { $pull: { reactions: { reactionId: req.body.reactionId } }},
                { new: true }
            )

            res.status(200).json(updatedThought);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}
