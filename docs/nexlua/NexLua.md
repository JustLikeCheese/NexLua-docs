# NexLua 增强库

NexLua 在 NexLuaJava 基础上，扩展了两个核心功能库：`import` 和 `dump`。

## import 模块

`import` 模块为 Lua 提供了类似 Java 的类导入机制，支持单个类导入和通配符包导入。若找不到类时，会 fallback 成 `require` 函数调用。

### 导入单个类

```lua
require "import"
import "java.util.ArrayList"

local list = ArrayList()
list.add("Hello")
list.add("NexLua")
print(list)
```

### 导入整个包

使用 `.*` 结尾的字符串来导入包。这不会立即加载包下的所有类，而是注册一个搜索路径。

```lua
require "import"
import "android.widget.*"
import "android.view.*"

local btn = Button(activity)
local v = View(activity)
```

```lua
local utils = import "utils"
```

## dump

`dump` 函数用于打印 lua 中的任意值。`dump` 能够识别已访问过的 table，并避免重复打印。

### 打印基本 table

```lua
local data = {
    name = "NexLua",
    version = 1.0,
    features = { "Fast", "Simple" }
}

print(dump(data))
```

输出:
```lua
{
  ["name"] = "NexLua",
  ["version"] = 1,
  ["features"] = {
    [1] = "Fast",
    [2] = "Simple"
  }
}
```

### 处理混合键值

```lua
local complex = {
    [1] = "Index 1",
    ["key"] = "String Key",
    sub = { x = 10, y = 20 }
}
print(dump(complex))
```

输出:
```lua
{
  [1] = "Index 1",
  ["key"] = "String Key",
  ["sub"] = {
    ["x"] = 10,
    ["y"] = 20
  }
}
```

