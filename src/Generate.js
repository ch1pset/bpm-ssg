import { 
    BPMRoom,
    Prng,
    createProperty,
    range,
    RUNSTORE,
    CHARSTORE,
    ITEMS
} from "./index.js";

const FLOOR = {
    ASG_I:  0, ASG_II: 1,
    VAN_I:  2, VAN_II: 3,
    SVAR_I: 4, SVAR_II:5,
    HELL_I: 6, HELL_II:7,
    UNKOWN:8, MAX:9
}
const items = (type) => ITEMS.filter(([n, i]) => i.Type===type).map(([i, p]) => p.Value);
const setProperty = (prop, value) => {
    prop.Property = value;
    return prop;
}

const Generate = {
    loadout: function([pname, type]) {
        let [item] = Prng.select(items(type), 1)
        return setProperty(createProperty(CHARSTORE[pname]), item)
    },
    inventory: function([pname, amt]) {
        const prop = (name) => {
            switch(name) {
                case "StoredWeapon":
                    let list = items('Weapon');
                    return list[Prng.pick(0, list.length - 1)];
                case "StoredMobilityAbility":
                    return items('Auxilary').slice(0,2)[Prng.pick(0, 1)];
                case "StoredHealth":
                case "StoredShield":
                    return [0, (25 * Prng.pick(0, amt))];
                case "StoredCoins":
                case "StoredKeys":
                    return [0, Prng.pick(0, amt)];
            }
        }
        return setProperty(createProperty(CHARSTORE[pname]), prop(pname))
    },
    floorseeds: function(name) {
        const seed = (n) => {
            switch(n) {
                case "FloorGenerationSeeds":
                    return Prng.int16();
                case "FloorModifierFloats":
                    return Prng.quick() * 100;
                case "FloorPlaySeeds":
                    return Prng.int32();
            }
        }
        return range([0, 9], i => setProperty(createProperty(RUNSTORE[name]), [i, seed(name)]));
    },
    rooms: function([room, rate]) {
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
export {Generate};