import { ContinueStateV2 } from './src/index.js';
function gen(args) {
    let a = {
        s:args.seed,
        c:args.char,
        d:args.diff
    }
    const save = ContinueStateV2.seededGen(a);
    return save.serialize();
}

export * from './src/index.js'
export { gen as bpmssg }