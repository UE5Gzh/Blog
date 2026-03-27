import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://your-blog-url.com',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      langs: ['javascript', 'python', 'go', 'rust', 'typescript', 'bash', 'json', 'yaml'],
    },
  },
});
