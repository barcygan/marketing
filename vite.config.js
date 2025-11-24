import { defineConfig } from 'vite'

export default defineConfig({
    // Base path for custom domain
    // When using a custom domain, the site is served from the root
    // So we use '/' instead of '/marketing/'
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                offer: 'offer.html',
                pl: 'pl/index.html',
                plOffer: 'pl/offer.html',
            },
        },
    },
})
