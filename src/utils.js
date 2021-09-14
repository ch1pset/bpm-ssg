export function deep_copy_template(template) {
    return JSON.parse(JSON.stringify(template));
}