const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/userModel')

const authUser = () => {
    passport.use(
        new LocalStrategy( (username, password, done) => {
            User.findOne({username:username}, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, {message: "Incorrect User"})
                }
                if (user.password !== password) {
                    return done(null, false, {message: "Incorrect Password"})
                }
                return done(null, user)
            })
        } )
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}

module.exports = authUser