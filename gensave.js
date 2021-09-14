import * as fs from 'fs'
// import { ContinueStateV2 } from "./index.js";
import { bpmssg, ContinueStateV2 } from './index.js'

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
    let a = {s:args.seed, c:args.char, d:args.diff};
    let save = ContinueStateV2.seededGen(a);
    let save2 = ContinueStateV2.seededGen(a);
    console.log(`First Size: ${save.Size} Second Size: ${save2.Size}`);
    fs.writeFile('./ContinueStateV2.sav', save.serialize(), err => {
        if(err) throw err;
    })
    fs.writeFile('./output.json', JSON.stringify(save, null, 2), err => {
        if(err) throw err;
    });
}


__MAIN:
    main(process.argv.slice(2));