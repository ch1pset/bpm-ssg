import {
    Prng,
    itemsOfType
} from './index.js'

export const Inventory = {
    /**
     * @param {[string, number]} item
     * @return {{Name:string,Value:(string|number)}}
     */
    generate: function([name, amt]) {
        const prop = (name) => {
            switch(name) {
                case "StoredWeapon":
                    let list = itemsOfType('Weapon');
                    return list[Prng.pick(0, list.length - 2)];
                case "StoredMobilityAbility":
                    return itemsOfType('Auxilary').slice(0,2)[Prng.pick(0, 1)];
                case "StoredHealth":
                case "StoredShield":
                    return (25 * Prng.pick(0, amt));
                case "StoredCoins":
                case "StoredKeys":
                    return Prng.pick(0, amt);
            }
        }
        return {Name:name, Value:prop(name)}
    }
}
