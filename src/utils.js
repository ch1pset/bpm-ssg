import { PropertyFactory } from "uesavetool";

export function range([min, max], cb) { //inclusive
    let numbers = []
    for(let i = min; i <= max; i++) {
        numbers.push(cb ? cb(i) : i);
    }
    return numbers;
}
/**
 * Alias for `PropertyFactory.create()`
 */
export const createProperty = (template) => PropertyFactory.create(template);