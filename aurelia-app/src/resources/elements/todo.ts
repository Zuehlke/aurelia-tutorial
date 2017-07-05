import { bindable } from 'aurelia-framework';

export class TodoCustomElement {
    @bindable item;

    constructor() {
        this.item = {};
    }

    done() {
        this.item.done = true;
    } 
}