export class Server{
    constructor(app, server){
        
        this.app = app;
        this.server = server;

        this.routes();
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hola Mundo');
        })
    }

    listen(port){
        this.server.listen(port, () => {
            console.log(`Listening on port http://localhost:${port}`);
        })
    }


}
