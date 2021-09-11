import { PropertyFactory, Tuple } from "uesavetool";

export class PropertyStore extends Tuple {
    constructor() {
        super();
    }
    addProperty(prop) {
        this.Properties.push(PropertyFactory.create(prop));
    }
    has(name) {
        return this.Properties.findIndex(p => p.Name === name) !== -1;
    }
    static from(obj) {
        let ret = new PropertyStore();
        ret.Name = obj.Name;
        ret.Type = obj.Type;
        ret.Properties = [];
        if(obj.Properties)
            obj.Properties.forEach(prop => ret.Properties.push(PropertyFactory.create(prop)))
        return ret;
    }
}