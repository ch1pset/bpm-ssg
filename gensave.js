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

function shuffleFisherYates(array) {
    for(let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(prng.quick() * i);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function genItemPool(name) {
    let pool = ITEMPOOL[name];
    let ret = Object.assign({}, RUNSTORE[name]);

    shuffleFisherYates(pool);

    console.log(`${name}: `);
    console.log(pool);

    pool.forEach(item => {
        ret.Property.Properties.push(ITEMS[item]);
    });
    return ret;
}

function genSeeds() {
    let floorSeeds = [];
    for(let i = 0; i <= 9; i++) {
        let gen = {};
        let mod = {};
        let play = {};
        Object.assign(gen, RUNSTORE.FloorGenerationSeeds);
        Object.assign(mod, RUNSTORE.FloorModifierFloats);
        Object.assign(play, RUNSTORE.FloorPlaySeeds);
        gen.Property = [i, (prng.int32() % (2**16))];
        mod.Property = [i, (prng.quick() * 100)];
        play.Property = [i, prng.int32()];
        floorSeeds.push(gen);
        floorSeeds.push(mod);
        floorSeeds.push(play);
    }
    return floorSeeds;
}

function genRooms() {
    let ret = [];
    REQUIREMENTS.ROOMS.forEach(room => {
        let floor, flip;
        switch(room) {
            case "LibraryBeforeArmoury":
                for(let i = 0; i < 7; i++) {
                    flip = Math.abs(prng.int32() % 2);
                    if(flip === 0) {
                        let library = Object.assign({}, RUNSTORE[room]);
                        library.Property = [i, 1];
                        ret.push(library);
                    }
                }
                break;
            case "MinibossChoice":
                for(let i = 0; i < 7; i++) {
                    flip = Math.abs(prng.int32() % 2);
                    if(flip === 0) {
                        let miniboss = Object.assign({}, RUNSTORE[room]);
                        miniboss.Property = [i, 1];
                        ret.push(miniboss);
                    }
                }
                break;
            case "ChoiceRoomChosen":
                floor = Math.abs(prng.int32() % 7);
                let well = Object.assign({}, RUNSTORE[room]);
                well.Property = [floor, 1];
                ret.push(well);
                break;
            case "BankRoomChosen":
                for(let i = 0; i < 7; i++) {
                    flip = Math.abs(prng.int32() % 5);
                    if(flip === 0) {
                        let bank = Object.assign({}, RUNSTORE[room]);
                        bank.Property = [i, 1];
                        ret.push(bank);
                    }
                }
                break;
            case "ChallengeRoomChosen":
                for(let i = 0; i < 7; i++) {
                    flip = Math.abs(prng.int32() % 2);
                    if(flip === 0) {
                        let challenge = Object.assign({}, RUNSTORE[room]);
                        challenge.Property = [i, 1];
                        ret.push(challenge);
                    }
                }
                break;
            case "StairsRoomChosen":
                flip = Math.abs(prng.int32() % 2);
                let stairs = Object.assign({}, RUNSTORE[room]);
                if(flip === 0)
                    ret.push(stairs);
                break;
            case "HeroRoomChosen":
                for(let i = 0; i < 7; i++) {
                    flip = Math.abs(prng.int32() % 5);
                    if(flip === 0) {
                        let hero = Object.assign({}, RUNSTORE[room]);
                        hero.Property = [i, 1];
                        ret.push(hero);
                    }
                }
                break;
            case "GamblingRoomChosen":
                flip = [];
                flip[0] = Math.abs(prng.int32() % 7);
                while((flip[1] = Math.abs(prng.int32() % 7)) === flip[0]) {};
                flip.forEach(f => {
                    let gamble = Object.assign({}, RUNSTORE[room]);
                    gamble.Property = [f, 1];
                    ret.push(gamble);
                })
                break;
            case "RerollRoomChosen":
                flip = [];
                flip[0] = Math.abs(prng.int32() % 7);
                while((flip[1] = Math.abs(prng.int32() % 7)) === flip[0]) {};
                flip.forEach(f => {
                    let reroll = Object.assign({}, RUNSTORE[room]);
                    reroll.Property = [f, 1];
                    ret.push(reroll);
                })
                break;
            case "PrestigeRoomChosen":
                if(Math.abs(prng.int32() % 2) === 0) {
                    floor = Math.abs(prng.int32() % 2) + 2;
                    let prestige = Object.assign({}, RUNSTORE[room]);
                    prestige.Property = [floor, 1];
                }
                break;
            case "BlackMarketRoomChosen":
                if(Math.abs(prng.int32() % 2) === 0) {
                    floor = Math.abs(prng.int32() % 7);
                    let market = Object.assign({}, RUNSTORE[room]);
                    market.Property = [floor, 1];
                }
                break;
            case "PortalRoomChosen":
                if(Math.abs(prng.int32() % 10) === 0) {
                    floor = Math.abs(prng.int32() % 7);
                    let market = Object.assign({}, RUNSTORE[room]);
                    market.Property = [floor, 1];
                }
                break;
        }
    })
    return ret;
}

function getCharTemplate(name) {
    return json(`${TEMP_PATH}/characters/${name}.json`);
}

function getRunTemplate(diff, prng) {
    let ret = {};
    Object.assign(ret, T_RUNSTORE);
    let tuple = ret.Properties[0];

    REQUIREMENTS.POOLS.forEach(pool => {
        tuple.Properties.push(genItemPool(pool, prng))
    });

    tuple.Properties.push(RUNSTORE.DIFFICULTY[diff])

    genSeeds(prng).forEach(prop => {
        tuple.Properties.push(prop);
    })

    genRooms().forEach(prop => {
        tuple.Properties.push(prop);
    })
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