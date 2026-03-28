import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-blog-url.com',
  integrations: [sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      langs: ['javascript', 'python', 'go', 'rust', 'typescript', 'bash', 'json', 'yaml'],
    },
  },
});
