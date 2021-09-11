import {
    PropertyFactory,
    Tuple
} from 'uesavetool'

import {

} from './index.js'

export class ItemWeightPair extends Tuple {
    constructor() {
        super()
        this.Name = "ItemWeightPair",
        this.Type = "Tuple",
        this.Properties = [
            {
                "Name": "Item",
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
    set Item(value) {
        this.Properties[0].Property = value;
    }
    set Weight(value) {
        this.Properties[1].Property = [0, value];
    }
    static from(obj) {
        let ret = new ItemWeightPair();
        ret.Name = obj.Name;
        ret.Type = obj.Type;
        ret.Properties = [];
        if(obj.Properties !== undefined)
            obj.Properties.forEach(prop => ret.Properties.push(PropertyFactory.create(prop)))
        return ret;
    }
}