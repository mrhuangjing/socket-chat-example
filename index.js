const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const util = require('./util');

const users = [];

app.get('/', (req, res) => {
    const nick = util.extractNickFromCookie(req.headers.cookie);
    users.push(nick);
    res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', socket => {
    io.emit('message', `welcome ${users[users.length - 1]}~`);
    socket.on('message', msg => {
        const arr = msg.split('->');
        const user = arr[0];
        let words = arr[1];
        io.emit('message', `{${user}} is typing -> ${words}`);
    });
    socket.on('disconnect', (msg) => {
        console.log('a user disconnected', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on port: 3000');
});