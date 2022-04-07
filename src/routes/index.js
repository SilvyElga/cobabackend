const express = require("express")

const router = express.Router()


const { addUsers, getUsers, getUser, updateUser, deleteUser, getProfile, getUserProducts} = require ("../controllers/user")

const { getcategoryProduct } = require ("../controllers/product")



router.post("/register", addUsers )
router.post("/login", addUsers )
router.get("/user", getUsers )
router.get("/user/:id", getUser )
router.patch("/user/:id", updateUser )
router.delete("/user/:id", deleteUser )



router.get("/profile", getProfile )
router.get("/product", getUserProducts )

router.get("/category", getcategoryProduct )



module.exports = router