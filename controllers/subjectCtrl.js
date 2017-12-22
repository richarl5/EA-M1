const StudentSchema = require('../models/student');
const SubjectSchema = require('../models/subject');


function getSubject(req, res) {
    SubjectSchema.findOne({name : req.params.subject}).populate('students').exec(function (err, subject) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!subject) return res.status(404).send({message : 'Subject does not exist'});
        res.status(200).jsonp([subject]);
    })
}

function getSubjects (req, res) {
    SubjectSchema.find({}).populate('students').exec(function (err, students) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!students) return res.status(404).send({message : 'Subject does not exist'});
        else res.status(200).jsonp(students);
    })
}

function addSubject(req, res) {
    console.log(req.body);
    var subject = new SubjectSchema;
    subject.name = req.body.name;
    subject.studies = req.body.studies;
    subject.semester = req.body.semester;
    subject.save(function (err,subjectStored) {
        if(err) res.status(500).send({message : 'Error on save in data base: ' + err});
        res.status(200).jsonp(subjectStored);
    })
}

function updateSubject(req, res) {
    var update = req.body;
    SubjectSchema.findOneAndUpdate({name : req.params.subject},update, {new : true}, function (err,subjectUpdated) {
        if (err) return res.status(500).send({message: 'Error updating data base'});
        if (!subjectUpdated) return res.status(404).send({message: 'Subject does not exist'});
        console.log(subjectUpdated);
        res.status(200).send({message : 'User has been updated'});
    });
}

function deleteSubject(req, res) {
    SubjectSchema.findOne({name: req.params.subject}, function (err, user) {
        if (err) return res.status(500).send({message: 'Error reading data base'});
        if (!user) return res.status(404).send({message: 'Subject does not exist'});
        user.remove(function (err) {
            if (err) return res.status(500).send({message: 'Error reading data base'});
            res.status(200).send({message: 'Subject has been deleted!'})
        })
    });
}

function updateSubjectStudent(req, res) {
    StudentSchema.findOne({name : req.body.student}, function (err,student) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!student) return res.status(404).send({message : 'Student does not exist'});
        SubjectSchema.findOneAndUpdate({name : req.params.subject}, {$push: {students: student._id.toString()}}, {new : true}, function (err,subjectUpdated) {
            if (err) return res.status(500).send({message: 'Error updating data base'});
            if (!subjectUpdated) return res.status(404).send({message: 'Subject does not exist'});
            student.update({$push: {subjects: subjectUpdated._id.toString()}}, {new: true},function (err) {
                if (err) return res.status(500).send({message: 'Error updating data base'});
            });
            res.status(200).send({message : 'Subject has been updated'});
        });
    })
}

function getSubjectStudy(req, res) {
    SubjectSchema.find({studies: req.params.data}).populate('students').exec(function (err, students) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!students) return res.status(404).send({message : 'Subjects do not exist'});
        else res.status(200).jsonp(students);
    })
}

function getSubjectSemester(req, res) {
    SubjectSchema.find({semester: req.params.data}).populate('students').exec(function (err, students) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!students) return res.status(404).send({message : 'Subjects do not exist'});
        else res.status(200).jsonp(students);
    })
}

function getSubjectSorted(req, res) {
    SubjectSchema.find({}).populate('students').exec(function (err, students) {
        if(err) return res.status(500).send({message : 'Error reading data base'});
        if(!students) return res.status(404).send({message : 'Subject does not exist'});
        else {
            students.sort( function(name1, name2) {
                if ( name1.name < name2.name ){
                    return -1;
                }else if( name1.name > name2.name ){
                    return 1;
                }else{
                    return 0;
                }
            });
            res.status(200).jsonp(students);
        }
    })
}

module.exports = {
    getSubject,
    getSubjects,
    addSubject,
    updateSubject,
    deleteSubject,
    updateSubjectStudent,
    getSubjectStudy,
    getSubjectSemester,
    getSubjectSorted
};