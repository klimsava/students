const studentsModel = require('../models/students.model');

//get all students
exports.getStudentsList = async (req, res) => {
  try {
    studentsModel.getAllStudents((err, students) => {
      console.log('We are here');
      res.send(200, students);
    });
  } catch (err) {
    res.send(422, err);
  }
};

//create new student
exports.createNewStudent = (req, res) => {
  console.log('create new stud', req.body);
  const studentReqData = new studentsModel(req.body);
  studentsModel.checkStudentExist(studentReqData, (err, student) => {
    if (student) {
      res.status(422).json({status: false, message: 'The student already exists!'})
    } else {
      studentsModel.createStudent(studentReqData, (err, student) => {
        if (err) {
          res.send(err);
        }

        res.json({
          status: true,
          message: 'Student created successfully',
          data: student.insertId,
        });
      });
    }
  });
};

//update student
exports.updateStudents = (req, res) => {
  const studentReqData = new studentsModel(req.body);
  studentsModel.checkStudentExist(studentReqData, (err, student) => {
    if (student) {
      res.status(422).json({status: false, message: "Student exists!"});
    } else {
      console.log('Students update', studentReqData);
      studentsModel.updateStudents(req.params.id, studentReqData, (err, student) => {
        res.json({
          status: true,
          message: 'Student updated successfully',
          data: student.insertId,
        });
      });
    }
  });
};

//delete student
exports.deleteStudent = (req, res) => {
  studentsModel.deleteStudent(req.params.id, (err, student) => {
    res.json({
      success: true,
      message: 'Student deleted successfully',
    });
  });
};

exports.selectedCourse = (req, res) => {
  studentsModel.checkSelectedCourse(req.body, (err, selectedCourse) => {
    console.log(req.body);
    if (selectedCourse) {
      res.status(422).json({status: false, message: 'You are already enrolled in the course at this time!'})
    } else {
      studentsModel.selectCourse(req.body, (err, student) => {
        if (err) {
          res.send(err);
        }
        res.status(200).json({
          status: true,
          message: 'The course was successfully selected!',
        });
      });
    }
  });
};
