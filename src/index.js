import { json } from './utils.js';

const LIB_PATH = './data/lib';
const TEMP_PATH = './data/templates'

export const CHARSTORE = await json(`${LIB_PATH}/charstore.json`);
export const ITEMNAME = await json(`${LIB_PATH}/items-names.json`);
export const RUNSTORE = await json(`${LIB_PATH}/runstore.json`);
export const ITEMS = await json(`${LIB_PATH}/items.json`);
export const ITEMPOOL = await json(`${LIB_PATH}/itempools.json`);
export const SAVESLOT = await json(`${LIB_PATH}/saveslot.json`);
export const REQUIREMENTS = await json(`${LIB_PATH}/requirements.json`);
export const T_RUNSTORE = await json(`${TEMP_PATH}/runstore.json`);
export const T_CHARSTORE = await json(`${TEMP_PATH}/characters.json`);
export const T_GVAS_HEADER = await json(`${TEMP_PATH}/ContinueStateV2_header.json`);

export * from './utils.js';
export * from './CharacterPropertyStore.js';
export * from './RunPropertyStore.js';
export * from './PropertyStore.js';
export * from './ContinueStateV2.js';
export * from './ItemWeightPair.js';