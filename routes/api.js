const express = require('express');
const api = express.Router();
const studentCtrl = require('../controllers/studentCtrl');
const subjectCtrl = require('../controllers/subjectCtrl');

//Enable CORS
api.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', "Content-Type, Authorization, Content-Length, X-Requested-With,X-Custom-Header,Origin");
    res.header('Access-Control-Allow-Credentials', "true");
    if ('OPTIONS' === req.method) {
        res.status(200).send();
    }
    else {
        next();
    }
});


//Student Routes//
api.get('/student/:student/read', studentCtrl.getStudent);
api.get('/student/all', studentCtrl.getStudents);
api.post('/student/add', studentCtrl.addStudent);
api.put('/student/:student/update', studentCtrl.updateStudent);
api.delete('/student/:student/delete', studentCtrl.deleteStudent);

api.put('/student/:student/update/subject', studentCtrl.updateStudentSubject);


//Subject Routes//
api.get('/subject/:subject/read', subjectCtrl.getSubject);
api.get('/subject/all', subjectCtrl.getSubjects);
api.post('/subject/add', subjectCtrl.addSubject);
api.put('/subject/:subject/update', subjectCtrl.updateSubject);
api.delete('/subject/:subject/delete', subjectCtrl.deleteSubject);

//Special Routes Minim1//
api.put('/subject/:subject/update/student', subjectCtrl.updateSubjectStudent);
api.get('/subject/search/study/:data', subjectCtrl.getSubjectStudy);
api.get('/subject/search/semester/:data', subjectCtrl.getSubjectSemester);
api.get('/subject/search/sorted', subjectCtrl.getSubjectSorted);



module.exports = api;
