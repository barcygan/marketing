import { defineConfig } from 'vite'

export default defineConfig({
    // Base path for GitHub Pages subdirectory
    // Will change to '/' once custom domain is configured
    base: '/marketing/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                pl: 'pl/index.html',
                offer: 'offer.html',
                plOffer: 'pl/offer.html',
                socialMedia: 'social-media.html',
                plSocialMedia: 'pl/social-media.html',
            },
        },
    },
})
