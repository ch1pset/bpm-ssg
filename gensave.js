import { stdout } from 'process';
import { ContinueStateV2 } from "./index.js";

export function main(argv) {

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
    if(args["-o"] === true)
        stdout.write(out_buf, (err) => {
            if(err) throw err;
        });
    return out_buf;
}

__MAIN:
    main(process.argv.slice(2));