import * as fs from 'fs/promises';
import { ContinueStateV2 } from "./index.js";

function main(args) {
    const seed = args[2];
    const char = args[3];
    const diff = args[4];

    const save = ContinueStateV2.seededGen(seed, char, diff);
    fs.writeFile('./output.json', JSON.stringify(save, null, 2));
    fs.writeFile('./ContinueStateV2.sav', save.serialize());
}

__MAIN:
    main(process.argv);