export class WebSocket{

    constructor(database, io){
        this.database = database;
        this.io = io;
    }

    start(){
        this.io.on('connection', async (socket) => {
            console.log('A user has connected!')

            this.receiveDataEvent(socket);

            this.receiveImageEvent(socket);

            this.disconnectionEvent(socket);

        })
    }

    receiveDataEvent(socket){
        socket.on('message', async (msg) => {
            console.log(msg)
        })
    }

    receiveImageEvent(socket){
        socket.on("image", (data) => {
                console.log("Received image:", data.filename);
        
                // Convert base64 back to image and save
                const imageBuffer = Buffer.from(data.data, "base64");
                this.database.save(data.filename ,imageBuffer);
        
                console.log("Image saved!");
            });
    }

    disconnectionEvent(socket){
        socket.on('disconnect', ()=>{
            console.log('A user has disconnected!')
        })
    }
}