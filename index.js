import { ContinueStateV2 } from './src/index.js';
function gen(args) {
    return ContinueStateV2.seededGen(args);
}

export * from './src/index.js'
export { gen as bpmssg }