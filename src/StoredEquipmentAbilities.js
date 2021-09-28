import { IntArray, SoftObjectArray } from "uesavetool";

export class StoredEquipmentAbilities extends SoftObjectArray {
    constructor() {
        super();
        this.Name = "StoredEquipmentAbilities\u0000";
        this.Properties = [];
    }
    static create(values) {
        let equipment = new StoredEquipmentAbilities();
        equipment.Properties = values;
        return equipment;
    }
}

export class StoredEquipmentAbilitiesCharges extends IntArray {
    constructor() {
        super();
        this.Name = "StoredEquipmentAbilitiesCharges\u0000";
        this.Properties = [];
    }
    static create(values) {
        let equipment = new StoredEquipmentAbilities();
        equipment.Properties = values;
        return equipment;
    }
}
