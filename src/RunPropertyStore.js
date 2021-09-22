import { 
    StructProperty,
    PropertyFactory
} from 'uesavetool';

import { 
    range,
    RUNSTORE,
    REQUIREMENTS,
    Prng,
    PropertyStore,
    ItemPool
} from './index.js';

const FLOOR = {
    ASG_I:  0,
    ASG_II: 1,
    VAN_I:  2,
    VAN_II: 3,
    SVAR_I: 4,
    SVAR_II:5,
    HELL_I: 6,
    HELL_II:7,
    UNKOWN:8,
    MAX:9
}

export class RunPropertyStore extends StructProperty {
    constructor() {
        super();
        this.Name = 'RunPropertyStore\0';
        this.Type = 'StructProperty\0';
        this.StoredPropertyType = 'BPMRunPropertyStore\0'
        this.Properties = [ 
            PropertyStore.from({
                "Name": "BPMRunPropertyStore\u0000",
                "Type": "Tuple",
                "Properties": []
            })
        ];
    }
    addProperty(prop) {
        this.Properties[0]
            .addProperty(prop);
    }
    setProperty(name, value) {
        let indx = this.Properties[0].getPropertyIndex(name);
        if(indx !== -1)
            this.Properties[0].Properties[indx].Property = value;
    }
    getProperty(name) {
        return this.Properties[0].getProperty(name);
    }
    set Difficulty(diff) {
        this.addProperty(PropertyFactory.create(RUNSTORE.DIFFICULTY[diff.toUpperCase()]));
    }
    genSeeds(seed) {
        Prng.init(seed);
        for(let i = 0; i <= 9; i++) {
            let gen = PropertyFactory.create(RUNSTORE.FloorGenerationSeeds);
            let mod = PropertyFactory.create(RUNSTORE.FloorModifierFloats);
            let play = PropertyFactory.create(RUNSTORE.FloorPlaySeeds);
            gen.Property = [i, Prng.int16()];
            mod.Property = [i, Prng.quick() * 100];
            play.Property = [i, Prng.int32()];
            this.addProperty(gen);
            this.addProperty(mod);
            this.addProperty(play);
        }
    }
    assignFloor(floor, name) {
        let room = PropertyFactory.create(RUNSTORE[name]);
        room.Property = [floor, 1];
        this.addProperty(room);
    }
    genRooms([room, weight]) {
        switch(room) {
            case "LibraryBeforeArmoury":
                range([0, 4], i => {
                    if(Prng.chance(weight)) {
                        this.assignFloor(2*i, room);
                        this.assignFloor(2*i+1, room);
                    }
                })
                break;
            case "MinibossChoice":
                range([0, 4], i => Prng.pick(2*i, 2*i+1))
                    .forEach(f => this.assignFloor(f, room));
                break;
            // case "ChallengeRoomChosen": // Don't seem to affect runs in any way
            //     range([FLOOR.ASG_I, FLOOR.MAX], f => Prng.chance(weight) ? this.assignFloor(f, room) : null);
            //     break;
            case "PortalRoomChosen":
                Prng.choose([FLOOR.ASG_I, FLOOR.HELL_I], Prng.chance(weight))
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "StairsRoomChosen":
                Prng.choose([FLOOR.ASG_I, FLOOR.ASG_I], Prng.chance(weight))
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "ChoiceRoomChosen":
                if(this.Properties[0].has("StairsRoomChosen\0"))
                    Prng.choose([FLOOR.ASG_I, FLOOR.ASG_I], Prng.chance(weight))
                        .forEach(f => this.assignFloor(f, room));
                else if(Prng.chance(weight))
                    this.assignFloor(Prng.pick(FLOOR.ASG_I, FLOOR.SVAR_II), room);
                break;
            case "BankRoomChosen":
            case "HeroRoomChosen":
            case "BlackMarketRoomChosen":
            case "RerollRoomChosen":
            case "GamblingRoomChosen":
                let num = 0;
                while(Prng.chance(weight) && num < FLOOR.HELL_I) {
                    num++;
                    weight /= 2;
                }
                Prng.choose([FLOOR.ASG_I, FLOOR.SVAR_II], num)
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "PrestigeRoomChosen":
                Prng.choose([FLOOR.VAN_I, FLOOR.VAN_I], Prng.chance(weight))
                    .forEach(f => this.assignFloor(f, room));
                break;
        }
    }
    set FloorIndex(floor) {
        let index = PropertyFactory.create(RUNSTORE.FloorIndex);
        if(floor==="Crypts") {
            index.Property = [0, 1];
            let crypts = PropertyFactory.create(RUNSTORE.CRYPTSVISIT);
            this.addProperty(crypts);
        }
        else index.Property = [0, parseInt(floor)];
        this.addProperty(index);
    }
    static generate(seed, diff, opts) {
        let ret = new RunPropertyStore();
        REQUIREMENTS.POOLS
            .forEach(pool => ret.addProperty(ItemPool.generate(seed, pool, opts.ENHANCE)));
        ret.Difficulty = diff;
        ret.genSeeds(seed);
        Prng.init(seed);
        REQUIREMENTS.ROOMS.forEach(room => ret.genRooms(room));
        ret.FloorIndex = opts.FLOORINDEX;
        return ret;
    }
}
