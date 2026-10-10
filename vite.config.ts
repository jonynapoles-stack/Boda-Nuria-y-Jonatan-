import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({base:'/Boda-Nuria-y-Jonatan-/',plugins:[react(),tailwindcss()],build:{outDir:'docs',emptyOutDir:true},server:{host:'127.0.0.1',port:5175,strictPort:true},preview:{host:'127.0.0.1',port:4175,strictPort:true}});
