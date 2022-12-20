const express=require('express')
const router=express.Router()

const {signup,login}=require('../controllers/userController')
const category=require('../controllers/categoryController')
const subCategory=require('../controllers/subCategoryController')
const childCategory=require('../controllers/childCategoryControlle')

router.post('/signup',signup)
router.post('/login',login)
router.post('/category',category)
router.post('/subcategory/:categoryId',subCategory)
router.post('/childcategory/:subCategoryId',childCategory)

module.exports=router