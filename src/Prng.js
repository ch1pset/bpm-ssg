import { prng_alea } from 'esm-seedrandom'

export const Prng = {
    _prng:null,
    init: function(seed) {
        this._prng = prng_alea(seed, {state: true})
    },
    int32: function() {
        if(this._prng !== null)
            return this._prng.int32();
        return 0;
    },
    int16: function() {
        if(this._prng !== null)
            return this._prng.int32() % (2**16);
        return 0;
    },
    quick: function() {
        if(this._prng !== null)
            return this._prng.quick();
        return 0;
    },
    range: function(min, max) {
        min = (min !== undefined) ? min : 0;
        max = (max !== undefined) ? max : 1;
        return Math.floor(this._prng.quick() * (max - min + 1)) + min;
    },
    choose: function([min, max], num) {
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
    },
    // Algorithm based on:
    // Weighted Random Sampling (2005; Efraimidis, Spirakis)
    //
    // Credits: https://github.com/denizdogan/weighted-shuffle by denizdogan
    shuffle: function(array, enhance) {
        return array.map(([i, w]) => [i, this.quick() ** (1 / enhance ? 1 : w)])
                    .sort((a, b) => b[1] - a[1]);
    },
    destroy: function() {
        this._prng = null;
    }
}
