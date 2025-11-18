# 什么是 NexLua？

NexLua 提供了完整的 Lua 与 Java 交互的接口。允许 Lua 通过接口调用 Java 的方法，并且 NexLua 提供了完整的类型转换机制。

## 支持的 Lua 版本

只支持 LuaJIT，后续会考虑添加 Lua5.3、Lua5.4 的分支。

我们使用最新的 LuaJIT 版本以求最好的兼容性和运行效率。

## 平台

不使用 JNI Gen 等技术，纯手搓 LuaJava 桥，看得见摸得着的才能叫稳定

当前只支持安卓平台，支持 armeabi-v7a arm64-v8a x86 x86_64 四种架构

## 使用

```groovy
dependencies {
    implementation 'com.github.justlikecheese:nexlua:LuaJava:1.1.1'
}
```

## 感谢

我们参考了以下项目，花了大概两个月的时间在无任何基础的情况下理解了以下框架，并重构了所有的代码。非常感谢这些先驱者的开源。这为 NexLua 的存在奠定了基础。

https://github.com/gudzpoz/luajava

https://github.com/jasonsantos/luajava

https://github.com/nirenr/AndroLua_pro
