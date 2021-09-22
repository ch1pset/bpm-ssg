import {
    Tuple
} from 'uesavetool'

import {
    deep_copy_template,
    ITEMS
} from './index.js'

export class ItemWeightPair extends Tuple {
    constructor(type) {
        super()
        this.Name = `BPM${type==='Weapon'? type : 'Ability'}WeightPair`,
        this.Type = "Tuple",
        this.Properties = [
            {
                "Name": `BPM${type==='Weapon'? type : 'Ability'}\0`,
                "Type": "SoftObjectProperty\u0000",
                "Property": ""
            },
            {
                "Name": "Weight\u0000",
                "Type": "FloatProperty\u0000",
                "Property": []
            }
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
        let [name, prop] = ITEMS.find(([n, i]) => i.Value === this.Properties[0].Property);
        return name;
    }
    set Weight(value) {
        this.Properties[1].Property = [0, value];
    }
    get Weight() {
        return this.Properties[1].Property[1];
    }
    static from([name, weight]) {
        let [item, prop] = ITEMS.find(([n, i]) => n === name);
        if(item === undefined)
            console.log(`Mislabled/Missing Item '${name}'`);
        let item_weight_pair = new ItemWeightPair(prop.Type);
        item_weight_pair.Property = [prop.Value, weight];
        return item_weight_pair;
    }
}