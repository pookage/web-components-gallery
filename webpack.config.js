const path   = require('path');
const src    = path.resolve(__dirname, "src");
const dist   = path.resolve(__dirname, "dist");
function buildConfig(env, args){

	const { mode } = args;

	let modeOptions;
	switch(mode){
		case "development":
			modeOptions = {
				mode: "development",
				devServer: {
					contentBase: "./dist"
				},
				output: {
					filename: "bundle.js",
					path: dist,
					publicPath: "/"
				},
			};
			break;
		case "production":
		default:
			modeOptions = {
				mode: "production",
				output: {
					filename: "bundle.js",
					path: dist,
					publicPath: "./"
				}
			};
			break;
	}

	return {
		entry: `${src}/index.js`,
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[folder]__[local]",
								},
								url: false
							}
						}, {
							loader: "sass-loader"
						}
					]	
				},
			]
		},
		resolve: {
			alias: {
				"SHARED": `${src}/shared`
			}
		},
		...modeOptions,
	}
}

module.exports = buildConfig;