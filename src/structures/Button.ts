import { ButtonType } from "../typings/Command";

export class Button {
    constructor(buttonOption: ButtonType) {
        Object.assign(this, buttonOption);
    }
}
