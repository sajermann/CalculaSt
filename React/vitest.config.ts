/// <reference types="vitest" />
/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		react(),
		AutoImport({
			imports: ['vitest'],
			dts: true, // generate TypeScript declaration
		}),
	],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/Config/Test/setup.ts',
		coverage: {
			reporter: ['text', 'lcov', 'html'],
		},
	},
});
