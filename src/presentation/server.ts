import express from 'express'
import path from 'path';

interface Options {
    port: number,
    public_path ?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options:Options){
        const {port,public_path = 'public'} = options

        this.port = port
        this.publicPath = public_path
    }

    async start(){

        //* Middlewares

        //- Public Folder
        this.app.use(express.static(this.publicPath)) // hace que tome todo lo que este en el directorio de public pueden ser .css .js etc-

        // Con esta parte del codigo lo que hago es permitir la recarga de la pagina, siempre llevando de nuevo al index donde luego se encarga el router.
        this.app.get('*', (req, res) =>{
            console.log(req.url)
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
            return;
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })

    }
}