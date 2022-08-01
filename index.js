const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");


// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/student", function (req, res) {
  pool.query("SELECT * from student ", (err, students) => {
    if (!err) {
      res.json(students.rows);
    }
  });
});

app.get("/student/:id", function (req, res) {
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
});

app.post("/student", function (req, res) {
  const { fName, lName } = req.body;

  pool.query(
    "INSERT INTO student (first_name, last_name) VALUES ($1, $2) RETURNING *",
    [fName, lName],
    (err, student) => {
      if (err) {
        throw err;
      }
      res.send("Student added with ID: ${student.rows[0].student_id}");
    }
  );
});

app.put("/student/:id", function (req, res) {
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
});

app.delete("/student/:id", function (req, res) {
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
});

app.listen(5000, () => {
  console.log("server listening at port 5000.");
});
