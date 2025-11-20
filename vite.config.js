import { defineConfig } from 'vite'

export default defineConfig({
    // Base path for GitHub Pages (repo name)
    // If your repo is https://github.com/username/my-repo, set this to '/my-repo/'
    // For now, we use './' which works for most relative deployments
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                pl: 'index-pl.html',
            },
        },
    },
})
