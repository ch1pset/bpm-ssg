import * as fs from 'fs'
import { ContinueStateV2 } from "./index.js";

function main(argv) {

    let args = {
        s:"0",
        c:"goll",
        d:"hard",
        "-o":false
    };
    argv.forEach(a => {
        let [name, value] = a.split(':');
        if(name === "-o") value = true;
        args[name] = value;
    })
    const save = ContinueStateV2.seededGen(args);
    const out_buf = save.serialize();
    if(args["-o"] === true) {
        fs.writeFile('./ContinueStateV2.sav', out_buf, err => {
            if(err) throw err;
        })
        fs.writeFile('./output.json', JSON.stringify(save, null, 2), err => {
            if(err) throw err;
        });
    }
}


__MAIN:
    main(process.argv.slice(2));