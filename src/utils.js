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
    static quick() {
        return this._prng.quick();
    }
    static destroy() {
        this._prng = {};
    }
}

export async function json(path) {
    return JSON.parse(await fs.readFile(path, 'utf8'));
}

// Algorithm based on:
// Weighted Random Sampling (2005; Efraimidis, Spirakis)
//
// Credits: https://github.com/denizdogan/weighted-shuffle by denizdogan
export function weightedShuffle(array) {
    let ret = Object.assign([], array);
    ret.forEach(item => item[1] = prng.quick() ** (1 / item[1]));
    ret.sort((a, b) => b[1] - a[1]);
    return ret;
}

export function rollDice(min, max) {
    min = (min !== undefined) ? min : 0;
    max = (max !== undefined) ? max : 1;
    return Math.floor(prng.quick() * (max - min + 1)) + min; //inclusive range
}

export function chooseFromRange([min, max], num) {
    let values = [];
    num = (num !== undefined) ? num : rollDice(min, max);
    for(let i = 0; i < num; i++) {
        let val;
        while(values.includes(val = rollDice(min, max)));
        values.push(val);
    }
    return values;
}