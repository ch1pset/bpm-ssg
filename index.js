import { ContinueStateV2 } from './src/index.js';
export default function bpmssg(args) {
    return ContinueStateV2.generate(args);
}

export * from './src/index.js'
export { bpmssg }