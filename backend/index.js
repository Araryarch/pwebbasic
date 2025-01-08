import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  database: 'pwebdasar',
  user: 'root',
  password: '',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

app.get('/', (req, res) => {
  const query = 'SELECT id, list FROM todolist';
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.json({ success: true, data: result });
  });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, list FROM todolist WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    if (result.length === 0) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, data: result[0] });
  });
});

app.post('/', (req, res) => {
  const { list } = req.body;
  const query = 'INSERT INTO todolist (list) VALUES (?)';
  db.query(query, [list], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.status(201).json({ success: true, message: 'Todo added successfully!' });
  });
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { list } = req.body;
  const query = 'UPDATE todolist SET list = ? WHERE id = ?';
  db.query(query, [list, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, message: 'Todo updated successfully!' });
  });
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM todolist WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.json({ success: true, message: 'Todo deleted successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
