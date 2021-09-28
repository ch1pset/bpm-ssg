import { Property } from 'uesavetool';
import {
    Prng,
    itemsOfType,
    createProperty
} from './index.js'

export const Inventory = {
    /**
     * @param {[string, number]} item
     * @return {Property}
     */
    generate: function([pname, amt]) {
        const prop = (name) => {
            switch(name) {
                case "StoredWeapon":
                    let list = itemsOfType('Weapon');
                    return list[Prng.pick(0, list.length - 2)];
                case "StoredMobilityAbility":
                    return itemsOfType('Auxilary').slice(0,2)[Prng.pick(0, 1)];
                case "StoredHealth":
                case "StoredShield":
                    return [0, (25 * Prng.pick(0, amt))];
                case "StoredCoins":
                case "StoredKeys":
                    return [0, Prng.pick(0, amt)];
            }
        }
        let p = createProperty(CHARSTORE[pname])
        p.Property = prop(pname);
        return p;
    }
}
