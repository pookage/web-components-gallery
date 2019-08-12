import template from "./template.js";
import { locals as s } from "./styles.scss";

export default class Page extends HTMLElement {

	constructor(){

		super();

		//dom
		const shadow   = this.attachShadow({ "mode": "open" });
		const clone    = document.importNode(template.content, true);

		//init
		shadow.appendChild(clone);
	}//constructor
}//Page