const pool = require("./db");

function getStudent(req, res) {
  pool.query("SELECT * from student ", (err, students) => {
    if (!err) {
      res.json(students.rows);
    }
  });
}

function getStudentById(req, res) {
  const id = req.params.id;
  pool.query(
    "select * from student where student_id = $1",
    [id],
    (err, student) => {
      if (!err) {
        res.json(student.rows);
      }
    }
  );
}

function addStudent(req, res) {
  const { fName, lName } = req.body;
  pool.query(
    "INSERT INTO student (first_name, last_name) VALUES ($1, $2) RETURNING *",
    [fName, lName],
    (err, student) => {
      if (err) {
        throw err;
      }
      res.send("Student added with ID: }" + student.rows[0].student_id);
    }
  );
}

function updateStudent(req, res) {
  const id = req.params.id;
  const { fName, lName } = req.body;

  pool.query(
    "update student set first_name = $1 , last_name = $2 where student_id = $3",
    [fName, lName, id],
    (err, student) => {
      if (!err) {
        res.send("student updated with id: " + id);
      } else {
        res.send(err);
      }
    }
  );
}

function deleteStudent(req, res) {
  const id = req.params.id;

  pool.query(
    "DELETE FROM student where student_id= $1",
    [id],
    (err, student) => {
      if (!err) {
        res.send("Student deleted with id: " + id);
      } else {
        res.send(err);
      }
    }
  );
}

module.exports = {
  getStudent,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
