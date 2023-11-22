const router = require("express").Router();
const {
    getUsers, 
    getSingleUser, 
    createUser, 
    updateUser, 
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-controller");

router.route("/")
    .get(getUsers)
    .get(getSingleUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;