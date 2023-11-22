const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

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
