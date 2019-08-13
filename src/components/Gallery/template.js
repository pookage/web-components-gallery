import styles, { locals as s } from "./styles.scss";

const gallery = document.createElement("template");
const thumb    = document.createElement("template");

gallery.innerHTML = `
	<style>
		${styles.toString()}
	</style>
	<form class="${s.wrapper}">
		<div class="${s.container}">
			<output
				class="${s.main}" 
				for="thumb-1 thumb-2 thumb-3 thumb-4 gallery-next gallery-prev"
			>
				<div class="${s.void}"></div>
				<img
					class="${s.image}" 
					src="" 
					alt="description of image contents"
				/>
			</output>
			<button 
				class="${s.button} ${s.previous}"
				aria-label="Previous image.">
				<span class="${s.icon}"></span>
			</button>
			<button 
				class="${s.button} ${s.next}"
				aria-label="Next image.">
				<span class="${s.icon}"></span>
			</button>
		</div>
		<fieldset class="${s.thumbs}">
			<ul class="${s.list}">
				<!-- <li class="Gallery__item"> (THUMB) --->
			</ul>
		</fieldset>
	</form>
`;

thumb.innerHTML = `
	<li class="${s.item}">
		<input
			class="${s.radio}"
			type="radio" 
			name="gallery-thumb" 
			value=""
		/>
		<label
			class="${s.label}"
		>
			<slot name="1">
				<!-- <img src="path/to/image.jpg" /> -->
			</slot>
		</label>
	</li>
`;



export default gallery;
export { 
	gallery, 
	thumb 
};