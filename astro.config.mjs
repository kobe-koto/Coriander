import { defineConfig } from 'astro/config';
import htmlMinify from "@frontendista/astro-html-minify";
import sitemap from '@astrojs/sitemap';
import fs from "node:fs";
const { homepage: SiteDomain } = JSON.parse(fs.readFileSync("./package.json"));


// https://astro.build/config
export default defineConfig({
  site: SiteDomain,
  integrations: [
    htmlMinify(), 
    sitemap({
      filter: (page) =>
        page !== `${SiteDomain}/404.html` && 
        page !== `${SiteDomain}/404/` && 
        page !== `${SiteDomain}/404`
    }),
  ]
});