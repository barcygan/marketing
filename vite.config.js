import { defineConfig } from 'vite'

export default defineConfig({
    // Base path for GitHub Pages
    // Set to '/' for custom domain (kcygan.eu)
    base: '/',
    // Ensure public directory files (like CNAME) are copied to dist
    publicDir: 'public',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                offer: 'offer.html',
                socialMedia: 'social-media.html',
                enMain: 'en/index.html',
                enOffer: 'en/offer.html',
                enSocialMedia: 'en/social-media.html',
            },
        },
    },
})
