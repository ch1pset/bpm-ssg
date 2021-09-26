import { Tuple } from "uesavetool";

export class PropertyStore extends Tuple {
    constructor() {
        super();
    }
    getIndex(name) {
        return this.Properties.findIndex(p => p.Name === name)
    }
    valueOf(name) {
        return this.get(name).Property;
    }
    get(name) {
        return this.Properties.find(p => p.Name === name);
    }
    set(name, value) {
        let prop = this.get(name);
        prop.Property = value;
        return prop;
    }
    add(prop) {
        if(prop !== undefined && prop !== null)
            this.Properties.push(prop);
        return this;
    }
    concat(props) {
        props.forEach(p => this.add(p));
        return this;
    }
    remove(name) {
        let indx = this.getIndex(name);
        if(indx !== -1)
            this.Properties.splice(indx, 1);
        return this;
    }
    has(name) {
        return this.getIndex(name) !== -1;
    }
}