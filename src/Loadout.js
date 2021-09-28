import { Property } from 'uesavetool';
import {
    Prng,
    itemsOfType,
    createProperty
} from './index.js'

export const Loadout = {
    /**
     * @param {[string, string]} item
     * @return {Property}
     */
    generate: function([pname, type]) {
        let [item] = Prng.select(itemsOfType(type), 1)
        let p = createProperty(CHARSTORE[pname]);
        p.Property = item;
        return p;
    }
}
