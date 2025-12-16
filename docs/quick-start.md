# 什么是 NexLua？

NexLua 是一个在 JVM 平台上运行的 Lua-Java 桥。允许开发者使用 NexLuajava API 访问 Java 方法/类。

## 支持的 Lua 版本

目前只支持 LuaJIT，后续会支持其他 Lua 版本。

## 平台

仅在安卓平台上测试通过，支持 armeabi-v7a arm64-v8a x86 x86_64 四种架构

## 使用

导入模块

```groovy
dependencies {
    implementation 'com.github.justlikecheese:nexlua:LuaJava:1.1.5'
}
```

如果你想要类似 AndroLua 的扩展

```groovy
dependencies {
    implementation 'com.github.justlikecheese:nexlua:NexLua:1.1.5'
}
```

## 路线图

当前 NexLua 已实现 Lua 的所有 API，还剩下部分 Debug、Lua Alloc **辅助 API** 未实现。

## 其他

参考了以下项目，我花了大概两个月的时间在无任何基础的情况下理解了以下框架，并重构了所有的代码。非常感谢这些先驱者的开源。这为 NexLua 的存在奠定了基础。

https://github.com/gudzpoz/luajava

https://github.com/jasonsantos/luajava

https://github.com/nirenr/AndroLua_pro
