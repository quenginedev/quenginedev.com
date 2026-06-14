// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },

	nitro: {
		preset: "cloudflare-pages",
	},

	modules: [
		"nitro-cloudflare-dev",
		// "@pinia/nuxt",
		"@vueuse/nuxt",
		"pinia-plugin-persistedstate",
		"@formkit/auto-animate",
		"@nuxtjs/google-fonts",
		"@nuxtjs/color-mode",
		"@nuxt/icon",
		"vuetify-nuxt-module",
		"@nuxtjs/tailwindcss",
	],

	colorMode: {
		classSuffix: "",
		preference: "system",
		fallback: "dark",
		storageKey: "quenginedev-color-mode",
	},

	googleFonts: {
		families: {
			Syne: [400, 500, 600, 700, 800],
			"Instrument Sans": [400, 500, 600, 700],
		},
		display: "swap",
		preload: true,
	},

	icon: {
		size: '20',
	},

	vuetify: {
		vuetifyOptions: {
			theme: {
				defaultTheme: 'dark',
				themes: {
					dark: {
						colors: {
							background: '#0A0C0F',
							surface: '#0F1216',
						},
					},
					light: {
						colors: {
							background: '#F2F6F4',
							surface: '#FFFFFF',
						},
					},
				},
			},
			defaults: {
				VBtn: {
					size: "small",
				}
			}
		}
	}
});
