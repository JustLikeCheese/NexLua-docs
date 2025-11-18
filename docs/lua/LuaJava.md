# Nex LuaJava API

NexLua 提供了一套 Nex LuaJava 接口(简称 nxluajava)，用于与 Java 进行交互。以下是一些常用的 API 

其中 jclass 指的是 Java 的 Class 对象，jmethod 指的是 Java 的 Method 对象，jobject 指的是 Java 的对象实例，jarray 指的是 Java 的数组对象。

## jclass luajava.bindClass(string className)

类似 `Class.forName(className)`, 查找类名对应的 `Class` 对象。  
例如 `luajava.bindClass("java.lang.String")` 返回 `String.class`。

```lua
local String = luajava.bindClass("java.lang.String")
print(String) -- class java.lang.String
```

## jmethod luajava.bindMethod(jclass obj, string methodName, \[, jclass methodType\])

类似 `obj.getClass().getMethod(methodName, methodType)`, 查找对象的指定方法。当 `methodName` 为 `new` 时，返回构造方法。

```lua
local ArrayList = luajava.bindClass("java.util.ArrayList")
local ArrayList_new = luajava.bindMethod(ArrayList, "new")

local Object = luajava.bindClass("java.lang.Object")
local Integer = luajava.bindClass("java.lang.Integer")
local ArrayList_add = luajava.bindMethod(ArrayList, "add", Object)
local ArrayList_add_at = luajava.bindMethod(ArrayList, "add", Integer, Object)

local myArray = ArrayList_new()
addElement(myArray, "Hello")
addAtIndex(myArray, 0, "World")
print(myArray.toString()) -- [World, Hello]
```

## boolean instanceof(jobject obj, jclass class)
判断 obj 是否为 class 类

## jobject luajava.toObject(object obj)
将 Lua 对象转换为 Java 对象。  

## jobject luajava.toMap(table obj \[, jclass keyClass, jclass valueClass\])
将 Lua Table 对象转换为 Java Map。  

## jobject luajava.toArray(table obj \[, jclass type\])
将 Lua Table 对象转换为 Java Array。  

## table luajava.asTable(jobject obj)
将 Java 对象转换为 Lua Table。  

## object luajava.asObject(jobject obj)  
将 Java 对象完全转换为 Lua 对象。  
例如 `luajava.toObject(luajava.bindClass("java.lang.String").new("Hello"))` 返回一个 Lua 字符串对象。

jobject luajava.newInstance(jclass clazz, object... args)  (别名 new)
创建一个 Java 对象实例，类似 `new clazz(args)`。  
例如 `luajava.newInstance(luajava.bindClass("android.widget.TextView"), activity)` 返回一个 `TextView` 对象。

jarray luajava.createArray(jclass clazz, int dim1, int dim2, ...)  
创建一个 Java 数组对象，类似 `new clazz[dim1][dim2]...`。  
例如 `luajava.createArray(luajava.bindClass("java.lang.String"), 10)` 返回一个长度为 10 的字符串数组。

jobject luajava.createProxy(jclass clazz, object... args)  
创建一个 Java 代理对象，类似 `Proxy.newProxyInstance(clazz.getClassLoader(), new Class[]{clazz}, handler)`。  
例如 `luajava.createProxy(luajava.bindClass("java.lang.Runnable"), function() print("Hello from Lua") end)` 返回一个实现了 `Runnable` 接口的代理对象。

table luajava.unwrap(jobject obj)
返回代理对象的表
例如 `luajava.unwrap(runnableProxy)` 返回一个包含 `run` 方法的表

jobject luajava.caught()  
捕捉 Java 异常并返回异常对象。如果没有异常发生，返回 `nil`。

nil luajava.detach(thread)  
允许 Lua 线程从 Java 线程中分离。

# LuaJava 语法

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

## LuaJava DSL 语法糖

通过 LuaJava DSL 语法糖你可以省去大部分重复的代码。


```lua
-- 创建 Button
local Button = luajava.bindClass("android.widget.Button")
local btn = Button(activity)
-- LuaJava DSL 语法糖
btn {
  -- 等同于 btn.Text = "Click me!"
  Text = "Click me!",
  -- 等同于 btn.onClick = function xxx
  onClick = function()
    print("Click!")
  end
}
-- 或者传入函数
local btn = Button {
  function()
    -- 等同于 btn.Text = "Click me!"
    Text = "Click me!"
    -- 等同于 btn.onClick = function xxx
    onClick = function()
      print("Click!")
    end
    -- 等同于 print(btn.isEnable())
    print(isEnable())
    -- 输出 btn 本身
    print(this) -- android.widget.Button{72fdd82 VFED..C.. ......I. 0,0-0,0}
  end
}
-- 使用括号
local btn = Button(
  function()
    -- 等同于 btn.Text = "Click me!"
    Text = "Click me!"
  end
)
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

# LuaJava 实现

## jclass

### __index

jclass 的 __index 可以获取静态成员变量和静态成员方法。

其中为了支持 getXXX 语法, 需要区分缓存的类型

1 => 静态成员变量
2 => 静态成员方法