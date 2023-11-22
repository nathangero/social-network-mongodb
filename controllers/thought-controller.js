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

            res.status(200).json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    async deleteThought(req, res) {
        try {
            
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
