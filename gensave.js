import * as fs from 'fs/promises';
import { ContinueStateV2 } from "./index.js";

function main(argv) {

    let args = {
        seed:"0",
        char:"goll",
        diff:"hard"
    };
    argv.forEach(a => {
        let arg = a.split(':');
        args[arg[0]] = arg[1];
    })
    const save = ContinueStateV2.seededGen(args.seed, args.char, args.diff);
    fs.writeFile('./output.json', JSON.stringify(save, null, 2));
    fs.writeFile('./ContinueStateV2.sav', save.serialize());
}

__MAIN:
    main(process.argv.slice(2));