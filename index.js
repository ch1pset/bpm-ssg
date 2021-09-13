import { ContinueStateV2 } from './src/index.js';
function gen(args) {
    let a = {
        s:args.seed,
        c:args.char,
        d:args.diff
    }
    return ContinueStateV2.seededGen(a);
}

export * from './src/index.js'
export { gen as bpmssg }