require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db/schema');
const sqlite3 = require('better-sqlite3')(db);

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = process.env.PORT || 3001;

app.get('/api/posts', async (req, res) => {
  try {
    const stmt = sqlite3.prepare('SELECT * FROM posts');
    const posts = stmt.all();
    stmt.finalize();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const stmt = sqlite3.prepare('SELECT * FROM posts WHERE id = ?');
    const post = stmt.get(id);
    stmt.finalize();
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, category_id } = req.body;
    const stmt = sqlite3.prepare('INSERT INTO posts (title, content, category_id) VALUES (?, ?, ?)');
    const info = stmt.run(title, content, category_id);
    stmt.finalize();
    res.json({ id: info.lastInsertRowid, title, content, category_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, category_id } = req.body;
    const stmt = sqlite3.prepare('UPDATE posts SET title = ?, content = ?, category_id = ? WHERE id = ?');
    const info = stmt.run(title, content, category_id, id);
    stmt.finalize();
    if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ id, title, content, category_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const stmt = sqlite3.prepare('DELETE FROM posts WHERE id = ?');
    const info = stmt.run(id);
    stmt.finalize();
    if (info.changes === 0) return res.status(404).json({ error: 'Post not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const stmt = sqlite3.prepare('SELECT * FROM categories');
    const categories = stmt.all();
    stmt.finalize();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    const stmt = sqlite3.prepare('SELECT * FROM comments');
    const comments = stmt.all();
    stmt.finalize();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.listen(PORT);