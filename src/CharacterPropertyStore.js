import {
    StructProperty
} from 'uesavetool';

import { 
    T_CHARSTORE,
    CHARSTORE,
    ITEMNAME,
    REQUIREMENTS,
    rollDice, 
    chooseFromRange,
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
        let items = Object.keys(REQUIREMENTS.LOADOUT);
        chooseFromRange([0, items.length - 1], num)
            .forEach(f => {
                let item = items[f];
                let type = REQUIREMENTS.LOADOUT[item]
                let p = Object.assign({}, CHARSTORE[item]);
                let index = rollDice(0, ITEMNAME[type].length - 1);
                p.Property = ITEMNAME[type][index].Value;
                this.addProperty(p);
                console.log(p);
            })
    }
    genChar(prop) {
        let p = Object.assign({}, CHARSTORE[prop]);
        let index;
        switch(prop) {
            case "StoredWeapon":
                index = rollDice(0, ITEMNAME.Weapon.length - 1);
                p.Property = ITEMNAME.Weapon[index].Value;
                break;
            case "StoredMobilityAbility":
                index = rollDice();
                p.Property = ITEMNAME.Auxilary[index].Value;
                break;
            case "StoredHealth":
            case "StoredShield":
                p.Property = [0, (25 * rollDice(0, 7))];
                break;
            case "StoredCoins":
            case "StoredKeys":
                p.Property = [0, rollDice(0, 7)];
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