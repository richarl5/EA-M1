const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = Schema({
    name : String,
    age : {type: Number, default : 18},
    subjects :[{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
});

module.exports = mongoose.model('Student', StudentSchema);