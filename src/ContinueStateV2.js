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
    static seededGen({s, c, d}) {
        let save = new ContinueStateV2();
        save.addProperty(save.Slot);
        Prng.init(s);
        save.addProperty(CharacterPropertyStore.generate(c));
        Prng.init(s);
        save.addProperty(RunPropertyStore.generate(d));
        Prng.destroy();
        return save;
    }
}