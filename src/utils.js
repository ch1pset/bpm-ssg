import { Property, PropertyFactory } from "uesavetool";
import { ITEMS } from './index.js'

export function range([min, max], cb) { //inclusive
    let numbers = []
    for(let i = min; i <= max; i++) {
        numbers.push(cb ? cb(i) : i);
    }
    return numbers;
}

export function itemsOfType(type) {
    return Object.keys(ITEMS).filter(i => ITEMS[i].Type===type).map(i => ITEMS[i].Value);
}
/**
 * Alias for `PropertyFactory.create()`
 * @type {Property}
 */
export const createProperty = (template) => PropertyFactory.create(template);