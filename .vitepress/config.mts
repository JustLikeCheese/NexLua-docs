import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: 'favicon.ico' }]
  ],

  srcDir: "docs",
  
  title: "NexLua",
  description: "NexLua official documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'LuaJava', link: '/luajava/LuaJava' },
      { text: 'NexLua', link: '/nexlua/NexLua' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是 NexLua?', link: '/quick-start' },
        ]
      },
      {
        text: 'LuaJava 文档',
        items: [
          { text: 'LuaJava', link: '/luajava/LuaJava' },
        ]
      },
      {
        text: 'NexLua 文档',
        items: [
          { text: 'NexLua', link: '/nexlua/NexLua' },
          { text: 'LuaUtil', link: '/nexlua/LuaUtil' },
          { text: 'LuaContext', link: '/nexlua/LuaContext' },
        ]
      },
      {
        text: 'LLMS 文档',
        items: [  
          { text: 'llms-full.txt', link: '/llms/llms-full' },
          { text: 'llms.txt', link: '/llms/llms' },
        ],
      },
      {
        text: 'Markdown',
        items: [
          { text: 'Runtime API Examples', link: '/example/runtime-examples.md' },
          { text: 'Markdown Extension Examples', link: '/example/markdown-examples.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JustLikeCheese/NexLua' },
      { icon: 'telegram', link: 'https://t.me/NexLua' }
    ]
  },

  vite: {
    plugins: [
      llmstxt({
        ignoreFiles: ['llms/*', 'example/*' ]
      })
    ]
  }
})
