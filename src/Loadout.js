import {
    Prng,
    itemsOfType
} from './index.js'

export const Loadout = {
    /**
     * @param {[string, string]} item
     * @return {{Name:string,Value:string}}
     */
    generate: function([name, type]) {
        let [item] = Prng.select(itemsOfType(type), 1)
        return {Name:name, Value:item};
    }
}
