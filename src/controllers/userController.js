const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const userModel=require('../models/userModel')
const validator=require('../utils/validations')

const signup = async function (req, res) {
    try {
        let userDetails = req.body
        let {name,email,phone,password}=userDetails

        if (!validator.isValidRequestBody(userDetails)) {
            return res.status(400).send({ status: false, message: "please provide valid user Details" })
        }

        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "user name is required" })
        }
     
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "Email-ID is required" })
        }

        if (!validator.isValidEmail(email))
            return res.status(400).send({ status: false, message: "Invalid Email id." })

        const checkEmailFromDb = await userModel.findOne({ email })

        if (checkEmailFromDb) {
            return res.status(400).send({ status: false, message: `emailId is Exists. Please try another email Id.` })
        }

        if (!validator.isValid(phone)) {
            return res.status(400).send({ status: false, message: "Phone is required" })
        }

        if (!validator.isValidMobile(phone))
            return res.status(400).send({ status: false, message: "Invalid Phone Number." })

        const checkPhoneFromDb = await userModel.findOne({ phone })

        if (checkPhoneFromDb ) {
            return res.status(400).send({ status: false, message: `PhoneNumber already is Exists. Please try another email Id.` })
        }


        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        userDetails.password = hashedPassword

        const saveUserInDb = await userModel.create(userDetails);

        return res.status(201).send({ status: true, message: "user created successfully!!", data: saveUserInDb });

    } catch (err) {

        return res.status(500).send({ status: false, error: err.message })

    }

}

/**Login Api */

const login = async function (req, res) {

    try {

        const loginDetails = req.body;

        const { email, password } = loginDetails;

        if (!validator.isValidRequestBody(loginDetails)) {
            return res.status(400).send({ status: false, message: 'Please provide login details' })
        }
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: 'Email-Id is required' })
        }
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: 'Password is required' })
        }
        const userData = await userModel.findOne({ email });

        if (!userData) {
            return res.status(401).send({ status: false, message: `Login failed!! Email-Id is incorrect!` });
        }

        const checkPassword = await bcrypt.compare(password, userData.password)

        if (!checkPassword) return res.status(401).send({ status: false, message: `Login failed!! password is incorrect.` });
        let userId=userData._id
        const token = jwt.sign({
            userId: userId,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
        }, "BYRD87KJVUV%^%*CYTC")

        return res.status(200).send({ status: true, message: "LogIn Successful!!", data: {userId:userId,Token:token} });

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}

module.exports={signup,login}