# Gallery with Web Components

![Menu Button demo](https://raw.githubusercontent.com/pookage/web-components-gallery/master/screenshots/demo__2.gif)

A multi-page gallery with thumbs and next/prev buttons, used to teach web-components, built with:

- web components
- scss
- webpack

Live demo [here](https://pookage.github.io/web-components-gallery/dist/index.html)

## Usage

```
<pook-gallery>
	<img 
		src="path/to/image-1.jpg" 
		alt="'Work' by Artist Name." 
		data-description="Accessible description of image."
		slot="1"
	/>
	<img 
		src="path/to/image-2.jpg" 
		alt="'Work' by Artist Name." 
		data-description="Accessible description of image."
		slot="2"
	/>
	<img 
		src="path/to/image-3.jpg" 
		alt="'Work' by Artist Name." 
		data-description="Accessible description of image."
		slot="3"
	/>
</pook-gallery>
```

>**NOTE: The `data-description` attribute will be used to set the `alt` attribute of the main gallery image.**

## Building

1. Clone the repo locally
2. From the local folder, run `npm install` to install dependencies

### ...for development

3. Run `npm run build-dev` to initialise a `webpack-dev-server`, which will hot-reload if the contents of `/src/` are changed.

### ...for production

3. Run `npm run build-prod` to bundle the app with `webpack` - the generated `bundle.js` will be placed in `/dist/`.

>**NOTE: the index.html will be copied from `/src/` to `/dist/` when `build-prod` or `build-dev` are initially run, but changes to `index.html` will _not_ trigger a hot-reload from the dev-server.**
