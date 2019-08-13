import styles, { locals as s } from "./styles.scss";

const template = document.createElement("template");

template.innerHTML = `
	<style>
		${styles.toString()}
	</style>
	<main class="${s.wrapper}">
		<pook-gallery>
			<img 
				src="assets/gallery/spirited-away.jpg" 
				alt="'Bleed' by Alice X. Zhang."
				data-description="Chihiro tightly embraces a wounded and bloody Hako in dragon form."
				slot="1" 
			/>
			<img 
				src="assets/gallery/clara.jpg" 
				alt="'Remember me...' by Alice X. Zhang." 
				data-description="Clara Oswald's portrait, painted in a scratchy-style from side-on."
				slot="2" 
			/>
			<img 
				src="assets/gallery/eleventh.png" 
				alt="'The Roar of Our Stars' by Alice X. Zhang."
				data-description="The Eleventh Doctor laughs joyfully; head tilted back, as tiny fragments of stars fall around them."
				slot="3" 
			/>
			<img 
				src="assets/gallery/war-doctor.png" 
				alt="'The Lonely God' by Alice X.Zhang."
				data-description="The old-faced War Doctor stares, surrounded by embers, into the middle-distance."
				slot="4" 
			/>
		</pook-gallery>
	</main>
`;

export default template;