import { 
    StructProperty,
    PropertyFactory
} from 'uesavetool';

import { 
    RUNSTORE,
    REQUIREMENTS,
    ITEMPOOL,
    ITEMS,
    prng,
    rollDice, 
    chooseFromRange, 
    weightedShuffle,
    PropertyStore 
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
    genItemPool(name) {
        let item_pool = Object.assign({}, RUNSTORE[name]);
        let pool = weightedShuffle(ITEMPOOL[name]);
    
        console.log(`${name}: `);
        console.log(pool);
        
        pool.forEach(([item, weight]) => {
            if(ITEMS[item] === undefined)
                console.log(`Mislabled ${item}`)
            item_pool.Property.Properties.push(ITEMS[item]);
        });
        this.addProperty(item_pool);
    }
    genSeeds() {
        for(let i = 0; i <= 9; i++) {
            let gen = Object.assign({}, RUNSTORE.FloorGenerationSeeds);
            let mod = Object.assign({}, RUNSTORE.FloorModifierFloats);
            let play = Object.assign({}, RUNSTORE.FloorPlaySeeds);
            gen.Property = [i, (prng.int32() % (2**16))];
            mod.Property = [i, (prng.quick() * 100)];
            play.Property = [i, prng.int32()];
            this.addProperty(gen);
            this.addProperty(mod);
            this.addProperty(play);
        }
    }
    assignFloor(floor, name) {
        let room = Object.assign({}, RUNSTORE[name]);
        room.Property = [floor, 1];
        console.log(room);
        this.addProperty(room);
    }
    genRooms(rooms) {
        rooms.forEach(room => {
            switch(room) {
                case "LibraryBeforeArmoury":
                    for(let i = 0; i < 4; i++) {
                        if(rollDice() === 0) {
                            this.assignFloor(2*i, room);
                            this.assignFloor(2*i+1, room);
                        }
                    }
                    break;
                case "MinibossChoice":
                    for(let i = 0; i < 4; i++) {
                        chooseFromRange([2*i, 2*i+1], 1)
                            .forEach(f => this.assignFloor(f, room));
                    }
                    break;
                case "BankRoomChosen":
                case "ChallengeRoomChosen":
                case "HeroRoomChosen":
                    chooseFromRange([0, 5])
                        .forEach(f => this.assignFloor(f, room));
                    break;
                case "BlackMarketRoomChosen":
                case "PortalRoomChosen":
                    chooseFromRange([0, 5], rollDice())
                        .forEach(f => this.assignFloor(f, room));
                    break;
                case "StairsRoomChosen":
                    chooseFromRange([0, 0], rollDice()) //stairs can only be on floor 0
                        .forEach(f => this.assignFloor(f, room));
                    break;
                case "ChoiceRoomChosen":
                    let floors = []
                    if(this.Properties[0].has("StairsRoomChosen\0"))
                        floors = chooseFromRange([0, 1]);
                    else 
                        floors = chooseFromRange([0, 5], 1);
                    floors.forEach(f => this.assignFloor(f, room));
                    break;
                case "GamblingRoomChosen":
                case "RerollRoomChosen":
                    chooseFromRange([0, 6], 2)
                        .forEach(f => this.assignFloor(f, room));
                    break;
                case "PrestigeRoomChosen":
                    chooseFromRange([2, 3], rollDice())
                        .forEach(f => this.assignFloor(f, room));
                    break;
            }
        })
    }
    static generate(diff) {
        let ret = new RunPropertyStore();
        REQUIREMENTS.POOLS
            .forEach(pool => ret.genItemPool(pool));
        ret.Difficulty = diff;
        ret.genSeeds();
        ret.genRooms(REQUIREMENTS.ROOMS);
        return ret;
    }
}
