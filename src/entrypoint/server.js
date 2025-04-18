const express = require('express');
const http = require('http');
const { initializeSocket } = require('../infrastructure/socket/socketHandler');

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hogwarts backend working');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});

initializeSocket(server);
