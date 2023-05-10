const sqlite3 = require('sqlite3').verbose(),
    dbPath = './database.db';

const getUsers = (req, res) => {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT username FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        db.close();
        const prettyJson = JSON.stringify(rows, null, 2);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(prettyJson);
    });
};

const login = (req, res) => {
    const { username, password } = req.body,
        db = new sqlite3.Database(dbPath);
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        db.close();
        if (!row || row.password !== password) {
            res.status(401).json({
                error: 'Username or password is incorrect',
            });
            return;
        }
        res.status(200).send(`Welcome back ${row.username}`);
    });
};

module.exports = {
    getUsers,
    login,
};
