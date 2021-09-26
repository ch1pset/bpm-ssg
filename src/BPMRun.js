import {
    RUNSTORE,
    REQUIREMENTS,
    ItemPool,
    PropertyStore,
    createProperty,
    Generate,
    Prng,
    BPMRoom
} from './index.js';

export class BPMRun extends PropertyStore {
    constructor() {
        super();
        this.Name = "BPMRunPropertyStore\u0000";
        this.concat([
            createProperty(RUNSTORE.BPMDifficulty),
            createProperty(RUNSTORE.FloorIndex),
            createProperty(RUNSTORE.SpecialChapterVisit),
            createProperty(RUNSTORE.ShopItemPool),
            createProperty(RUNSTORE.TreasureItemPool),
            createProperty(RUNSTORE.BossItemPool),
            createProperty(RUNSTORE.WeaponPool),
            createProperty(RUNSTORE.WeaponCheapPool),
            createProperty(RUNSTORE.WeaponAffordablePool),
            createProperty(RUNSTORE.WeaponExpensivePool),
            createProperty(RUNSTORE.LibrarySecondaryPool),
            createProperty(RUNSTORE.LibraryUltimatePool),
            createProperty(RUNSTORE.ChoiceRoomItemsPoolHead),
            createProperty(RUNSTORE.ChoiceRoomItemsPoolFoot),
            createProperty(RUNSTORE.ChoiceRoomItemsPoolShield),
            createProperty(RUNSTORE.ChoiceRoomItemsPoolArm),
            createProperty(RUNSTORE.DevilStatuePool),
            createProperty(RUNSTORE.AngelStatuePool),
            createProperty(RUNSTORE.CursedChestPool),
            createProperty(RUNSTORE.FutureProofingAPool),
            createProperty(RUNSTORE.FutureProofingBPool)
        ]);
    }
    get Difficulty() {
        return this.valueOf('BPMDifficulty\0');
    }
    set Difficulty(diff) {
        this.set('BPMDifficulty\0', RUNSTORE.DIFFICULTY[diff.toUpperCase()]);
    }
    get SpecialChapterVisit() {
        return this.valueOf('SpecialChapterVisit\0');
    }
    set SpecialChapterVisit(visited) {
        this.set('SpecialChapterVisit\0', visited);
    }
    get FloorIndex() {
        return this.valueOf('FloorIndex\0')[1];
    }
    set FloorIndex(floor) {
        if(floor==="Crypts") {
            this.set('FloorIndex\0', [0, 1]);
            this.SpecialChapterVisit = RUNSTORE.SPECIALCHAPTER.CRYPTS;
        }
        else this.set('FloorIndex\0', [0, parseInt(floor)]);
    }
    get ShopItemPool() {
        return this.valueOf('ShopItemPool\0')
    }
    get TreasureItemPool() {
        return this.valueOf('TreasureItemPool\0')
    }
    get BossItemPool() {
        return this.valueOf('BossItemPool\0')
    }
    get WeaponPool() {
        return this.valueOf('WeaponPool\0')
    }
    get WeaponCheapPool() {
        return this.valueOf('WeaponCheapPool\0')
    }
    get WeaponAffordablePool() {
        return this.valueOf('WeaponAffordablePool\0')
    }
    get WeaponExpensivePool() {
        return this.valueOf('WeaponExpensivePool\0')
    }
    get LibrarySecondaryPool() {
        return this.valueOf('LibrarySecondaryPool\0')
    }
    get LibraryUltimatePool() {
        return this.valueOf('LibraryUltimatePool\0')
    }
    get ChoiceRoomItemsPoolHead() {
        return this.valueOf('ChoiceRoomItemsPoolHead\0')
    }
    get ChoiceRoomItemsPoolFoot() {
        return this.valueOf('ChoiceRoomItemsPoolFoot\0')
    }
    get ChoiceRoomItemsPoolShield() {
        return this.valueOf('ChoiceRoomItemsPoolShield\0')
    }
    get ChoiceRoomItemsPoolArm() {
        return this.valueOf('ChoiceRoomItemsPoolArm\0')
    }
    get DevilStatuePool() {
        return this.valueOf('DevilStatuePool\0')
    }
    get AngelStatuePool() {
        return this.valueOf('AngelStatuePool\0')
    }
    get CursedChestPool() {
        return this.valueOf('CursedChestPool\0')
    }
    get FutureProofingAPool() {
        return this.valueOf('FutureProofingAPool\0')
    }
    get FutureProofingBPool() {
        return this.valueOf('FutureProofingBPool\0')
    }
    set ShopItemPool(value) {
        return this.set('ShopItemPool\0', value);
    }
    set TreasureItemPool(value) {
        return this.set('TreasureItemPool\0', value);
    }
    set BossItemPool(value) {
        return this.set('BossItemPool\0', value);
    }
    set WeaponPool(value) {
        return this.set('WeaponPool\0', value);
    }
    set WeaponCheapPool(value) {
        return this.set('WeaponCheapPool\0', value);
    }
    set WeaponAffordablePool(value) {
        return this.set('WeaponAffordablePool\0', value);
    }
    set WeaponExpensivePool(value) {
        return this.set('WeaponExpensivePool\0', value);
    }
    set LibrarySecondaryPool(value) {
        return this.set('LibrarySecondaryPool\0', value);
    }
    set LibraryUltimatePool(value) {
        return this.set('LibraryUltimatePool\0', value);
    }
    set ChoiceRoomItemsPoolHead(value) {
        return this.set('ChoiceRoomItemsPoolHead\0', value);
    }
    set ChoiceRoomItemsPoolFoot(value) {
        return this.set('ChoiceRoomItemsPoolFoot\0', value);
    }
    set ChoiceRoomItemsPoolShield(value) {
        return this.set('ChoiceRoomItemsPoolShield\0', value);
    }
    set ChoiceRoomItemsPoolArm(value) {
        return this.set('ChoiceRoomItemsPoolArm\0', value);
    }
    set DevilStatuePool(value) {
        return this.set('DevilStatuePool\0', value);
    }
    set AngelStatuePool(value) {
        return this.set('AngelStatuePool\0', value);
    }
    set CursedChestPool(value) {
        return this.set('CursedChestPool\0', value);
    }
    set FutureProofingAPool(value) {
        return this.set('FutureProofingAPool\0', value);
    }
    set FutureProofingBPool(value) {
        return this.set('FutureProofingBPool\0', value);
    }
    static generate(seed, diff, opts) {
        let run = new BPMRun();
        run.Difficulty = diff;
        run.FloorIndex = opts.FLOORINDEX;

        Prng.init(opts.NULLSEED ? 0 : seed);
        REQUIREMENTS.POOLS
            .forEach(([name, type]) => run[name] = ItemPool.generate([name, type], opts.ENHANCE));

        if(!opts.NULLSEED) {
            Prng.init(seed);
            REQUIREMENTS.SEEDS
                .flatMap(fseed => Generate.floorseeds(fseed))
                .forEach(fseed => run.add(fseed))
        }

        Prng.init(opts.NULLSEED ? 0 : seed);
        REQUIREMENTS.ROOMS
            .flatMap(room => Generate.rooms(room))
            .forEach(room => run.add(room));

        if(opts.STAIRS && !run.has('StairsRoomChosen\0'))
            run.add(BPMRoom.create(0, 'StairsRoomChosen'));

        if(opts.CHOICE && !run.has('ChoiceRoomChosen\0') && !run.has('StairsRoomChosen\0'))
            run.add(BPMRoom.create(2, 'ChoiceRoomChosen'));

        if(opts.PRESTIGE && !run.has('PrestigeRoomChosen\0'))
            run.add(BPMRoom.create(2, 'PrestigeRoomChosen'));

        if(opts.BLACKMARKET && !run.has('BlackMarketRoomChosen\0'))
            run.add(BPMRoom.create(0, 'BlackMarketRoomChosen\0'));

        if(opts.PORTAL && !run.has('PortalRoomChosen\0'))
            run.add(BPMRoom.create(0, 'PortalRoomChosen\0'));

        if((run.has('StairsRoomChosen\0')) && run.has('ChoiceRoomChosen\0')) {
            run.set('ChoiceRoomChosen\0', [0, 1]);
        }

        return run;
    }
}