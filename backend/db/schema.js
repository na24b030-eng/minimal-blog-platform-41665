const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '..', 'app.db'));

const seedPosts = [
  { title: 'Post 1', content: 'This is post 1' },
  { title: 'Post 2', content: 'This is post 2' },
  { title: 'Post 3', content: 'This is post 3' }
];

const seedCategories = [
  { name: 'Category 1' },
  { name: 'Category 2' },
  { name: 'Category 3' }
];

const seedComments = [
  { content: 'Comment 1' },
  { content: 'Comment 2' },
  { content: 'Comment 3' }
];

const tables = `
  CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
  CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

const insertPosts = `
  INSERT INTO posts (title, content)
  VALUES (?,?)
`;

const insertCategories = `
  INSERT INTO categories (name)
  VALUES (?);
`;

const insertComments = `
  INSERT INTO comments (content)
  VALUES (?);
`;

db.exec(tables);

seedPosts.forEach(row => {
  db.prepare(insertPosts).run(row.title, row.content);
});

seedCategories.forEach(row => {
  db.prepare(insertCategories).run(row.name);
});

seedComments.forEach(row => {
  db.prepare(insertComments).run(row.content);
});

module.exports = db;