import { defineConfig } from 'vite'

export default defineConfig({
    // Base path for GitHub Pages
    // Your repo is at https://github.com/barcygan/marketing
    // So the site is served at https://barcygan.github.io/marketing/
    base: '/marketing/',
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
