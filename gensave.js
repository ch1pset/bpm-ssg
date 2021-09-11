import * as fs from 'fs';
import { json, store } from './utils.js';
import { Gvas } from 'uesavetool';
import { prng_xorshift7 as xorshift } from 'esm-seedrandom';

const LIB_PATH = './data/lib';
const TEMP_PATH = './data/templates'

const CHARSTORE = json(`${LIB_PATH}/charstore.json`);
const RUNSTORE = json(`${LIB_PATH}/runstore.json`);
const ITEMS = json(`${LIB_PATH}/items.json`);
const ITEMNAME = json(`${LIB_PATH}/items-names.json`);
const ITEMPOOL = json(`${LIB_PATH}/itempools.json`);
const SAVESLOT = json(`${LIB_PATH}/saveslot.json`);
const REQUIREMENTS = json(`${LIB_PATH}/requirements.json`);

const T_RUNSTORE = json(`${TEMP_PATH}/runstore.json`);

const seed = process.argv[2];
const prng = xorshift(seed, {state: true});

// Algorithm based on:
// Weighted Random Sampling (2005; Efraimidis, Spirakis)
//
// Credits: https://github.com/denizdogan/weighted-shuffle by denizdogan
function weightedShuffle(array) {
    let ret = Object.assign([], array);
    ret.forEach(item => item[1] = prng.quick() ** (1 / item[1]));
    ret.sort((a, b) => b[1] - a[1]);
    return ret;
}

function genItemPool(name) {
    let ret = Object.assign({}, RUNSTORE[name]);
    let pool = weightedShuffle(ITEMPOOL[name]);

    console.log(`${name}: `);
    console.log(pool);
    
    pool.forEach(([item, weight]) => {
        if(ITEMS[item] === undefined)
            console.log(`Mislabled ${item}`)
        ret.Property.Properties.push(ITEMS[item]);
    });
    return ret;
}

function genSeeds() {
    let floorSeeds = [];
    for(let i = 0; i <= 9; i++) {
        let gen = Object.assign({}, RUNSTORE.FloorGenerationSeeds);
        let mod = Object.assign({}, RUNSTORE.FloorModifierFloats);
        let play = Object.assign({}, RUNSTORE.FloorPlaySeeds);
        gen.Property = [i, (prng.int32() % (2**16))];
        mod.Property = [i, (prng.quick() * 100)];
        play.Property = [i, prng.int32()];
        floorSeeds.push(gen);
        floorSeeds.push(mod);
        floorSeeds.push(play);
    }
    return floorSeeds;
}

function roll(min, max) {
    min = (min !== undefined) ? min : 0;
    max = (max !== undefined) ? max : 1;
    return Math.floor(prng.quick() * (max - min + 1)) + min; //inclusive range
}

function chooseFloors([min, max], num) {
    let floors = [];
    num = (num !== undefined) ? num : roll(min, max);
    for(let i = 0; i < num; i++) {
        let floor;
        while(floors.includes(floor = roll(min, max)));
        floors.push(floor);
    }
    return floors;
}

function assignFloor(floor, room) {
    let ret = Object.assign({}, RUNSTORE[room]);
    ret.Property = [floor, 1];
    console.log(ret);
    return ret;
}

function genRooms() {
    let ret = [];
    REQUIREMENTS.ROOMS.forEach(room => {
        switch(room) {
            case "LibraryBeforeArmoury":
            case "MinibossChoice":
                for(let i = 0; i < 4; i++) {
                    chooseFloors([2*i, 2*i+1], 1)
                        .forEach(f => ret.push(assignFloor(f, room)));
                }
                break;
            case "BankRoomChosen":
            case "ChallengeRoomChosen":
            case "HeroRoomChosen":
                chooseFloors([0, 5])
                    .forEach(f => ret.push(assignFloor(f, room)));
                break;
            case "BlackMarketRoomChosen":
            case "PortalRoomChosen":
                chooseFloors([0, 5], roll())
                    .forEach(f => ret.push(assignFloor(f, room)));
                break;
            case "StairsRoomChosen":
                chooseFloors([0, 0], roll()) //stairs can only be on floor 0
                    .forEach(f => ret.push(assignFloor(f, room)));
                break;
            case "ChoiceRoomChosen":
                let floors = []
                if(ret.findIndex(prop => prop.Name === "StairsRoomChosen\0") !== -1)
                    floors = chooseFloors([0, 1]);
                else 
                    floors = chooseFloors([0, 5], 1);
                floors.forEach(f => ret.push(assignFloor(f, room)));
                break;
            case "GamblingRoomChosen":
            case "RerollRoomChosen":
                chooseFloors([0, 6], 2)
                    .forEach(f => ret.push(assignFloor(f, room)));
                break;
            case "PrestigeRoomChosen":
                chooseFloors([2, 3], roll())
                    .forEach(f => ret.push(assignFloor(f, room)));
                break;
        }
    })
    return ret;
}

function genLoadout(num) {
    let ret = [];
    let items = Object.keys(REQUIREMENTS.LOADOUT);
    chooseFloors([0, items.length - 1], num)
        .forEach(f => {
            let item = items[f];
            let type = REQUIREMENTS.LOADOUT[item]
            let p = Object.assign({}, CHARSTORE[item]);
            let index = roll(0, ITEMNAME[type].length - 1);
            p.Property = ITEMNAME[type][index].Value;
            ret.push(p);
            console.log(p);
        })
    return ret;
}

function genChar() {
    let ret = [];
    REQUIREMENTS.RANDCHAR.forEach(prop => {
        let p = Object.assign({}, CHARSTORE[prop]);
        let index;
        switch(prop) {
            case "StoredWeapon":
                index = roll(0, ITEMNAME.Weapon.length - 1);
                p.Property = ITEMNAME.Weapon[index].Value;
                break;
            case "StoredMobilityAbility":
                index = roll();
                p.Property = ITEMNAME.Auxilary[index].Value;
                break;
            case "StoredHealth":
            case "StoredShield":
                p.Property = [0, (25 * roll(0, 7))];
                break;
            case "StoredCoins":
            case "StoredKeys":
                p.Property = [0, roll(0, 7)];
                break;
        }
        ret.push(p);
        console.log(p);
    });
    genLoadout(2).forEach(prop => ret.push(prop));
    return ret;
}

function getCharTemplate(name) {
    let ret = json(`${TEMP_PATH}/characters/${name}.json`);
    if(name === 'run') {
        let tuple = ret.Properties[0];
        genChar().forEach(prop => {
            tuple.Properties.push(prop);
        });
    }
    return ret;
}

function getRunTemplate(diff) {
    let ret = Object.assign({}, T_RUNSTORE);
    let tuple = ret.Properties[0];

    REQUIREMENTS.POOLS
        .forEach(pool => tuple.Properties.push(genItemPool(pool)));

    tuple.Properties.push(RUNSTORE.DIFFICULTY[diff])

    genSeeds()
        .forEach(prop => tuple.Properties.push(prop))

    genRooms()
        .forEach(prop => tuple.Properties.push(prop))
    return ret;
}



const char = process.argv[3];
const diff = process.argv[4];

const T_GVAS = {
    Header:{},
    Properties: {
        Type:'Tuple',
        Properties: []
    }
}
T_GVAS.Header = json(`${TEMP_PATH}/ContinueStateV2_header.json`);

const save = T_GVAS.Properties;
save.Properties.push(SAVESLOT.ContinueStateV2)
save.Properties.push(getCharTemplate(char.toLowerCase()));
save.Properties.push(getRunTemplate(diff.toUpperCase()));

const gvas = Gvas.from(T_GVAS);
store('./output.json', gvas);
fs.writeFileSync('./ContinueStateV2.sav', gvas.serialize());