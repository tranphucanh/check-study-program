import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
	plugins: [react(), commonjs()],
	build: {
		outDir: "build",
		// input: resolve(__dirname, "./index.html"),
		minify: true,
		sourcemap: false,
		target: "modules",
	},
	optimizeDeps: {
		include: ["framer-motion", "framer-motion-3d"], // Thêm vào danh sách optimize
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
