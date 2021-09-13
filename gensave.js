import * as fs from 'fs'
// import { ContinueStateV2 } from "./index.js";
import { bpmssg } from './index.js'

function main(argv) {

    
    let args = {
        seed:"0",
        char:"goll",
        diff:"hard"
    };
    argv.forEach(a => {
        let [name, value] = a.split(':');
        args[name] = value;
    })
    const save = bpmssg(args);
    fs.writeFile('./ContinueStateV2.sav', save.serialize(), err => {
        if(err) throw err;
    })
    fs.writeFile('./output.json', JSON.stringify(save, null, 2), err => {
        if(err) throw err;
    });
}


__MAIN:
    main(process.argv.slice(2));