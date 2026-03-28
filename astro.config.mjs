import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/remark/reading-time.mjs';

export default defineConfig({
  site: 'https://your-blog-url.com',
  integrations: [sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'dark-plus',
      langs: ['javascript', 'python', 'go', 'rust', 'typescript', 'bash', 'json', 'yaml'],
    },
  },
});
