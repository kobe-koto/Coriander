import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import compress from "astro-compress";
const {
  homepage: domain
} = JSON.parse(fs.readFileSync("./package.json"));


// https://astro.build/config
export default defineConfig({
  site: domain,
  integrations: [sitemap({
    filter: page => page !== `${domain}/404.html` && page !== `${domain}/404/` && page !== `${domain}/404`
  }), compress()]
});