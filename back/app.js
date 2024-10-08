
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'krek',
  password: 'krek',
  database: 'grade_system'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');

});

// API routes here

// Get all classes
app.get('/classes', (req, res) => {
  const sql = 'SELECT * FROM classes';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get students of a class
app.get('/classes/:classId/students', (req, res) => {
  const sql = 'SELECT * FROM students WHERE class_id = ?';
  db.query(sql, [req.params.classId], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add a new student
app.post('/students', (req, res) => {
  const { name, classId } = req.body;
  const sql = 'INSERT INTO students (name, class_id) VALUES (?, ?)';
  db.query(sql, [name, classId], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, classId });
  });
});

// Assign a grade to a student
app.post('/grades', (req, res) => {
  const { studentId, grade, weight, description } = req.body;
  const sql = 'INSERT INTO grades (student_id, grade, weight, description) VALUES (?, ?, ?, ?)';
  db.query(sql, [studentId, grade, weight, description], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, studentId, grade, weight, description });
  });
});

// Get sum of grades for all students in a class
app.get('/classes/:classId/grades/sum', (req, res) => {
  const sql = `SELECT SUM(grade * weight) as total 
               FROM grades 
               WHERE student_id IN (SELECT id FROM students WHERE class_id = ?)`;
  db.query(sql, [req.params.classId], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Get sum of grades for one student
app.get('/students/:studentId/grades/sum', (req, res) => {
  const sql = `SELECT SUM(grade * weight) as total 
               FROM grades 
               WHERE student_id = ?`;
  db.query(sql, [req.params.studentId], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Remove a grade
app.delete('/grades/:gradeId', (req, res) => {
  const sql = 'DELETE FROM grades WHERE id = ?';
  db.query(sql, [req.params.gradeId], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Grade removed' });
  });
});

// Remove a student
app.delete('/students/:studentId', (req, res) => {
  const sql = 'DELETE FROM students WHERE id = ?';
  db.query(sql, [req.params.studentId], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Student removed' });
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
