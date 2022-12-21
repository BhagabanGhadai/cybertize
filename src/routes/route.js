const express=require('express')
const router=express.Router()

const {signup,login}=require('../controllers/userController')
const category=require('../controllers/categoryController')
const subCategory=require('../controllers/subCategoryController')
const childCategory=require('../controllers/childCategoryControlle')
const getDetails=require('../controllers/getdata')
router.post('/signup',signup)
router.post('/login',login)
router.post('/category',category)
router.post('/subcategory/:categoryId',subCategory)
router.post('/childcategory/:subCategoryId',childCategory)
router.get('/user',getDetails)

module.exports=router