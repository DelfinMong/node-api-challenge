const express = require('express');
const server = express();
const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

server.use(express.json());
server.use('/api/action', actionRouter)
server.use('/api/project', projectRouter)

server.get('/',(req,res) => {
    res.send(`<h1> This is a sprint challenge </h1>`)
})

module.exports = server;