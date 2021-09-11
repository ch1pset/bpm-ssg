import { 
    Gvas, 
    GvasHeader, 
    PropertyFactory 
} from 'uesavetool';

import { 
    SAVESLOT,
    prng,
    T_GVAS_HEADER,
    RunPropertyStore, 
    CharacterPropertyStore 
} from './index.js';

export class ContinueStateV2 extends Gvas {
    constructor() {
        super();
        this.Header = GvasHeader.from(T_GVAS_HEADER);
    }
    setHeader(template) {
        this.Header = GvasHeader.from(template);
    }
    addProperty(prop) {
        this.Properties
            .Properties.push(prop);
    }
    static seededGen(seed, char, diff) {
        let save = new ContinueStateV2();
        prng.init(seed);
        save.addProperty(PropertyFactory.create(SAVESLOT.ContinueStateV2));
        save.addProperty(CharacterPropertyStore.generate(char));
        save.addProperty(RunPropertyStore.generate(diff));
        return save;
    }
}