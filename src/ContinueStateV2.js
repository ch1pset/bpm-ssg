import { 
    Gvas, 
    GvasHeader
} from 'uesavetool';

import { 
    SAVESLOT,
    Prng,
    T_GVAS_HEADER,
    PropertyStore,
    REQUIREMENTS,
    createProperty,
    BPMCharacter,
    BPMRun,
    CHARSTORE,
    RUNSTORE
} from './index.js';

export class ContinueStateV2 extends Gvas {
    constructor() {
        super();
        this.Header = GvasHeader.from(T_GVAS_HEADER);
        this.Properties = new PropertyStore();
        this.Properties.concat([
            createProperty(SAVESLOT.SaveSlotName),
            createProperty(CHARSTORE.CharacterPropertyStore),
            createProperty(RUNSTORE.RunPropertyStore)
        ]);
    }
    get Slot() {
        return this.Properties.valueOf('SaveSlotName\0');
    }
    set Slot(name) {
        return this.Properties.set('SaveSlotName\0', name);
    }
    /**
     * @type {BPMCharacter}
     */
    get Character() {
        return this.Properties
            .get('CharacterPropertyStore\0').Properties[0];
    }
    set Character(bpmchar) {
        this.Properties
            .get('CharacterPropertyStore\0').Properties[0] = bpmchar;
    }
    /**
     * @type {BPMRun}
     */
    get Run() {
        return this.Properties
            .get('RunPropertyStore\0').Properties[0];
    }
    set Run(bpmrun) {
        this.Properties
            .get('RunPropertyStore\0').Properties[0] = bpmrun;
    }
    static generate({seed, char, diff, opts}) {
        let save = new ContinueStateV2();
        Prng.init(seed);
        save.Slot = SAVESLOT.ContinueStateV2;
        save.Character = BPMCharacter.generate(seed, char, opts);
        save.Run = BPMRun.generate(seed, diff, opts);

        REQUIREMENTS.POOLS.forEach(([name, type]) => {
                if(type === 'Weapon')
                    save.Run[name].delItem(save.Character.StoredWeapon)
            });
        Prng.destroy();
        return save;
    }
}