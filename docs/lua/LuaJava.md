# Nex LuaJava API

NexLua 提供了一套 Nex LuaJava 接口(简称 nxluajava)，用于与 Java 进行交互。以下是一些常用的 API。

## luajava.bindClass(className)

类似 `Class.forName(className)`, 查找类名对应的 `Class` 对象。  
例如 `luajava.bindClass("java.lang.String")` 返回 `String.class`。

```lua
local String = luajava.bindClass("java.lang.String")
print(String) -- class java.lang.String
```

可以使用 `void`, `boolean`, `char`, `byte`, `short`, `int`, `long`, `float`, `double` 来获取原始类型

```lua
local int = luajava.bindClass("int")
print(int) -- class int
```

## luajava.bindMethod(class, methodName \[, methodType\])

类似 `obj.getClass().getMethod(methodName, methodType)`, 查找对象的指定方法。当 `methodName` 为 `new` 时，返回构造方法。

```lua
local ArrayList = luajava.bindClass("java.util.ArrayList")
local ArrayList_new = luajava.bindMethod(ArrayList, "new")

local Object = luajava.bindClass("java.lang.Object")
local int = luajava.bindClass("int")
local ArrayList_add1 = luajava.bindMethod(ArrayList, "add", Object)
local ArrayList_add2 = luajava.bindMethod(ArrayList, "add", Integer, Object)

local myArray = ArrayList_new()
ArrayList_add1(myArray, "Hello")
ArrayList_add2(myArray, 0, "World")
print(myArray.toString())
```

## luajava.instanceof(obj, class)

判断 obj 是否为 class 类型，返回 true 或 false。  

```lua
local Button = luajava.bindClass("android.widget.Button")
local btn = Button(activity)
if luajava.instanceof(btn, Button) then
  print("btn is a Button")
end
```

## luajava.toJavaObject(value \[, class\])

将 Lua 值转换为 Java 对象。可选参数 `class` 指定目标对象类型。默认为 `Object`。  

```lua
-- convert string to java.lang.String
local text = "updog"
local javaString = luajava.toJavaObject(t)
print(javaString.getClass().getName()) -- class java.lang.String
local int = luajava.bindClass("int")
local float = luajava.bindClass("float")
-- convert number to int or float
local num = 123
local javaInt = luajava.toJavaObject(num, int)
local javaFloat = luajava.toJavaObject(num, float)
print(javaInt.getClass().getName()) -- class int
print(javaFloat.getClass().getName()) -- class float
```

## luajava.toJavaArray(value \[, class\])

将 Lua 值转换为 Java Array。可选参数 `class` 指定目标对象类型。默认为 `Object`。  

```lua
local arr = {1, 2, 3}
local javaArray1 = luajava.toJavaArray(arr)
local javaArray2 = luajava.toJavaArray(arr, luajava.bindClass("float"))
```

## luajava.toJavaMap(value \[, keyClass, valueClass\])

将 Lua 值转换为 Java Map。 可选参数 `keyClass` 和 `valueClass` 指定目标对象类型。默认为 `Object`。  

```lua
local HashMap = luajava.bindClass("java.util.HashMap")
local String = luajava.bindClass("java.lang.String")
local int = luajava.bindClass("int")

local luaMap = {
  "user1" = 20,
  "user2" = 20,
  "user3" = 50,
  "user4" = 100
}

local javaMap = luajava.toJavaMap(luaMap, String, int)
```

## luajava.toString(obj)

将 Java 对象转换为 Lua 字符串。调用的 Object 的 toString() 方法。  

```lua
local Button = luajava.bindClass("android.widget.Button")
print(luajava.toString(Button)) -- class android.widget.Button
```

## luajava.asTable(obj)

```lua
-- HashMap
local HashMap = luajava.bindClass("java.util.HashMap")
local String = luajava.bindClass("java.lang.String")
local int = luajava.bindClass("int")

local luaMap = {
  "user1" = 20,
  "user2" = 20,
  "user3" = 50,
  "user4" = 100
}

local javaMap = luajava.toJavaMap(luaMap, String, int)
-- luajava.asTable
local map = luajava.asTable(javaMap)
print(map["user1"]) -- 20
```

将 Java 对象转换为 Lua 表。  

## luajava.newInstance(clazz, object... args)  

创建一个 Java 对象实例，类似 `new clazz(args)`。  

```lua
local Button = luajava.bindClass("android.widget.Button")
local btn = luajava.newInstance(Button, activity)
```

## luajava.createArray(clazz, dim1 \[, dim2, ...\])  

创建一个 Java 数组对象，类似 `new clazz[dim1][dim2]...`。  

> 注意: Java 数组在 NexLuaJava 中使用 0 作为开始索引, 并且支持 ipairs, pairs 遍历

```lua
local String = luajava.bindClass("java.lang.String")
local myArray = luajava.createArray(String, 10)
local length = #myArray
for i = 0, length-1 do
  myArray[i] = "Hello"
end

for key, value in pairs(myArray) do
  print(key, value)
end

for key, value in ipairs(myArray) do
  print(key, value)
end
```

## luajava.createProxy(clazz, handler)  

创建一个 Java 代理对象，类似 `Proxy.newProxyInstance(clazz.getClassLoader(), new Class[]{clazz}, handler)`。  

```lua
local Runnable = luajava.bindClass("java.lang.Runnable")
-- Use table as handler
local luaRunnable1 = luajava.newProxy(Runnable, {
  run = function()
    print("Run!")
  end
})
luaRunnable1.run()
-- You can also use function as handler
local luaRunnable2 = luajava.newProxy(Runnable, function()
  print("Here we go!")
end)
luaRunnable2.run()
```

## luajava.unwrap(jobject obj)

返回 LuaProxy 代理的表或者是函数

```lua
local Runnable = luajava.bindClass("java.lang.Runnable")
-- Use table as handler
local proxy = luajava.newProxy(Runnable, {
  run = function()
    print("Run!")
  end
})
local yoo1 = luajava.unwrap(proxy)
print(type(yoo1)) -- table
-- You can also use function as handler
local luaRunnable2 = luajava.newProxy(Runnable, function()
  print("Here we go!")
end)
local yoo2 = luajava.unwrap(luaRunnable2)
print(type(yoo2)) -- function
```

# NexLuaJava 语法

## 创建 Java 对象

```lua
-- 获取类
local MyClass = luajava.bindClass("com.test.MyClass")
local myObj = MyClass(1) -- 传入数字 1 作为构造参数
```

## 静态/实例字段读写

```lua
-- 获取类
local MyClass = luajava.bindClass("com.test.MyClass")
-- 静态字段
MyClass.STATIC_FIELD = 1
print(MyClass.STATIC_FIELD)
-- 实例字段
local myObj = MyClass(1)
myObj.myField = 1
```

## 静态/实例方法调用

```lua
-- 获取类
local MyClass = luajava.bindClass("com.test.MyClass")
-- 静态方法
print(MyClass.staticMethod) -- function: 0xb8a05340
MyClass.staticMethod(1)
-- 实例方法
local myObj = MyClass(1)
myObj.myMethod(1)
```

## get/set 属性访问语法糖

调用 Java 的方法时，如果方法是 getXxx / setXxx 的形式，可以直接省去 get/set，并且不区分首字母的大小写
set 还可以省略末尾的 Listener

```lua
-- 创建 EditText
local EditText = luajava.bindClass("android.widget.EditText")
local editText = EditText(activity)
-- 传统代码 getText setText
editText.setText("Hello, Sun!")
print(editText.getText())
print(editText.isEnable())
-- get/set 语法糖
editText.Text = "Hello, Moon!"
print(editText.Text)
-- 忽略首字母大小写
editText.text = "Hello, World!"
print(editText.text)
```

## 数组操作

```lua
-- 创建数组
-- 创建大小为 3 的 int 类型数组，相当于 new int[3]
local int = luajava.bindClass("java.lang.Integer")
local myArray1 = int[3]
-- 创建 int 类型数组，初始值为 1,2,3，相当于 new int[]{1, 2, 3}
local myArray2 = int{1, 2, 3}
-- 创建 int 类型二维数组，相当于 new int[][]{{1, 2, 3}, {10}, {20}}
local myArray3 = int{{1,2,3}, {10}, {20}}
-- 当然, 也可以省去花括号
local myArray3 = int{{1,2,3}, 10, 20}

-- 获取数组长度
print(#myArray1)
-- 获取数组长度
print(myArray1.length)
-- 获取数组元素, Java 数组在 Lua 保持 0 开始
print(myArray1[0])
-- 设置数组元素
myArray1[0]=10
-- 获取二维数组元素
print(myArray1[0][1])
-- 设置二维数组元素
myArray1[0][1]=10

-- 支持 ipairs/pairs 遍历
for i, v in ipairs(myArray1) do
  print(i, v)
end
```
