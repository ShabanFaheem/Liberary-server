const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const student = require("./Quereis/student.js");
const book = require("./Quereis/book.js");

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

//    Student API

app.get("/student", student.getStudent);

app.get("/student/:id", student.getStudentById);

app.post("/student", student.addStudent);

app.put("/student/:id", student.updateStudent);

app.delete("/student/:id", student.deleteStudent);

//    Books API

app.get("/book" , book.getBook);

app.get("/book/:id", book.getBookById);

app.post("/book", book.addBook);

app.put("/book/:id", book.updateBook);

app.delete("/book/:id", book.deleteBook);

app.put("/book/borrow/:id", book.borrowBook)

app.listen(5000, () => {
  console.log("server listening at port 5000.");
});
