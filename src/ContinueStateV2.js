import { 
    Gvas, 
    GvasHeader, 
    PropertyFactory 
} from 'uesavetool';

import { 
    SAVESLOT,
    Prng,
    T_GVAS_HEADER,
    RunPropertyStore, 
    CharacterPropertyStore, 
    REQUIREMENTS
} from './index.js';

export class ContinueStateV2 extends Gvas {
    constructor() {
        super();
        this.Header = GvasHeader.from(T_GVAS_HEADER);
    }
    get Slot() {
        return SAVESLOT.ContinueStateV2;
    }
    addProperty(prop) {
        this.Properties
            .Properties.push(PropertyFactory.create(prop));
    }
    static seededGen({seed, char, diff, opts}) {
        let save = new ContinueStateV2();
        save.addProperty(save.Slot);
        Prng.init(seed);
        let charstore = CharacterPropertyStore.generate(seed, char, opts);
        save.addProperty(charstore);
        let runstore = RunPropertyStore.generate(seed, diff, opts);
        REQUIREMENTS.POOLS.forEach(([name, type]) => {
            if(type === 'Weapon') {
                runstore.getProperty(`${name}\0`).delItemByValue(charstore.StartingWeapon)
            }
        });
        save.addProperty(runstore);
        console.log(save);
        Prng.destroy();
        return save;
    }
}