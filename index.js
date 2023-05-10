const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    port = 8080,
    users = require('./routes/users');

app.use(morgan('tiny'));
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
