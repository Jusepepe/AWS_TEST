export class Server{
    constructor(app, server, protocol){
        this.app = app;
        this.server = server;
        this.protocol = protocol;

        this.routes();
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hola Mundo');
        })
    }

    communicationStart(){
        this.protocol.start();
    }

    listen(port){
        this.server.listen(port, () => {
            console.log(`Listening on port http://localhost:${port}`);
        })
    }


}
