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
        let [item, prop] = ITEMS.find(([n, i]) => n === name);
        if(item === undefined)
            console.log(`Mislabled/Missing Item '${name}'`);
        let item_weight_pair = new ItemWeightPair(prop.Type);
        item_weight_pair.Property = [prop.Value, weight];
        return item_weight_pair;
    }
}