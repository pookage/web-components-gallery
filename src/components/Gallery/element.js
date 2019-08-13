import template, { thumb as thumbTemplate } from "./template.js";
import { locals as s } from "./styles.scss";

export default class Gallery extends HTMLElement {

	/* INITIALISE
	//////////////////////////// */
	constructor(){
		super();

		const shadow = this.attachShadow({ "mode": "open" });
		const clone  = document.importNode(template.content, true);
		const listEl = clone.querySelector(`.${s.list}`);
		const nextEl = clone.querySelector(`.${s.next}`);
		const prevEl = clone.querySelector(`.${s.previous}`);
		this.mainImg = clone.querySelector(`.${s.main} .${s.image}`);
		this.voidImg = clone.querySelector(`.${s.main} .${s.void}`)

		/* STATE INITALISATION
		------------------------- */
		const initialState = { 
			activeIndex: 0
		};

		let stateUpdated = this.stateUpdated;
		const handler      = {
			set(state, key, value){
				state[key] = value;
				stateUpdated(state);
				return true;
			}
		};
		const state      = this.state = new Proxy(initialState, handler);
		const imageCount = this.imageCount = this.children.length;


		/* SCOPE BINDING
		----------------------- */
		this.next            = window.next = this.next.bind(this, state);
		this.previous        = window.previous = this.previous.bind(this, state);
		this.setActiveIndex  = this.setActiveIndex.bind(this, state);
		this.generateThumbs  = this.generateThumbs.bind(this, state);
		stateUpdated         = this.stateUpdated.bind(this);


		/* EVENT LISTENERS
		----------------------- */
		 nextEl.addEventListener("click", this.next);
		 prevEl.addEventListener("click", this.previous);


		/* RENDER
		----------------------- */
		//generate thumbs
		const thumbs = this.generateThumbs(imageCount, state.activeIndex);
		this.inputs  = [ ...thumbs.querySelectorAll("input") ];
		//add to DOM
		listEl.appendChild(thumbs);
		shadow.appendChild(clone);
	}//constructor

	connectedCallback(){

		this.stateUpdated(this.state);
	}//connectedCallback


	/* RENDERING
	/////////////////////////// */
	generateThumbs(state){

		const { activeIndex } = state;
		const { imageCount }  = this;
		const fragment = document.createDocumentFragment();

		for(let i = 0; i < imageCount; i++){
			const thumb = document.importNode(thumbTemplate.content, true);
			const input = thumb.querySelector(`.${s.radio}`);
			const label = thumb.querySelector(`.${s.label}`);
			const slot  = thumb.querySelector(`slot`);
			const id    = `thumb-${i}`;
			const index = i;

			input.setAttribute("id", id);
			label.setAttribute("for", id);
			slot.setAttribute("name", i+1);

			input.addEventListener("change", this.setActiveIndex.bind(this, index));
			slot.addEventListener("slotchange", this.setInputValues.bind(this, input));

			if(i === activeIndex) input.checked = true;

			fragment.appendChild(thumb);
		}

		return fragment;
	}//generateThumbs

	setInputValues(input, event){
		const [ image ] = event.target.assignedElements();
		const { src, dataset: { description } }   = image;
		
		input.value               = src;
		input.dataset.description = description;
	}//setInputValues


	/* STATE MANAGEMENT
	///////////////////////////*/
	stateUpdated(state){
		const {
			activeIndex
		} = state;

		// mark active thumb as checked
		const activeThumbId = `thumb-${activeIndex}`;
		const activeThumb   = this.inputs.find(input => input.id === activeThumbId);

		const { 
			value: imageSrc, 
			dataset: { description }
		} = activeThumb;

		activeThumb.checked                = true;
		this.mainImg.alt                   = description
		this.mainImg.src                   = imageSrc;
		this.voidImg.style.backgroundImage = `url(${imageSrc})`;
		// this.voidImg.setAttribute("style", `background-image: ${imageSrc}`)

		console.log(this.voidImg, this.voidImg.style)
	}//stateUpdated

	setActiveIndex(state, index){

		state.activeIndex = index;
	}//setActiveIndex

	next(state, event){
		
		if(event) event.preventDefault();

		const { activeIndex } = state;
		const { imageCount }  = this;

		let nextIndex = activeIndex + 1;
		nextIndex     = nextIndex == imageCount ? 0 : nextIndex;

		this.setActiveIndex(nextIndex);
	}//next

	previous(state, event){

		if(event) event.preventDefault();

		const { activeIndex } = state;
		const { imageCount }  = this;

		let nextIndex = activeIndex - 1;
		nextIndex     = nextIndex < 0 ? imageCount - 1 : nextIndex;

		this.setActiveIndex(nextIndex);
	}//previous



}//HTMLElement