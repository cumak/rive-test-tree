import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  inlineStylesheets: "never",
  base: "/rive-test-tree/",
  outDir: "./docs",
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/app.js',
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(-1);
            if (/css|scss/i.test(extType)) {
              return '[ext]/style[extname]';
            } else {
              return '[ext]/[name][extname]';
            }
          },
        },
      },
      minify: false,
    },
  },
  server: {
    host: true,
  },
});
