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
    CharacterPropertyStore 
} from './index.js';

export class ContinueStateV2 extends Gvas {
    constructor() {
        super();
        this.Header = GvasHeader.from(T_GVAS_HEADER);
    }
    get Slot() {
        return PropertyFactory.create(SAVESLOT.ContinueStateV2);
    }
    addProperty(prop) {
        this.Properties
            .Properties.push(prop);
    }
    static seededGen(seed, char, diff) {
        let save = new ContinueStateV2();
        Prng.init(seed);
        save.addProperty(save.Slot);
        save.addProperty(CharacterPropertyStore.generate(char));
        save.addProperty(RunPropertyStore.generate(diff));
        Prng.destroy();
        return save;
    }
}