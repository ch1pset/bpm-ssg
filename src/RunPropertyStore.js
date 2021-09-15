import { 
    StructProperty,
    PropertyFactory
} from 'uesavetool';

import { 
    deep_copy_template,
    RUNSTORE,
    REQUIREMENTS,
    ITEMPOOL,
    Prng,
    PropertyStore,
    ItemWeightPair,
    ITEMS
} from './index.js';

const FLOOR = {
    ASG_I:  0,
    ASG_II: 1,
    VAN_I:  2,
    VAN_II: 3,
    SVAR_I: 4,
    SVAR_II:5,
    HELL_I: 6,
    HELL_II:7
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
            .addProperty(PropertyFactory.create(prop));
    }
    setProperty(name, value) {
        let indx = this.Properties[0].getPropertyIndex(name);
        if(indx !== -1)
            this.Properties[0].Properties[indx].Property = value;
    }
    set Difficulty(diff) {
        this.addProperty(RUNSTORE.DIFFICULTY[diff.toUpperCase()]);
    }
    genItemPool(seed, name, enhance) {
        Prng.init(seed);
        let item_pool = deep_copy_template(RUNSTORE[name]);
        let list = ITEMPOOL[name].Standard 
                ? ITEMPOOL[name][enhance ? 'Enhanced' : 'Standard'] 
                : ITEMPOOL[name];
        let pool = Prng.shuffle(deep_copy_template(list));
    
        pool.forEach(([item, weight]) => {
            let [iname, prop] = ITEMS.find(([n,p]) => n===item);
            if(iname === undefined)
                console.log(`Mislabled/Missing Item '${item}'. Check item pool '${name}' for typos.`);
            else {
                let item_weight_pair;
                if(prop.Type === 'Weapon')
                    item_weight_pair = ItemWeightPair.from(RUNSTORE['BPMWeaponWeightPair'])
                else 
                    item_weight_pair = ItemWeightPair.from(RUNSTORE['BPMAbilityWeightPair'])

                item_weight_pair.Item = prop.Value;
                item_weight_pair.Weight = weight;
                item_pool.Property.Properties.push(item_weight_pair);
            }
        });
        this.addProperty(item_pool);
    }
    genSeeds(seed) {
        Prng.init(seed);
        for(let i = 0; i <= 9; i++) {
            let gen = deep_copy_template(RUNSTORE.FloorGenerationSeeds);
            let mod = deep_copy_template(RUNSTORE.FloorModifierFloats);
            let play = deep_copy_template(RUNSTORE.FloorPlaySeeds);
            gen.Property = [i, Prng.int16()];
            mod.Property = [i, Prng.range(0, 100)];
            play.Property = [i, Prng.int32()];
            this.addProperty(gen);
            this.addProperty(mod);
            this.addProperty(play);
        }
    }
    assignFloor(floor, name) {
        let room = deep_copy_template(RUNSTORE[name]);
        room.Property = [floor, 1];
        this.addProperty(room);
    }
    genRooms([room, weight]) {
        switch(room) {
            case "LibraryBeforeArmoury":
                for(let i = 0; i < 4; i++) {
                    if(Prng.chance(weight)) {
                        this.assignFloor(2*i, room);
                        this.assignFloor(2*i+1, room);
                    }
                }
                break;
            case "MinibossChoice":
                for(let i = 0; i < 4; i++) {
                    Prng.choose([2*i, 2*i+1], 1)
                        .forEach(f => this.assignFloor(f, room));
                }
                break;
            case "BankRoomChosen":
            case "ChallengeRoomChosen":
            case "HeroRoomChosen":
                Prng.choose([FLOOR.ASG_I, FLOOR.SVAR_II])
                    .forEach(f => Prng.chance(weight) ? this.assignFloor(f, room) : f);
                break;
            case "BlackMarketRoomChosen":
                Prng.choose([FLOOR.ASG_I, FLOOR.SVAR_II], Prng.chance(weight))
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "PortalRoomChosen":
                Prng.choose([FLOOR.ASG_I, FLOOR.HELL_I], Prng.chance(weight))
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "StairsRoomChosen":
                Prng.choose([FLOOR.ASG_I, FLOOR.ASG_I], Prng.chance(weight))
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "ChoiceRoomChosen":
                if(this.Properties[0].has("StairsRoomChosen\0")){
                    Prng.choose([FLOOR.ASG_I, FLOOR.ASG_I], Prng.chance(weight))
                        .forEach(f => this.assignFloor(f, room));
                }
                else 
                    this.assignFloor(Prng.choose([FLOOR.ASG_I, FLOOR.SVAR_II], 1), room);
                break;
            case "GamblingRoomChosen":
            case "RerollRoomChosen":
                Prng.choose([FLOOR.ASG_I, FLOOR.HELL_I], 2)
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "PrestigeRoomChosen":
                Prng.choose([FLOOR.VAN_I, FLOOR.VAN_II], Prng.chance(weight))
                    .forEach(f => this.assignFloor(f, room));
                break;
        }
    }
    setFloorIndex(floor) {
        let index = deep_copy_template(RUNSTORE.FloorIndex);
        if(floor==="Crypts") {
            index.Property = [0, 1];
            let crypts = deep_copy_template(RUNSTORE.CRYPTSVISIT);
            this.addProperty(index);
            this.addProperty(crypts);
        }
        else {
            index.Property = [0, parseInt(floor)];
            this.addProperty(index);
        }
    }
    static generate(seed, diff, opts) {
        let ret = new RunPropertyStore();
        REQUIREMENTS.POOLS
            .forEach(pool => ret.genItemPool(seed, pool, opts.ENHANCE));
        ret.Difficulty = diff;
        ret.genSeeds(seed);
        Prng.init(seed);
        REQUIREMENTS.ROOMS.forEach(room => ret.genRooms(room));
        ret.setFloorIndex(opts.FLOORINDEX);
        return ret;
    }
}
