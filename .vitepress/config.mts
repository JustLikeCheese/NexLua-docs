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
      { text: '示例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '什么是 NexLua?', link: '/quick-start' },
        ]
      },
      {
        text: 'API 文档',
        items: [
          { text: 'LuaJava', link: '/lua/LuaJava' },
          { text: 'NexLua', link: '/nexlua/LuaUtil' },
        ]
      },
      {
        text: '示例',
        items: [
          { text: 'NexLua 脚本示例', link: '/example/luajava-examples.md' },
          { text: 'Markdown', link: '/example/markdown-examples.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JustLikeCheese/NexLua' },
      { icon: 'telegram', link: 'https://t.me/NexLua' }
    ]
  }
})
