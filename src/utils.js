export function deep_copy_template(template) {
    return JSON.parse(JSON.stringify(template));
}

export function range([min, max], cb) { //inclusive
    let numbers = []
    for(let i = min; i <= max; i++) {
        numbers.push(cb ? cb(i) : i);
    }
    return numbers;
}