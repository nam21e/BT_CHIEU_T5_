let express = require('express')
let router = express.Router()

let userController = require('../controllers/users')
let { RegisterValidator, validatedResult, ChangePasswordValidator } = require('../utils/validator')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
const { checkLogin } = require('../utils/authHandler')
let crypto = require('crypto')
let { sendMail } = require('../utils/mailHandler')


// ================= REGISTER =================
router.post('/register', RegisterValidator, validatedResult, async function (req, res) {
    let { username, password, email } = req.body;

    let newUser = await userController.CreateAnUser(
        username, password, email, '69b2763ce64fe93ca6985b56'
    )

    res.send(newUser)
})


// ================= LOGIN =================
router.post('/login', async function (req, res) {
    let { username, password } = req.body;

    let user = await userController.FindUserByUsername(username);
    if (!user) {
        return res.status(404).send({
            message: "thong tin dang nhap khong dung"
        })
    }

    if (!user.lockTime || user.lockTime < Date.now()) {

        if (bcrypt.compareSync(password, user.password)) {

            user.loginCount = 0;
            await user.save();

            let token = jwt.sign({
                id: user._id,
            }, 'secret', {
                expiresIn: '1h'
            })

            res.cookie("TOKEN_LOGIN", token, {
                maxAge: 24 * 3600 * 1000,
                httpOnly: true,
                secure: false
            })

            return res.send(token)

        } else {
            user.loginCount++;

            if (user.loginCount == 3) {
                user.loginCount = 0;
                user.lockTime = new Date(Date.now() + 60 * 60 * 1000)
            }

            await user.save();

            return res.status(404).send({
                message: "thong tin dang nhap khong dung"
            })
        }

    } else {
        return res.status(404).send({
            message: "user dang bi ban"
        })
    }
})


// ================= LOGOUT =================
router.post("/logout", checkLogin, function (req, res) {
    res.cookie("TOKEN_LOGIN", null, {
        maxAge: 0,
        httpOnly: true,
        secure: false
    })
    res.send("logout thanh cong")
})


// ================= CHANGE PASSWORD =================
router.post('/changepassword', checkLogin, ChangePasswordValidator, async function (req, res) {

    let { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
        return res.status(400).send("Missing fields");
    }

    if (newpassword.length < 6) {
        return res.status(400).send("Password >= 6 chars");
    }

    if (bcrypt.compareSync(oldpassword, req.user.password)) {

        let hash = await bcrypt.hash(newpassword, 10);
        req.user.password = hash;

        await req.user.save();

        return res.send("doi pass thanh cong")

    } else {
        return res.status(404).send("old password khong dung")
    }
})


// ================= ME =================
router.get('/me', checkLogin, function (req, res) {
    res.send(req.user)
})


// ================= FORGOT PASSWORD =================
router.post('/forgotpassword', async function (req, res) {

    let email = req.body.email;
    let user = await userController.FindUserByEmail(email);

    if (user) {
        user.forgotPasswordToken = crypto.randomBytes(32).toString('hex');
        user.forgotPasswordTokenExp = Date.now() + 10 * 60 * 1000;

        await user.save();

        let url = "http://localhost:3005/api/v1/auth/resetpassword/" + user.forgotPasswordToken

        sendMail(user.email, url);
    }

    res.send("check mail de cap nhat pass")
})


// ================= RESET PASSWORD =================
router.post('/resetpassword/:token', async function (req, res) {

    let token = req.params.token;
    let user = await userController.FindUserByToken(token);

    if (!user) {
        return res.status(404).send("token loi")
    }

    if (user.forgotPasswordTokenExp > Date.now()) {

        let hash = await bcrypt.hash(req.body.password, 10);

        user.password = hash;
        user.forgotPasswordToken = null;
        user.forgotPasswordTokenExp = null;

        await user.save()

        return res.send("cap nhat thanh cong")

    } else {
        return res.status(404).send("ma het han")
    }
})

module.exports = router;