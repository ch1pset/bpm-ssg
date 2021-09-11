import {
    StructProperty
} from 'uesavetool';

import { 
    T_CHARSTORE,
    CHARSTORE,
    ITEMS,
    REQUIREMENTS,
    prng,
    PropertyStore
} from './index.js'

export class CharacterPropertyStore extends StructProperty {
    constructor() {
        super();
        this.Name = "CharacterPropertyStore\u0000",
        this.Type = "StructProperty\u0000",
        this.StoredPropertyType = "BPMCharacterPropertyStore\u0000",
        this.Properties = [
            PropertyStore.from({
                "Name": "BPMCharacterPropertyStore\u0000",
                "Type": "Tuple",
                "Properties": []
            })
        ]
    }
    addProperty(prop) {
        this.Properties[0].addProperty(prop);
    }
    selectItem(list, num) {
        prng.choose([0, list.length - 1], num)
            .forEach(i => {
                let selection = ITEMS.filter(([n, item]) => item.Type === list[i][1]);
                let p = Object.assign({}, CHARSTORE[list[i][0]]);
                let index = prng.range(0, selection.length - 1);
                p.Property = selection[index][1].Value;
                this.addProperty(p);
                console.log(p);
            })
    }
    genLoadout(opts) {
        let loadout = Object.entries(REQUIREMENTS.LOADOUT);
        let abilities = loadout.slice(0, 2);
        let storeditems = loadout.slice(2, 6);
        this.selectItem(abilities, opts.all ? 2 : prng.range(0, 2));
        this.selectItem(storeditems, opts.all ? 4 : opts.num);
    }
    genChar(prop) {
        let p = Object.assign({}, CHARSTORE[prop]);
        let index;
        let selection = []
        switch(prop) {
            case "StoredWeapon":
                selection = ITEMS.filter(([n, i]) => i.Type === 'Weapon');
                index = prng.range(0, selection.length - 1);
                p.Property = selection[index][1].Value;
                break;
            case "StoredMobilityAbility":
                selection = ITEMS.filter(([n, i]) => i.Type === 'Auxilary');
                index = prng.range(0, selection.length - 1);
                p.Property = selection[index][1].Value;
                break;
            case "StoredHealth":
            case "StoredShield":
                p.Property = [0, (25 * prng.range(0, 7))];
                break;
            case "StoredCoins":
            case "StoredKeys":
                p.Property = [0, prng.range(0, 7)];
                break;
        }
        this.addProperty(p);
        console.log(p);
    }
    static generate(name) {
        let ret = new CharacterPropertyStore();
        let BPMCharacterPropertyStore = T_CHARSTORE[name.toLowerCase()].Properties[0];
        ret.Properties[0] = PropertyStore.from(BPMCharacterPropertyStore);
        if(name === 'run') {
            REQUIREMENTS.RANDCHAR
                .forEach(prop => ret.genChar(prop));
            ret.genLoadout({num: 1});
        }
        return ret;
    }
}