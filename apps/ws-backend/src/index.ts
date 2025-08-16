import {WebSocketServer} from 'ws';

const wss =new WebSocketServer({
    port: 8080,
})

wss.on('connection',(ws)=>{
    ws.on('error',()=>{
        console.error('WebSocket error occurred');
    });
    ws.on('message',(message)=>{
        console.log(`Received message: ${message}`);
        ws.send(`Echo: ${message}`);
    })
    ws.send('Welcome to the WebSocket server!');
})