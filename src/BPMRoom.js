import { IntProperty } from "uesavetool";

export class BPMRoom extends IntProperty {
    constructor(name) {
        super();
        this.Name = `${name!==undefined?name:'BADROOM'}\0`;
        this.Type = "IntProperty\0";
        this.Property = [0, 1];
    }
    set Floor(index) {
        this.Property[0] = index;
    }
    get Floor() {
        return this.Property[0];
    }
    static create(floor, name) {
        let room = new BPMRoom(name);
        room.Floor = floor;
        return room;
    }
}
