import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		typecheck: {
			tsconfig: "./tsconfig.json",
		},
		coverage: {
			reporter: ["text", "json", "html"],
			enabled: true,
			all: true,
			cleanOnRerun: true,
			thresholds: {
				statements: 99,
				branches: 94,
				functions: 95,
				lines: 99,
			},
		},
		globals: true,
		include: ["**/*.spec.[tj]s"],
		testTimeout: 20000,
		isolate: false,
		exclude: ["node_modules", "dist"],
		server: {
			deps: {
				inline: ["isly"],
			},
		},
	},
})
