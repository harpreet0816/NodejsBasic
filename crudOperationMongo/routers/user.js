const express = require("express");
const router = express.Router();
const {
    handleCreateUser,
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById
 } = require("../controllers/user")
router.route("/").get(handleGetAllUsers).post(handleCreateUser)
//dyanmic path parameter by using :id
router.route("/:id").get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;