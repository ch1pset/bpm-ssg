import { prng_alea } from 'esm-seedrandom'
import { range } from './index.js';

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
    pick: function(min, max) {
        min = (min !== undefined) ? min : 0;
        max = (max !== undefined) ? max : 1;
        return Math.floor(this._prng.quick() * (max - min + 1)) + min;
    },
    choose: function([min, max], num) {
        let values = [];
        if(num > 0) {
            values = range([min, max]);
            while(values.length > num)
                values.splice(this.pick(0, values.length - 1), 1);
        }
        return values;
    },
    chance: function (pct_float) {
        return this._prng.quick() < pct_float ? 1 : 0;
    },
    // Algorithm based on:
    // Weighted Random Sampling (2005; Efraimidis, Spirakis)
    //
    // Credits: https://github.com/denizdogan/weighted-shuffle by denizdogan
    shuffle: function(array) {
        return array.map(([i, w]) => [i.slice(0), Math.pow(this.quick(), (1 / w))])
                    .sort(([an, aw], [bn, bw]) => bw - aw);
    },
    /**
     * Selects `num` random items from `list` and returns a new `Array` containing the selected items
     * 
     * @param {Array} list 
     * @param {Number} num
     */
    select: function(list, num) {
        num = (num!==undefined) ? num : this.pick(0, list.length)
        return this.choose([0, list.length - 1], num).map(i => list[i]);
    },
    destroy: function() {
        this._prng = null;
    }
}
