import {
    Tuple
} from 'uesavetool'

import {
    ITEMS,
    RUNSTORE,
    createProperty
} from './index.js'

export class ItemWeightPair extends Tuple {
    constructor(type) {
        super()
        let isWeapon = type==='Weapon';
        this.Name = `BPM${isWeapon ? type : 'Ability'}WeightPair`,
        this.Type = "Tuple",
        this.Properties = [
            createProperty(RUNSTORE[isWeapon ? 'BPMWeapon' : 'BPMAbility']),
            createProperty(RUNSTORE.Weight)
        ]
    }
    set Property([item, weight]) {
        this.Item = item;
        this.Weight = weight;
    }
    get Property() {
        return [this.Item, this.Weight];
    }
    set Item(value) {
        this.Properties[0].Property = value;
    }
    get Item() {
        return this.Properties[0].Property;
    }
    set Weight(value) {
        this.Properties[1].Property = [0, value];
    }
    get Weight() {
        return this.Properties[1].Property[1];
    }
    static create([name, weight]) {
        let item = ITEMS[name];
        if(item === undefined) {
            console.log(`Mislabled/Missing Item '${name}'`);
            return null;
        }
        let item_weight_pair = new ItemWeightPair(item.Type);
        item_weight_pair.Property = [item.Value, weight];
        return item_weight_pair;
    }
}