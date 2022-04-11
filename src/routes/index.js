const express = require("express")

const router = express.Router()


const { addUsers, getUsers, getUser, updateUser, deleteUser, getProfile, getUserProducts} = require ("../controllers/user")

const { addProduct, getProduct, getProducts, getDetail, updateProduct, deleteProduct, getcategoryProduct } = require ("../controllers/product")

const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/category")



// router.post("/register", addUsers )
// router.post("/login", addUsers )
router.get("/user", getUsers )
router.get("/user/:id", getUser )
router.patch("/user/:id", updateUser )
router.delete("/user/:id", deleteUser )



router.get("/profile", getProfile )
router.get("/product", getUserProducts )

router.get("/category", getcategoryProduct )

const {register, login} = require('../controllers/auth')

//product
router.post("/product", addProduct )
router.get("/product", getProduct )
router.get("/products", getProducts )
router.get("/detail/:id", getDetail )
router.patch("/product/:id", updateProduct )
router.delete("/product/:id", deleteProduct )

//category
router.post("/category", addCategory )
router.get("/categories", getCategories )
router.get("/category/:id", getCategory )
router.patch("/category/:id", updateCategory)
router.delete("/category/:id", deleteCategory)

router.post("/register", register)
router.post("/login", login)






module.exports = router