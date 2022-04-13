const mongoose = require('mongoose')

const candidateSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: [true, 'Please fill out all the form fields']
    },
    lastName: {
        type: String,
        required: [true, 'Please fill out all the form fields']
    },
    email: {
        type: String,
        required: [true, 'Please fill out all the form fields']
    },
    phone: {
        type: Number,
        required: [true, 'Please fill out all the form fields']
    },
    phoneValued: {
        type: String
    },
    phoneValuedGrade: {
        type: String
    },
    phoneOne: {
        type: String
    },
    phoneOneGrade: {
        type: String
    },
    phoneExcellent: {
        type: String
    },
    phoneExcellentGrade: {
        type: String
    },
    phoneProud: {
        type: String
    },
    phoneProudGrade: {
        type: String
    },
    phoneStronger: {
        type: String
    },
    phoneStrongerGrade: {
        type: String
    },
    f2fValued: {
        type: String
    },
    f2fValuedGrade: {
        type: String
    },
    f2fOne: {
        type: String
    },
    f2fOneGrade: {
        type: String
    },
    f2fExcellent: {
        type: String
    },
    f2fExcellentGrade: {
        type: String
    },
    f2fProud: {
        type: String
    },
    f2fProudGrade: {
        type: String
    },
    f2fStronger: {
        type: String
    },
    f2fStrongerGrade: {
        type: String
    },
    finalValued: {
        type: String
    },
    finalValuedGrade: {
        type: String
    },
    finalOne: {
        type: String
    },
    finalOneGrade: {
        type: String
    },
    finalExcellent: {
        type: String
    },
    finalExcellentGrade: {
        type: String
    },
    finalProud: {
        type: String
    },
    finalProudGrade: {
        type: String
    },
    finalStronger: {
        type: String
    },
    finalStrongerGrade: {
        type: String
    },
    status: {
        type: String,
        default: "new"
    },
    position: {
        type: String,
        default: "In Training"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Candidate', candidateSchema)