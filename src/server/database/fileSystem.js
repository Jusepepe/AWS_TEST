import fs from "fs";

export class FileSystem{
    constructor(){

    }

    save(name, content){
        fs.writeFileSync(`uploads/${name}`, content)
    }
}