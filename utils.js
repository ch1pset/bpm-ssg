import * as fs from 'fs'

export function json(path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

export function store(path, obj) {
    fs.writeFileSync(path, JSON.stringify(obj, null, 2));
}
