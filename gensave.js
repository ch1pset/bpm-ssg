import * as fs from 'fs';
import { json, store } from './utils.js';
import { Gvas } from 'uesavetool';

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


function genItemPool(name) {
    let pool = ITEMPOOL[name];
    let ret = {}
    Object.assign(ret, RUNSTORE[name]);
    //TODO: Shuffle ITEMPOOL[name]

    pool.forEach(item => {
        ret.Property.Properties.push(ITEMS[item]);
    });
    return ret;
}

function getCharTemplate(name) {
    return json(`${TEMP_PATH}/characters/${name}.json`);
}

function getRunTemplate() {
    let ret = {};
    Object.assign(ret, T_RUNSTORE);
    let tuple = ret.Properties[0];
    console.log(tuple);
    REQUIREMENTS.POOLS.forEach(pool => {
        tuple.Properties.push(genItemPool(pool))
    });
    let diff = process.argv[3];
    tuple.Properties.push(RUNSTORE.DIFFICULTY[diff ? diff.toUpperCase() : 'HRAD'])
    return ret;
}


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
let char = process.argv[2];
save.Properties.push(getCharTemplate(char));
save.Properties.push(getRunTemplate());

const gvas = Gvas.from(T_GVAS);
store('./output.json', gvas);
fs.writeFileSync('./ContinueStateV2.sav', gvas.serialize());