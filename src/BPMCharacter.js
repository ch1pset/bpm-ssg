import {
    REQUIREMENTS,
    T_CHARSTORE,
    PropertyStore,
    createProperty,
    Generate,
    Prng
} from './index.js';

export class BPMCharacter extends PropertyStore {
    constructor() {
        super();
        this.Name = "BPMCharacterPropertyStore\u0000";
    }
    /**
     * @type {string}
     */
    get StoredWeapon() {
        return this.valueOf('StoredWeapon\0');
    }
    /**
     * @type {Number}
     */
    get StoredHealth() {
        return this.valueOf('StoredHealth\0')[1];
    }
    set StoredHealth(health) {
        this.set('StoredHealth\0', [0, health]);
    }
    /**
     * @type {Number}
     */
    get StoredShield() {
        return this.valueOf('StoredShield\0')[1];
    }
    set StoredShield(shield) {
        this.set('StoredShield\0', [0, shield]);
    }
    static create(name) {
        let char = new BPMCharacter();
        T_CHARSTORE[name.toLowerCase()]
            .forEach(prop => char.add(createProperty(prop)));
        return char;
    }
    static generate(seed, name, opts) {
        let char = BPMCharacter.create(name);
        if(name.toLowerCase() === 'run') {
            Prng.init(opts.NULLSEED ? 0 : seed);

            REQUIREMENTS.RANDCHAR
                .map(item => Generate.inventory(item))
                .forEach(p => char.add(p));

            if(char.StoredHealth === 0 && char.StoredShield === 0)
                char.StoredHealth = 25;

            Prng.select(REQUIREMENTS.ABILITIES)
                .map(ability => Generate.loadout(ability))
                .forEach(ability => char.add(ability));
            
            Prng.select(REQUIREMENTS.STOREDITEMS, 1)
                .map(item => Generate.loadout(item))
                .forEach(item => char.add(item));
        }
        return char;
    }
}