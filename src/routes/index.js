const express = require("express")

const router = express.Router()


const { addUsers, getUsers, getUser, updateUser, deleteUser } = require ("../controllers/user")



router.post("/register", addUsers )
router.post("/login", addUsers )
router.get("/user", getUsers )
router.get("/user/:id", getUser )
router.patch("/user/:id", updateUser )
router.delete("/user/:id", deleteUser )



module.exports = router