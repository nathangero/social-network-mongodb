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
            const thought = await Thought.findById({ _id: req.params.id })

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
                { $addToSet: { thoughts: newThought.id }},
                { new: true }
            )

            const results = {
                newThought: newThought,
                updatedUser: updatedUser
            }

            res.status(200).json({ message: `Posted new thought by ${newThought.username}`});
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            );

            res.status(200).json({ message: "Updated thought" });
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete({ _id: new ObjectId(req.params.id) })

            // const updatedUser = await User.findOneAndDelete(
            //     { username: deletedThought.username },
            // )

            res.status(200).json({ message: "deleted thought" })
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async addReaction(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async deleteReaction(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}
