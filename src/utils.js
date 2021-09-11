import * as fs from 'fs/promises'
import { prng_xorshift7 } from 'esm-seedrandom'

export class prng {
    static _prng = {};
    static init(seed) {
        this._prng = prng_xorshift7(seed, {state: true})
    }
    static int32() {
        return this._prng.int32();
    }
    static int16() {
        return this._prng.int32() % (2**16);
    }
    static quick() {
        return this._prng.quick();
    }
    static range(min, max) {
        min = (min !== undefined) ? min : 0;
        max = (max !== undefined) ? max : 1;
        return Math.floor(this._prng.quick() * (max - min + 1)) + min;
    }
    static choose([min, max], num) {
        let values = [];
        num = (num !== undefined) ? num : this.range(min, max);
        for(let i = 0; i < num; i++) {
            let val;
            while(values.includes(val = this.range(min, max)));
            values.push(val);
        }
        return values;
    }
    // Algorithm based on:
    // Weighted Random Sampling (2005; Efraimidis, Spirakis)
    //
    // Credits: https://github.com/denizdogan/weighted-shuffle by denizdogan
    static shuffle(array) {
        return array.map(([i, w]) => [i, this.quick() ** (1 / w)])
                    .sort((a, b) => b[1] - a[1]);
    }
    static destroy() {
        this._prng = {};
    }
}

export async function json(path) {
    return JSON.parse(await fs.readFile(path, 'utf8'));
}
