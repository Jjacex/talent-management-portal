const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/userModel')
const Candidate = require('../models/candidateModel')
const nodemailer = require('nodemailer')
const errorHandler = require('../middleware/errorMiddleware')

// GET Register Page
// router.get('/register', (req, res) => {
//     if (req.user == undefined){
//         res.render('register.ejs')
//         return
//     }
//     res.redirect('/user/home')
// })

// POST Create New User
// router.post('/register', async (req, res) => {
//     const {username, company, email, password, password2} = req.body
//     // Checking if all fields are filled out
//     if (!username || !company || !email || !password || !password2){
//         throw new Error({message:"Please fill out all the form fields"})
//     }
//     // Checking if user already exists
//     const userExists = await User.findOne({username:username})
//     if (userExists !== null){
//         throw new Error({message:"User already exists"})
//     }
//     const user = await User.create({
//         username,
//         company,
//         email,
//         password
//     })
//     res.redirect('/user/login')   
// })

// GET Login Page
router.get('/login', (req, res) => {
    try {
        if (req.user == undefined){
            res.render('login.ejs')
            return
        }
        res.redirect('/user/home')
    } catch (error) {
        next(error)
    }
    
})

// POST Authenticate User (Login)
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/user/home',
        failureRedirect: '/user/login',
    })
)

// GET User Homepage
router.get('/home', (req, res) => {
    if (req.user == undefined){
        res.redirect('/user/login')
        return
    }
    Candidate.find({user: req.user._id}, (err, candidates) => {
        res.render('home.ejs', {
            user:req.user,
            candidateList:candidates,
        }) 
    }) 
})

// GET Logout User
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/user/register')
})

// POST Add New Candidate
router.post('/home/add', async (req, res, next) => {
    try {
        const {firstName, lastName, email, phone} = req.body;
        if (!firstName || !lastName || !email || !phone){
            throw new Error('Please fill out all the form fields')
        }
        const candidate = await Candidate.create({
            user: req.user._id,
            firstName,
            lastName,
            email,
            phone
        })
        if (!candidate){
            throw new Error('Failed to create candidate')
        }
        console.log('Candidate Created')
        res.status(200).redirect('/user/home')
    } catch (error) {
        next(error)
    }   
})

router.post('/home/phoneInterview/:id', async (req, res) => {
    const {
        phone_valued, 
        phone_valued_grade, 
        phone_one, 
        phone_one_grade, 
        phone_excellent, 
        phone_excellent_grade,
        phone_proud, 
        phone_proud_grade, 
        phone_stronger, 
        phone_stronger_grade
    } = req.body;
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
        phoneValued: phone_valued,
        phoneValuedGrade: phone_valued_grade,
        phoneOne: phone_one,
        phoneOneGrade: phone_one_grade,
        phoneExcellent: phone_excellent,
        phoneExcellentGrade: phone_excellent_grade,
        phoneProud: phone_proud,
        phoneProudGrade: phone_proud_grade,
        phoneStronger: phone_stronger,
        phoneStrongerGrade: phone_stronger_grade
    })
    res.redirect('/user/home')
})

router.post('/home/f2fInterview/:id', async (req, res) => {
    const {
        f2f_valued, 
        f2f_valued_grade, 
        f2f_one, 
        f2f_one_grade, 
        f2f_excellent, 
        f2f_excellent_grade,
        f2f_proud, 
        f2f_proud_grade, 
        f2f_stronger, 
        f2f_stronger_grade
    } = req.body;
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
        f2fValued: f2f_valued,
        f2fValuedGrade: f2f_valued_grade,
        f2fOne: f2f_one,
        f2fOneGrade: f2f_one_grade,
        f2fExcellent: f2f_excellent,
        f2fExcellentGrade: f2f_excellent_grade,
        f2fProud: f2f_proud,
        f2fProudGrade: f2f_proud_grade,
        f2fStronger: f2f_stronger,
        f2fStrongerGrade: f2f_stronger_grade
    })
    res.redirect('/user/home')
})

router.post('/home/finalInterview/:id', async (req, res) => {
    const {
        final_valued, 
        final_valued_grade, 
        final_one, 
        final_one_grade, 
        final_excellent, 
        final_excellent_grade,
        final_proud, 
        final_proud_grade, 
        final_stronger, 
        final_stronger_grade
    } = req.body
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
        finalValued: final_valued,
        finalValuedGrade: final_valued_grade,
        finalOne: final_one,
        finalOneGrade: final_one_grade,
        finalExcellent: final_excellent,
        finalExcellentGrade: final_excellent_grade,
        finalProud: final_proud,
        finalProudGrade: final_proud_grade,
        finalStronger: final_stronger,
        finalStrongerGrade: final_stronger_grade
    })
    res.redirect('/user/home')
})

// Hire Candidate
router.put('/home/hire/:id', async (req, res) => {
    console.log('Hiring Candidate')
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
        status: 'hired'
    })
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, 
        },
    })
    const hireTemplate = `
    <h3 style="color:red;">Dear ${candidate.firstName},</h3>
    <p style="color:black;">We want to take the time to say congratulations! You have been accepted and hired at ${req.user.company}. Someone will be reaching out to you soon to discuss next steps. Thank you so much for your time and patience, we are excited to have you join our team. We look forward to seeing you soon!</p>
    <h3 style="color:red;">Sincerely,</h3> 
    <h3 style="color:red;">${req.user.company} Leadership</h3>
    
    `
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: candidate.email,
        subject: req.user.company,
        text: req.user.comapny,
        html: hireTemplate,
    })
    console.log("message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    res.status(200).json(candidate)
})

// Reject Candidate
router.put('/home/reject/:id', async (req, res) => {
    console.log('Rejecting Candidate')
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
        status: 'rejected'
    })
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, 
        },
    })
    const rejectTemplate = `
    <p style="color:black;">Dear ${candidate.firstName},</p>
    <p style="color:black;">We want to take the thank you for your application at ${req.user.company}! Unfortunately, we have decided to move forward with other candidates. We are honored for your consideration and we wish you the best of luck in your future endeavors. Thank you so much for the time and effort you put into your application, we appreciate it!</p>
    <p style="color:black;">Sincerely,</p> 
    <h3 style="color:red;">${req.user.company} Leadership</h3>
    
    `
    const info = await transporter.sendMail({
        from: 'ekkwjsmcnfd2dsdks@outlook.com',
        to: candidate.email,
        subject: req.user.company,
        text: req.user.comapny,
        html: rejectTemplate,
    })
    console.log("message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    res.status(200).json(candidate)
})


router.put('/home/updateStatus/:id/:newRole', async (req, res) => {

    switch (req.params.newRole){
        case "Terminate Employee":
            console.log('Terminating Employee')
            const terminatedEmployee = await Candidate.findByIdAndDelete(req.params.id, {
                status: "Terminated"
            })
            break
        default:
            console.log('Promoting Employee')
            const promotedEmployee = await Candidate.findByIdAndUpdate(req.params.id, {
                position: req.params.newRole
            })
            break
    }
    
    res.status(200).end()
})

module.exports = router