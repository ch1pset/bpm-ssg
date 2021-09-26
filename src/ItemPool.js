import {
    StructProperty
} from 'uesavetool'

import {
    Prng,
    ITEMPOOL,
    ItemWeightPair
} from './index.js'

export class ItemPool extends StructProperty {
    constructor(name, type) {
        super();
        this.Name = `${name}\u0000`,
        this.Type = "StructProperty\u0000",
        this.StoredPropertyType = `BPM${type}WeightPair\u0000`,
        this.Properties = []
    }
    addItem(iw) {
        if(iw !== undefined && iw !== null)
            this.Properties.push(iw);
        return this;
    }
    delItem(value) {
        let indx = this.Properties.findIndex(p => p.Item === value);
        if(indx !== -1)
            return this.Properties.splice(indx, 1);
        return null;
    }
    static generate([name, type], enhance) {
        let pool = new ItemPool(name, type)
        let list = ITEMPOOL[name][enhance ? 'Enhanced' : 'Standard'];
        Prng.shuffle(list)
            .map(iw => ItemWeightPair.create(iw))
            .forEach(iw => pool.addItem(iw));
        return pool;
    }
}
