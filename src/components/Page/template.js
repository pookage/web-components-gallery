import styles, { locals as s } from "./styles.scss";

const template = document.createElement("template");

template.innerHTML = `
	<style>
		${styles.toString()}
	</style>
	<main class="${s.wrapper}">
		
				

	</main>
`;

export default template;