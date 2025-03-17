import express from"express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import fs from "fs"

const app = express();
const server = createServer(app);
const io = new Server(server, {maxHttpBufferSize: 10 * 1024 * 1024,})


app.get('/', (req, res)=>{
    res.json( { message : "Hola Mundo" } );
})

io.on('connection', async(socket)=>{
    console.log('a user has connected');

    socket.on("image", (data) => {
        console.log("Received image:", data.filename);

        // Convert base64 back to image and save
        const imageBuffer = Buffer.from(data.data, "base64");
        fs.writeFileSync(`uploads/${data.filename}`, imageBuffer);

        console.log("Image saved!");
    });

    socket.on('message', async (msg) => {
        console.log(msg)
    })
    
    socket.on('disconnect', ()=>{
        console.log('a user has disconnected')
    })

})



server.listen(80, ()=>{
    console.log(`Listening on http://localhost:80`);
})