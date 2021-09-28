import {
    REQUIREMENTS,
    T_CHARSTORE,
    PropertyStore,
    createProperty,
    Prng,
    Inventory,
    Loadout,
    CHARSTORE,
    ITEMS
} from './index.js';
import { StoredEquipmentAbilities, StoredEquipmentAbilitiesCharges } from './StoredEquipmentAbilities.js';

export class BPMCharacter extends PropertyStore {
    constructor() {
        super();
        this.Name = "BPMCharacterPropertyStore\u0000";
        this.concat([
            createProperty(CHARSTORE.StoredCharacterArchetype),
            createProperty(CHARSTORE.StoredCharacterMesh),
            createProperty(CHARSTORE.StoredWeapon),
            createProperty(CHARSTORE.StoredMobilityAbility),
            createProperty(CHARSTORE.StoredSecondaryAbility),
            createProperty(CHARSTORE.StoredUltimateAbility),
            createProperty(CHARSTORE.StoredArmsItemAbility),
            createProperty(CHARSTORE.StoredChestItemAbility),
            createProperty(CHARSTORE.StoredHeadItemAbility),
            createProperty(CHARSTORE.StoredLegsItemAbility),
            createProperty(CHARSTORE.StoredHealthContainer),
            createProperty(CHARSTORE.StoredHealth),
            createProperty(CHARSTORE.StoredShield),
            createProperty(CHARSTORE.StoredCoins),
            createProperty(CHARSTORE.StoredKeys),
            createProperty(CHARSTORE.StoredPlayerStatMovementSpeed),
            createProperty(CHARSTORE.StoredPlayerStatWeaponDamage),
            createProperty(CHARSTORE.StoredPlayerStatWeaponCritical),
            createProperty(CHARSTORE.StoredPlayerStatRange),
            createProperty(CHARSTORE.StoredPlayerStatLuck),
            createProperty(CHARSTORE.StoredPlayerStatAbilityPower),
            createProperty(CHARSTORE.StoredPlayerStatExtraAmmo),
            createProperty(CHARSTORE.StoredEquipmentAbilities)
        ]);
        this.StoredEquipmentAbilities = [];
    }
    /**
     * @type {StoredEquipmentAbilities}
     */
    get StoredEquipmentAbilities() {
        return this.valueOf('StoredEquipmentAbilities\0');
    }
    set StoredEquipmentAbilities(values) {
        this.set('StoredEquipmentAbilities\0', StoredEquipmentAbilities.create(values));
    }
    get StoredEquipmentAbilitiesCharges() {
        return this.valueOf('StoredEquipmentAbilitiesCharges\0');
    }
    set StoredEquipmentAbilitiesCharges(values) {
        this.set('StoredEquipmentAbilitiesCharges\0', StoredEquipmentAbilitiesCharges.create(values));
    }
    get StoredCharacterArchetype() {
        return this.valueOf('StoredCharacterArchetype\0');
    }
    set StoredCharacterArchetype(value) {
        this.set('StoredCharacterArchetype\0', value)
    }
    get StoredCharacterMesh() {
        return this.valueOf('StoredCharacterMesh\0');
    }
    set StoredCharacterMesh(value) {
        this.set('StoredCharacterMesh\0', value)
    }
    get StoredPlayerStatMovementSpeed() {
        return this.valueOf('StoredPlayerStatMovementSpeed\0');
    }
    set StoredPlayerStatMovementSpeed(value) {
        this.set('StoredPlayerStatMovementSpeed\0', [0, value]);
    }
    get StoredPlayerStatWeaponDamage() {
        return this.valueOf('StoredPlayerStatWeaponDamage\0');
    }
    set StoredPlayerStatWeaponDamage(value) {
        this.set('StoredPlayerStatWeaponDamage\0', [0, value]);
    }
    get StoredPlayerStatWeaponCritical() {
        return this.valueOf('StoredPlayerStatWeaponCritical\0');
    }
    set StoredPlayerStatWeaponCritical(value) {
        this.set('StoredPlayerStatWeaponCritical\0', [0, value]);
    }
    get StoredPlayerStatRange() {
        return this.valueOf('StoredPlayerStatRange\0');
    }
    set StoredPlayerStatRange(value) {
        this.set('StoredPlayerStatRange\0', [0, value]);
    }
    get StoredPlayerStatLuck() {
        return this.valueOf('StoredPlayerStatLuck\0');
    }
    set StoredPlayerStatLuck(value) {
        this.set('StoredPlayerStatLuck\0', [0, value]);
    }
    get StoredPlayerStatAbilityPower() {
        return this.valueOf('StoredPlayerStatAbilityPower\0');
    }
    set StoredPlayerStatAbilityPower(value) {
        this.set('StoredPlayerStatAbilityPower\0', [0, value]);
    }
    get StoredPlayerStatExtraAmmo() {
        return this.valueOf('StoredPlayerStatExtraAmmo\0');
    }
    set StoredPlayerStatExtraAmmo(value) {
        this.set('StoredPlayerStatExtraAmmo\0', [0, value]);
    }
    /**
     * @type {string}
     */
    get StoredWeapon() {
        return this.valueOf('StoredWeapon\0');
    }
    set StoredWeapon(value) {
        this.set('StoredWeapon\0', value);
    }
    /**
     * @type {Number}
     */
    get StoredHealth() {
        return this.valueOf('StoredHealth\0')[1];
    }
    set StoredHealth(health) {
        this.set('StoredHealth\0', [0, health]);
        this.StoredHealthContainer = health;
    }
    /**
     * @type {Number}
     */
    get StoredHealthContainer() {
        return this.valueOf('StoredHealthContainer\0')[1];
    }
    set StoredHealthContainer(amount) {
        this.set('StoredHealthContainer\0', [0, amount]);
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
    /**
     * @type {Number}
     */
    get StoredCoins() {
        return this.valueOf('StoredCoins\0')[1];
    }
    set StoredCoins(value) {
        this.set('StoredCoins\0', [0, value]);
    }
    /**
     * @type {Number}
     */
    get StoredKeys() {
        return this.valueOf('StoredKeys\0')[1];
    }
    set StoredKeys(value) {
        this.set('StoredKeys\0', [0, value]);
    }
    /**
     * @type {string}
     */
    get StoredMobilityAbility() {
        return this.valueOf('StoredMobilityAbility\0');
    }
    set StoredMobilityAbility(value) {
        this.set('StoredMobilityAbility\0', value);
    }
    /**
     * @type {string}
     */
    get StoredSecondaryAbility() {
        return this.valueOf('StoredSecondaryAbility\0');
    }
    set StoredSecondaryAbility(value) {
        this.set('StoredSecondaryAbility\0', value);
    }
    /**
     * @type {string}
     */
    get StoredUltimateAbility() {
        return this.valueOf('StoredUltimateAbility\0');
    }
    set StoredUltimateAbility(value) {
        this.set('StoredUltimateAbility\0', value);
    }
    /**
     * @type {string}
     */
    get StoredHeadItemAbility() {
        return this.valueOf('StoredHeadItemAbility\0');
    }
    set StoredHeadItemAbility(value) {
        this.set('StoredHeadItemAbility\0', value);
    }
    /**
     * @type {string}
     */
    get StoredChestItemAbility() {
        return this.valueOf('StoredChestItemAbility\0');
    }
    set StoredChestItemAbility(value) {
        this.set('StoredChestItemAbility\0', value);
    }
    /**
     * @type {string}
     */
    get StoredArmsItemAbility() {
        return this.valueOf('StoredArmsItemAbility\0');
    }
    set StoredArmsItemAbility(value) {
        this.set('StoredArmsItemAbility\0', value);
    }
    /**
     * @type {string}
     */
    get StoredLegsItemAbility() {
        return this.valueOf('StoredLegsItemAbility\0');
    }
    set StoredLegsItemAbility(value) {
        this.set('StoredLegsItemAbility\0', value);
    }
    static create(name) {
        let char = new BPMCharacter();
        T_CHARSTORE[name.toLowerCase()]
            .forEach(prop => char.has(prop.Name) 
                ? char.set(prop.Name, prop.Property)
                : char.add(createProperty(prop)));
        return char;
    }
    static generate(seed, name, opts) {
        let char = BPMCharacter.create(name);
        if(name.toLowerCase() === 'run') {
            Prng.init(opts.NULLSEED ? 0 : seed);

            REQUIREMENTS.RANDCHAR
                .map(item => Inventory.generate(item))
                .forEach(p => char.add(p));

            if(char.StoredHealth === 0 && char.StoredShield === 0)
                char.StoredHealth = 25;

            Prng.select(REQUIREMENTS.ABILITIES)
                .map(ability => Loadout.generate(ability))
                .forEach(ability => char.add(ability));
            
            Prng.select(REQUIREMENTS.STOREDITEMS, 1)
                .map(item => Loadout.generate(item))
                .forEach(item => char.add(item));
        }

        const set = (value, cb) => {
            if(value !== "" && value !== undefined && value !== null)
                cb(value);
        }

        set(opts.HEALTH,        (v) => char.StoredHealth = v);
        set(opts.SHIELD,        (v) => char.StoredShield = v);
        set(opts.COINS,         (v) => char.StoredCoins = v);
        set(opts.KEYS,          (v) => char.StoredKeys = v);
        set(opts.WEAPON,        
            (v) => char.StoredWeapon = ITEMS[v].Value);
        set(opts.AUXILARY,
            (v) => char.StoredMobilityAbility = ITEMS[v].Value);
        set(opts.SECONDARY,
            (v) => char.StoredSecondaryAbility = ITEMS[v].Value);
        set(opts.ULTIMATE,
            (v) => char.StoredUltimateAbility = ITEMS[v].Value);
        set(opts.CURSES, 
            (v) => char.StoredEquipmentAbilities = v.map(curse => ITEMS[curse].Value));
        set(opts.STATS.ABILITY,   (v) => char.StoredPlayerStatAbilityPower = v);
        set(opts.STATS.PRECISION, (v) => char.StoredPlayerStatWeaponCritical = v);
        set(opts.STATS.DAMAGE,    (v) => char.StoredPlayerStatWeaponDamage = v);
        set(opts.STATS.LUCK,      (v) => char.StoredPlayerStatLuck = v);
        set(opts.STATS.RANGE,     (v) => char.StoredPlayerStatRange = v);
        set(opts.STATS.SPEED,     (v) => char.StoredPlayerStatMovementSpeed = v);
        set(opts.STATS.AMMO,      (v) => char.StoredPlayerStatExtraAmmo = v);

        return char;
    }
}