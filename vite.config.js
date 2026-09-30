import {defineConfig} from 'vite';
export default defineConfig({plugins:[{name:'cms-script',transformIndexHtml(){return [{tag:'script',attrs:{type:'module',src:'/cms.js'},injectTo:'body'}];}}]});
