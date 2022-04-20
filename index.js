const express = require('express')

// Get routes to the variabel
const router = require('./src/routes')

const cors = require('cors')

const http = require('http');
const { Server } = require('socket.io');

const app = express()

 const server = http.createServer(app);
const io = new Server(server, {
cors: {
origin: process.env.CLIENT_URL, // we must define cors because our client and server have diffe
},
});

require('./src/socket')(io);

const port = process.env.PORT || 5000

app.use(express.json())

app.use(cors())

// Add endpoint grouping and router
app.use('/api/v1/', router)

app.listen(port, () => console.log(`Listening on port ${port}!`))
