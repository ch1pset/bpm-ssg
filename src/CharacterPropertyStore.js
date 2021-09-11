import {
    StructProperty
} from 'uesavetool';

import { 
    T_CHARSTORE,
    CHARSTORE,
    ITEMNAME,
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
    genLoadout(num) {
        let items = Object.entries(REQUIREMENTS.LOADOUT);
        let itemnames = Object.entries(ITEMNAME);
        prng.choose([0, items.length - 1], num)
            .forEach(f => {
                let selection = itemnames.filter(([name, item]) => item.Type === items[f][1]);
                let p = Object.assign({}, CHARSTORE[items[f][0]]);
                let index = prng.range(0, selection.length - 1);
                p.Property = selection[index][1].Value;
                this.addProperty(p);
                console.log(p);
            })
    }
    genChar(prop) {
        let p = Object.assign({}, CHARSTORE[prop]);
        let index;
        let itemnames = Object.entries(ITEMNAME);
        let selection = []
        switch(prop) {
            case "StoredWeapon":
                selection = itemnames.filter(([name, item]) => item.Type === 'Weapon');
                index = prng.range(0, selection.length - 1);
                p.Property = selection[index][1].Value;
                break;
            case "StoredMobilityAbility":
                selection = itemnames.filter(([name, item]) => item.Type === 'Weapon');
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
            ret.genLoadout(2);
        }
        return ret;
    }
}