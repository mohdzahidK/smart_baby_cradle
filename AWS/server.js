
const WebSocket = require('ws');
const wss = new WebSocket.Server({port:5000});
console.log('node_1 is running on 5000...')
var mode = 'auto'
wss.on('connection', function connection(ws,req) {
        console.log("Connection 1 Success")
        socketId = Math.random()
        ws['socketId'] = socketId
        //ws.send(JSON.stringify({msg:'connection-success',socketId:socketId}))
        ws.on('message', function incoming(data) {
                console.log('msg rcvd server_1..',data.toString())
		wss.clients.forEach(client=>{
                        client.send(data.toString())
                })
        })
})
