import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: customViteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: false,
    indexHtmlFile: join(__dirname, 'cypress', 'support', 'component-index.html'),
  },

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});