# 什么是 NexLua？

NexLua 是一个在 JVM 平台上运行的 Lua-Java 桥。允许开发者使用 NexLuajava API 访问 Java 方法/类。

## 支持的 Lua 版本

目前只支持 LuaJIT，后续会支持其他 Lua 版本。

## 平台

仅在安卓平台上测试通过，支持 armeabi-v7a arm64-v8a x86 x86_64 四种架构

## 使用

```groovy
dependencies {
    implementation 'com.github.justlikecheese:nexlua:LuaJava:1.1.1'
}
```

## 路线图

当前 NexLua 已实现 Lua 的所有 API，还剩下部分 Debug、Lua Alloc **辅助 API** 未实现。

### NexLuaJava

- [ ] Lua Debug API
- [ ] Lua Alloc API
- [ ] 完善 LuaJava 库
- [ ] 支持 luajava 扩展函数
- [ ] 解决 NewGlobalRef 51200 的限制

- [x] 在 Lua 是实现 toJavaObject(Class<?>) 等 LuaValue 函数
- [x] 实现 LuaMetatable
- [x] 完善错误处理
- [x] 复制 LuaValue 的方法到 Lua
- [x] 优化 isJavaObject 性能
- [x] 优化 AbstractLuaValue 性能
- [x] Lua 类添加 toLuaNumber 等辅助函数
- [x] 实现 Java Class, JavaObject, JavaArray 元表
- [x] 调用 Java 方法时类型转换及调用逻辑
- [x] Lua 值转 Java 对象

### NexLua

- [ ] 实现小组件开发
- [ ] 实现 LuaService
- [ ] 实现 LuaBroadcast Receiver
- [ ] 实现 Lua ContentProvider
- [ ] 实现 LuaResources

- [ ] 支持 loaddex
- [ ] 实现 dump
- [ ] 实现 loadlayout

- [x] 重构 LuaUtil

## 其他

参考了以下项目，我花了大概两个月的时间在无任何基础的情况下理解了以下框架，并重构了所有的代码。非常感谢这些先驱者的开源。这为 NexLua 的存在奠定了基础。

https://github.com/gudzpoz/luajava

https://github.com/jasonsantos/luajava

https://github.com/nirenr/AndroLua_pro
