import { LightningElement, api } from "lwc";

export default class HelloWorld extends LightningElement {
    @api greeting = "Hello World";
    options = [
        { label: "Example Option", value: "Example Options" },
        { label: "Another Option", value: "Another Options" }
    ]
}