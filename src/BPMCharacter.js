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
            createProperty(CHARSTORE.StoredUltimateAbilityCharges),
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
            createProperty(CHARSTORE.StoredEquipmentAbilities),
            createProperty(CHARSTORE.bStoredCanPickupWeapons),
            createProperty(CHARSTORE.bStoredHasHealth),
            createProperty(CHARSTORE.bStoredSmallCharacter),
            createProperty(CHARSTORE.bStoredAlwaysGeneratesBanks),
            createProperty(CHARSTORE.bStoredGoldIsHealth),
            createProperty(CHARSTORE.bStoredRandomLoadout),
            createProperty(CHARSTORE.bStoredCompleteAllRoomsRequired),
            createProperty(CHARSTORE.bStoredGeneratesShops),
            createProperty(CHARSTORE.bStoredGeneratesTreasureRooms),
            createProperty(CHARSTORE.bStoredGeneratesArmouryRooms),
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
    get StoredUltimateAbilityCharges() {
        return this.valueOf('StoredUltimateAbilityCharges\0')[1];
    }
    set StoredUltimateAbilityCharges(value) {
        this.set('StoredUltimateAbilityCharges\0', [0, value])
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
        return this.valueOf('StoredPlayerStatMovementSpeed\0')[1];
    }
    set StoredPlayerStatMovementSpeed(value) {
        this.set('StoredPlayerStatMovementSpeed\0', [0, value]);
    }
    get StoredPlayerStatWeaponDamage() {
        return this.valueOf('StoredPlayerStatWeaponDamage\0')[1];
    }
    set StoredPlayerStatWeaponDamage(value) {
        this.set('StoredPlayerStatWeaponDamage\0', [0, value]);
    }
    get StoredPlayerStatWeaponCritical() {
        return this.valueOf('StoredPlayerStatWeaponCritical\0')[1];
    }
    set StoredPlayerStatWeaponCritical(value) {
        this.set('StoredPlayerStatWeaponCritical\0', [0, value]);
    }
    get StoredPlayerStatRange() {
        return this.valueOf('StoredPlayerStatRange\0')[1];
    }
    set StoredPlayerStatRange(value) {
        this.set('StoredPlayerStatRange\0', [0, value]);
    }
    get StoredPlayerStatLuck() {
        return this.valueOf('StoredPlayerStatLuck\0')[1];
    }
    set StoredPlayerStatLuck(value) {
        this.set('StoredPlayerStatLuck\0', [0, value]);
    }
    get StoredPlayerStatAbilityPower() {
        return this.valueOf('StoredPlayerStatAbilityPower\0')[1];
    }
    set StoredPlayerStatAbilityPower(value) {
        this.set('StoredPlayerStatAbilityPower\0', [0, value]);
    }
    get StoredPlayerStatExtraAmmo() {
        return this.valueOf('StoredPlayerStatExtraAmmo\0')[1];
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
    get bStoredCanPickupWeapons() {
        return this.valueOf('bStoredCanPickupWeapons\0');
    }
    set bStoredCanPickupWeapons(value) {
        this.set('bStoredCanPickupWeapons\0', value);
    }
    get bStoredHasHealth() {
        return this.valueOf('bStoredHasHealth\0');
    }
    set bStoredHasHealth(value) {
        this.set('bStoredHasHealth\0', value);
    }
    get bStoredSmallCharacter() {
        return this.valueOf('bStoredSmallCharacter\0');
    }
    set bStoredSmallCharacter(value) {
        this.set('bStoredSmallCharacter\0', value);
    }
    get bStoredAlwaysGeneratesBanks() {
        return this.valueOf('bStoredAlwaysGeneratesBanks\0');
    }
    set bStoredAlwaysGeneratesBanks(value) {
        this.set('bStoredAlwaysGeneratesBanks\0', value);
    }
    get bStoredGoldIsHealth() {
        return this.valueOf('bStoredGoldIsHealth\0');
    }
    set bStoredGoldIsHealth(value) {
        this.set('bStoredGoldIsHealth\0', value);
    }
    get bStoredRandomLoadout() {
        return this.valueOf('bStoredRandomLoadout\0');
    }
    set bStoredRandomLoadout(value) {
        this.set('bStoredRandomLoadout\0', value);
    }
    get bStoredCompleteAllRoomsRequired() {
        return this.valueOf('bStoredCompleteAllRoomsRequired\0');
    }
    set bStoredCompleteAllRoomsRequired(value) {
        this.set('bStoredCompleteAllRoomsRequired\0', value);
    }
    get bStoredGeneratesShops() {
        return this.valueOf('bStoredGeneratesShops\0');
    }
    set bStoredGeneratesShops(value) {
        this.set('bStoredGeneratesShops\0', value);
    }
    get bStoredGeneratesTreasureRooms() {
        return this.valueOf('bStoredGeneratesTreasureRooms\0');
    }
    set bStoredGeneratesTreasureRooms(value) {
        this.set('bStoredGeneratesTreasureRooms\0', value);
    }
    get bStoredGeneratesArmouryRooms() {
        return this.valueOf('bStoredGeneratesArmouryRooms\0');
    }
    set bStoredGeneratesArmouryRooms(value) {
        this.set('bStoredGeneratesArmouryRooms\0', value);
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
                .forEach(item => char[item.Name] = item.Value)

            if(char.StoredHealth === 0 && char.StoredShield === 0)
                char.StoredHealth = 25;

            Prng.select(REQUIREMENTS.ABILITIES)
                .map(ability => Loadout.generate(ability))
                .forEach(ability => char[ability.Name] = ability.Value)
            
            Prng.select(REQUIREMENTS.STOREDITEMS, 1)
                .map(item => Loadout.generate(item))
                .forEach(item => char[item.Name] = item.Value)
        }

        const set = (value, cb) => {
            if(value !== "" && value !== undefined && value !== null)
                cb(value);
        }

        set(opts.HEALTH,            (v) => char.StoredHealth = v);
        set(opts.SHIELD,            (v) => char.StoredShield = v);
        set(opts.COINS,             (v) => char.StoredCoins = v);
        set(opts.KEYS,              (v) => char.StoredKeys = v);
        set(opts.AMMO,              (v) => char.StoredPlayerStatExtraAmmo = v);
        set(opts.WEAPON,
            (v) => char.StoredWeapon = ITEMS[v].Value);
        set(opts.AUXILARY,
            (v) => char.StoredMobilityAbility = ITEMS[v].Value);
        set(opts.SECONDARY,
            (v) => char.StoredSecondaryAbility = ITEMS[v].Value);
        set(opts.ULTIMATE,
            (v) => char.StoredUltimateAbility = ITEMS[v].Value);
        set(opts.ULTCHARGE,
            (v) => char.StoredUltimateAbilityCharges = v ? 1 : 0);
        set(opts.HEAD,
            (v) => char.StoredHeadItemAbility = ITEMS[v].Value);
        set(opts.ARM,
            (v) => char.StoredArmsItemAbility = ITEMS[v].Value);
        set(opts.CHEST,
            (v) => char.StoredChestItemAbility = ITEMS[v].Value);
        set(opts.LEG,
            (v) => char.StoredLegsItemAbility = ITEMS[v].Value);
        set(opts.CURSES,
            (v) => char.StoredEquipmentAbilities = v.map(curse => ITEMS[curse].Value));
        set(opts.STATS.ABILITY,     (v) => char.StoredPlayerStatAbilityPower = v);
        set(opts.STATS.PRECISION,   (v) => char.StoredPlayerStatWeaponCritical = v);
        set(opts.STATS.DAMAGE,      (v) => char.StoredPlayerStatWeaponDamage = v);
        set(opts.STATS.LUCK,        (v) => char.StoredPlayerStatLuck = v);
        set(opts.STATS.RANGE,       (v) => char.StoredPlayerStatRange = v);
        set(opts.STATS.SPEED,       (v) => char.StoredPlayerStatMovementSpeed = v);
        
        set(opts.TRAITS.NOWEAPONS,  (v) => char.bStoredCanPickupWeapons = v);
        set(opts.TRAITS.NOHEALTH,   (v) => char.bStoredHasHealth = v);
        set(opts.TRAITS.SMALL,      (v) => char.bStoredSmallCharacter = v);
        set(opts.TRAITS.BANKS,      (v) => char.bStoredAlwaysGeneratesBanks = v);
        set(opts.TRAITS.GOLDHEALTH, (v) => char.bStoredGoldIsHealth = v);
        set(opts.TRAITS.CLEARALL,   (v) => char.bStoredCompleteAllRoomsRequired = v);
        set(opts.TRAITS.NOSHOPS,    (v) => char.bStoredGeneratesShops = v);
        set(opts.TRAITS.NOTREASURE, (v) => char.bStoredGeneratesTreasureRooms = v);
        set(opts.TRAITS.NOARMORY,   (v) => char.bStoredGeneratesArmouryRooms = v);

        return char;
    }
}