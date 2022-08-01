Create database liberary_database;

Create table student(
    student_id serial primary key,
    first_name varchar(50),
    last_name varchar(50)
);
 
Create table book(
    book_id serial primary key,
    title varchar(50),
    author varchar(50),
    borrow_date date,
    return_date date,
    student_id integer references student(student_id)
);