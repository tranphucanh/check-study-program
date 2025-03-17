import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "build",
		// input: resolve(__dirname, "./index.html"),
		minify: true,
		sourcemap: false,
		target: "modules",
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@assets": resolve(__dirname, "./src/assets"),
		},
	},
	server: {
		port: 4000,
		open: true,
		host: true,
	},
});
