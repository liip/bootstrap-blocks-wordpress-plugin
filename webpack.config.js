/**
 * Extend webpack configuration from @wordpress/scripts.
 * Source: https://jeffreycarandang.com/create-gutenberg-block-plugin-wp-scripts-postcss-build/
 *
 * @package wp-boostrap-blocks
 */

const defaultConfig = require( './node_modules/@wordpress/scripts/config/webpack.config.js' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );

const production = process.env.NODE_ENV === '';

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(sc|sa|c)ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: ! production,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								postcssPresetEnv(
									{
										stage: 3,
										features: {
											'custom-media-queries': {
												preserve: false,
											},
											'custom-properties': {
												preserve: true,
											},
											'nesting-rules': true,
										},
									}
								),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: ! production,
						},
					},
				],
			},
		],
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin(
			{
				filename: '[name].css',
			}
		),
		new IgnoreEmitPlugin( [ 'editor.js', 'style.js' ] ),
	],
};
