import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'

const cleanUrlsPlugin = () => ({
    name: 'clean-urls',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            const urlPath = req.url.split(/[?#]/)[0];
            if (urlPath !== '/' && !path.extname(urlPath)) {
                const filePath = path.join(process.cwd(), `${urlPath}.html`);
                if (fs.existsSync(filePath)) {
                    req.url = req.url.replace(urlPath, `${urlPath}.html`);
                }
            }
            next();
        });
    }
});

export default defineConfig({
    plugins: [cleanUrlsPlugin()],
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
                marketing: 'marketing.html',
                enMain: 'en/index.html',
                enOffer: 'en/offer.html',
                enSocialMedia: 'en/social-media.html',
                enMarketing: 'en/marketing.html',
                challenge: 'challenge/index.html',
                barometr: 'barometr/index.html',
                enBarometr: 'en/barometr/index.html',
            },
        },
    },
})
