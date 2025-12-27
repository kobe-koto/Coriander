import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import icon from "astro-icon";

import { readFileSync } from "node:fs";
const { homepage: domain } = JSON.parse(String(readFileSync("./package.json")));

export default defineConfig({
    site: domain,
    integrations: [
        sitemap({
            filter: page => page !== `${domain}/404.html` && page !== `${domain}/404/` && page !== `${domain}/404`
        }), 
        compress(),
        icon()
    ]
});
