import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const base = '/contract-mgmt-docs/'

const trainingSidebar = [
  {
    text: 'Training',
    items: [
      { text: 'Overview', link: '/' },
      { text: '0 - Business knowledge', link: '/chapters/00-business-knowledge' },
      { text: '1 - Setup prerequisites', link: '/chapters/01-setup-prerequisites' },
      { text: '2 - Setup Angular and ng-aquila', link: '/chapters/02-setup-ng-aquila' },
      { text: '3 - Generate the models', link: '/chapters/03-generate-models' },
      { text: '4 - Internationalization', link: '/chapters/04-i18n' },
      { text: '5 - Login', link: '/chapters/05-login' },
      { text: '6 - Contract list', link: '/chapters/06-contract-list' },
      { text: '7 - Create a contract', link: '/chapters/07-create-contract' },
      { text: '8 - Premium calculation', link: '/chapters/08-premium-calculation' },
      { text: '9 - Document upload', link: '/chapters/09-document-upload' },
      { text: '10 - Sign the contract', link: '/chapters/10-sign-contract' },
      { text: '11 - Claude Code setup', link: '/chapters/11-claude-code-setup' },
      { text: '12 - Admin resources', link: '/chapters/12-admin-resources-ngrx' },
      { text: '13 - Auth library', link: '/chapters/13-auth-library' }
    ]
  }
]

export default withMermaid(defineConfig({
  title: 'Contract Management Training',
  description: 'Frontend training for the contract management BFF',
  base,
  // The repository README is the home page
  rewrites: { 'README.md': 'index.md' },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'keywords', content: 'Angular, training, ng-aquila, NgRx, Keycloak' }],
    ['meta', { property: 'og:title', content: 'Contract Management Training' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Overview', link: '/' },
      { text: 'Chapters', link: '/chapters/00-business-knowledge' }
    ],

    sidebar: trainingSidebar,

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ui-training-contract-mgmt/contract-mgmt-docs' }
    ],

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    }
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  }
}))
