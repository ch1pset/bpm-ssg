import { PropertyFactory, Tuple } from "uesavetool";

export class PropertyStore extends Tuple {
    constructor() {
        super();
    }
    getPropertyIndex(name) {
        return this.Properties.findIndex(p => p.Name === name)
    }
    addProperty(prop) {
        this.Properties.push(PropertyFactory.create(prop));
    }
    delProperty(name) {
        let indx = this.getPropertyIndex(name);
        if(indx !== -1)
            this.Properties.splice(indx, 1);
    }
    has(name) {
        return this.getPropertyIndex(name) !== -1;
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