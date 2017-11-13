const StudentSchema = require('../models/student');
const SubjectSchema = require('../models/subject');


function getStudent(req, res) {
    StudentSchema.findOne({name : req.params.student}).populate('subjects').exec(function (err, student) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!student) return res.status(404).send({message : 'User does not exist'});
        console.log(student);
        res.status(200).jsonp([student]);
    });
}

function getStudents (req, res) {
    StudentSchema.find({}).populate('subjects').exec(function (err, students) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!students) return res.status(404).send({message : 'User does not exist'});
        else res.status(200).jsonp(students);
    })
}

function addStudent(req, res) {
    console.log(req.body);
    let newStudent = new StudentSchema({
        name: req.body.name,
        age: req.body.age
    });
    StudentSchema.findOne({name : req.body.name},function (err, student) {
        if(err) return res.status(500).send({message : 'Error on save in data base: ' + err});
        if(!student){
            newStudent.save(function (err,studentStored) {
                if(err) return res.status(500).send({message : 'Error on save in data base: ' + err});
                res.status(200).jsonp(studentStored);
            })
        } else return res.status(404).send({message : 'Student already exist'});
    });
}

function updateStudent(req, res) {
    var update = req.body;
    StudentSchema.findOneAndUpdate({name : req.params.student},update, {new : true}, function (err,userUpdated) {
        if (err) return res.status(500).send({message: 'Error updating data base'});
        if (!userUpdated) return res.status(404).send({message: 'User does not exist'});
        console.log(userUpdated);
        res.status(200).send({message : 'User has been updated'});
    });
}

function deleteStudent(req, res) {
    StudentSchema.findOne({name : req.params.student}, function (err, user) {
        if (err) return res.status(500).send({message: 'Error reading data base'});
        if (!user) return res.status(404).send({message: 'User does not exist'});
        user.remove(function (err) {
            if (err) return res.status(500).send({message: 'Error reading data base'});
            res.status(200).send({message: 'User has been deleted!'})
        })
    });
}

function updateStudentSubject(req, res) {
    SubjectSchema.findOne({name : req.body.subject}, function (err,subject) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!subject) return res.status(404).send({message : 'Subject does not exist'});
        StudentSchema.findOneAndUpdate({name : req.params.student}, {$push: {subjects: subject._id.toString()}}, {new : true}, function (err,userUpdated) {
            if (err) return res.status(500).send({message: 'Error updating data base'});
            if (!userUpdated) return res.status(404).send({message: 'Student does not exist'});
            res.status(200).send({message : 'Student has been updated'});
        });
    })
}

module.exports = {
    getStudent,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    updateStudentSubject
};
