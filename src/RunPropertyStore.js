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
    set Difficulty(diff) {
        this.addProperty(RUNSTORE.DIFFICULTY[diff.toUpperCase()]);
    }
    genItemPool(name, enhance) {
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
    genSeeds() {
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
    genRooms(room) {
        switch(room) {
            case "LibraryBeforeArmoury":
                for(let i = 0; i < 4; i++) {
                    if(Prng.range() === 0) {
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
                Prng.choose([0, 5])
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "BlackMarketRoomChosen":
            case "PortalRoomChosen":
                Prng.choose([0, 5], Prng.range())
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "StairsRoomChosen":
                Prng.choose([0, 0], Prng.range()) //stairs can only be on floor 0
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "ChoiceRoomChosen":
                let floors = []
                if(this.Properties[0].has("StairsRoomChosen\0"))
                    floors = Prng.choose([0, 1]);
                else 
                    floors = Prng.choose([0, 5], 1);
                floors.forEach(f => this.assignFloor(f, room));
                break;
            case "GamblingRoomChosen":
            case "RerollRoomChosen":
                Prng.choose([0, 6], 2)
                    .forEach(f => this.assignFloor(f, room));
                break;
            case "PrestigeRoomChosen":
                Prng.choose([2, 3], Prng.range())
                    .forEach(f => this.assignFloor(f, room));
                break;
        }
    }
    static generate(diff, opts) {
        let ret = new RunPropertyStore();
        REQUIREMENTS.POOLS
            .forEach(pool => ret.genItemPool(pool, opts.ENHANCE));
        ret.Difficulty = diff;
        ret.genSeeds();
        REQUIREMENTS.ROOMS.forEach(r => ret.genRooms(r));
        return ret;
    }
}
