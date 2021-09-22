import {
    ArrayProperty,
    StructProperty
} from 'uesavetool'

import {
    Prng,
    deep_copy_template,
    ITEMPOOL,
    ITEMS,
    ItemWeightPair
} from './index.js'

export class ItemPool extends ArrayProperty {
    constructor(name, type) {
        super();
        this.Name = `${name}\u0000`;
        this.Type = "ArrayProperty\u0000";
        this.StoredPropertyType = "StructProperty\u0000";
        this.Property = StructProperty.from({
            Name: `${name}\u0000`,
            Type: "StructProperty\u0000",
            StoredPropertyType: `BPM${type}WeightPair\u0000`,
            Properties: []
        });
    }
    addItem(iw) {
        this.Property.Properties.push(ItemWeightPair.from(iw));
    }
    delItemByValue(value) {
        let [name, prop] = ITEMS.find(([n, i]) => i.Value === value);
        let indx = this.Property.Properties.findIndex(p => p.Item === name);
        if(indx !== -1)
            return this.Property.Properties.splice(indx, 1);
        return null;
    }
    static generate(seed, [name, type], enhance, starter) {
        Prng.init(seed);
        let pool = new ItemPool(name, type)
        let list = ITEMPOOL[name].Standard ?
            ITEMPOOL[name][enhance ? 'Enhanced' : 'Standard'] :
            ITEMPOOL[name];
        Prng.shuffle(deep_copy_template(list))
            .forEach(iw => pool.addItem(iw));
        if(type === 'Weapon' && starter !== undefined) {
            pool.delItemByValue(starter);
        }
        return pool;
    }
}