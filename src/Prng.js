import { prng_xorshift7 } from 'esm-seedrandom'

export class Prng {
    static _prng = null;
    static init(seed) {
        this._prng = prng_xorshift7(seed, {state: true})
    }
    static int32() {
        if(this._prng !== null)
            return this._prng.int32();
        return 0;
    }
    static int16() {
        if(this._prng !== null)
            return this._prng.int32() % (2**16);
        return 0;
    }
    static quick() {
        if(this._prng !== null)
            return this._prng.quick();
        return 0;
    }
    static range(min, max) {
        min = (min !== undefined) ? min : 0;
        max = (max !== undefined) ? max : 1;
        return Math.floor(this._prng.quick() * (max - min + 1)) + min;
    }
    static choose([min, max], num) {
        let values = [];
        num = (num !== undefined) ? num : this.range(min, max);
        if(num !== 0 && num === (max - min + 1)) {
            let i = min;
            while(values.length < num)
                values.push(i++);
            return values;
        }
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
        this._prng = null;
    }
}
