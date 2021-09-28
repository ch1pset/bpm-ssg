import { Property } from 'uesavetool';
import {
    RUNSTORE,
    Prng,
    range,
    createProperty
} from './index.js'

export const FloorSeeds = {
    /**
     * @param {string} name
     * @return {Property}
     */
    generate: function(name) {
        const seed = (n) => {
            switch(n) {
                case "FloorGenerationSeeds":
                    return Prng.int16();
                case "FloorModifierFloats":
                    return Prng.quick() * 100;
                case "FloorPlaySeeds":
                    return Prng.int32();
            }
        }
        return range([0, 9], i => {
            let p = createProperty(RUNSTORE[name]);
            p.Property = [i, seed(name)];
            return p;
        });
    }
}
