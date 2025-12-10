import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
        text: 'LuaJava API 文档',
        items: [
          { text: 'LuaJava', link: '/luajava/LuaJava' },
        ]
      },
      {
        text: 'NexLua API 文档',
        items: [
          { text: 'LuaUtil', link: '/nexlua/LuaUtil' },
        ]
      },
      {
        text: 'Markdown',
        items: [
          { text: 'Runtime API Examples', link: '/example/luajava-examples.md' },
          { text: 'Markdown Extension Examples', link: '/example/markdown-examples.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JustLikeCheese/NexLua' },
      { icon: 'telegram', link: 'https://t.me/NexLua' }
    ]
  }
})
