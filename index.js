import { ContinueStateV2 } from './src/index.js';
export default function bpmssg(args) {
    return ContinueStateV2.seededGen(args);
}

export * from './src/index.js'
export { bpmssg }