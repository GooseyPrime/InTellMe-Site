import { defineConfig } from 'astro/config';

// Static-first. No adapter, no client framework, no runtime data fetching.
// The only JavaScript shipped is a small progressive-enhancement module;
// every route renders complete content with JS disabled.
export default defineConfig({
  site: 'https://www.intellmeai.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false }
});
