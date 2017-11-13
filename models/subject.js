const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    studies: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    students :[{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]
});

module.exports = mongoose.model('Subject', SubjectSchema);