const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/")
    .get(getThoughts)
    .post(createThought)

router.route("/:id")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route("/:id/reactions")
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;