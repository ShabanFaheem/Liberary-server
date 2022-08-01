const pool = require("./db");


function getBook(req, res) {
    pool.query("SELECT * from book ", (err, books) => {
      if (!err) {
        res.json(books.rows);
      }
    });
  }
  
  function getBookById(req, res) {
    const id = req.params.id;
    pool.query(
      "select * from book where book_id = $1",
      [id],
      (err, book) => {
        if (!err) {
          res.json(book.rows);
        }
      }
    );
  }
  
  function addBook(req, res) {
    const { title, author } = req.body;
    console.log(title + author)
    pool.query(
      "INSERT INTO book (title, author) VALUES ($1, $2) RETURNING *",
      [title, author],
      (err, book) => {
        if (err) {
          throw err;
        }
        res.send("Book added with ID: " + book.rows[0].book_id);
      }
    );
  }
  
  function updateBook(req, res) {
    const id = req.params.id;
    const { title, author } = req.body;
  
    pool.query(
      "update book set title = $1 , author = $2 where book_id = $3",
      [title, author, id],
      (err, book) => {
        if (!err) {
          res.send("Book updated with id: " + id);
        } else {
          res.send(err);
        }
      }
    );
  }
  
  function deleteBook(req, res) {
    const id = req.params.id;
  
    pool.query(
      "DELETE FROM book where book_id = $1",
      [id],
      (err, book) => {
        if (!err) {
          res.send("Book deleted with id: " + id);
        } else {
          res.send(err);
        }
      }
    );
  }



//   borrow_date = $1 , return_date = $2 ,
  function borrowBook(req, res){
    const id = req.params.id;
    console.log(id);
    const { borrowDate, returnDate, studentId } = req.body;
  
    pool.query(
      "update book set student_id = #1 where book_id = $2",
      [ studentId, id],
      (err, book) => {
        if (!err) {
          res.send("Book updated with id: " + id);
        } else {
          res.send(err);
        }
      }
    );
  }
  
  module.exports = {
    getBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    borrowBook
  };
  