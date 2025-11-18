# LuaJavaCache

原版 LuaJava 通过将 jobject 包装成 userdata，并未使用缓存。

# 理想缓存情况

1. 系统加载的类存入全局缓存，若找不到全局缓存再从当前 Lua 环境的 ClassLoader 查找。

2. 针对热点方法、字段优化, 使用次数越多的方法字段越放在前面方便查找。

3. Lua 全局表 __index 设置元表
