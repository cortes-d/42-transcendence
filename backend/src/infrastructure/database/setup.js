const sqlite3 = require('sqlite3').verbose();

module.exports.initializeDatabase = (db) => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    )`);

    // Insert test user
    const stmt = db.prepare("INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)");
    stmt.run("testuser", "testpassword");
    stmt.finalize();
  });
};