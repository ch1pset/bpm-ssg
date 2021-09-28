import { IntProperty } from "uesavetool";
import {
    Prng,
    range
} from './index.js'

const FLOOR = {
    ASG_I:  0, ASG_II: 1,
    VAN_I:  2, VAN_II: 3,
    SVAR_I: 4, SVAR_II:5,
    HELL_I: 6, HELL_II:7,
    UNKOWN:8, MAX:9
}

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
    static generate([room, rate]) {
        switch(room) {
            case "LibraryBeforeArmoury":
                return range([0, 4], i => Prng.chance(rate) ?
                    [ BPMRoom.create(2*i, room), BPMRoom.create(2*i+1, room) ] 
                    : null).flat();
            case "MinibossChoice":
                return range([0, 4], i => Prng.pick(2*i, 2*i+1))
                    .map(f => BPMRoom.create(f, room));
            case "StairsRoomChosen":
                return Prng.chance(rate) ?
                    BPMRoom.create(FLOOR.ASG_I, room) : null;
            case "ChoiceRoomChosen":
                return Prng.chance(rate) ?
                    BPMRoom.create(Prng.pick(FLOOR.ASG_I, FLOOR.SVAR_II), room) : null;
            case "PortalRoomChosen":
                return Prng.choose([FLOOR.ASG_I, FLOOR.HELL_I], Prng.chance(rate))
                    .map(f => BPMRoom.create(f, room));
            case "PrestigeRoomChosen":
                return Prng.choose([FLOOR.VAN_I, FLOOR.VAN_I], Prng.chance(rate))
                    .map(f => BPMRoom.create(f, room));
            case "BankRoomChosen":
            case "HeroRoomChosen":
            case "BlackMarketRoomChosen":
            case "RerollRoomChosen":
            case "GamblingRoomChosen":
                let num = 0;
                while(Prng.chance(rate) && num++ < FLOOR.HELL_I)
                    rate /= 2;
                return Prng.choose([FLOOR.ASG_I, FLOOR.SVAR_II], num)
                    .map(f => BPMRoom.create(f, room));
        }
    }
}
