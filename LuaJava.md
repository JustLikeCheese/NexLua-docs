# LuaJava API

NexLua 提供了一套私有的 LuaJava API，用于与 Java 进行交互。以下是一些常用的 API 接口。
其中 jclass 指的是 Java 的 Class 对象，jmethod 指的是 Java 的 Method 对象，jobject 指的是 Java 的对象实例，jarray 指的是 Java 的数组对象。
每个创建的 LuaState 在加载时就会自动加载 LuaJava 库。

jclass luajava.bindClass(string className)  
类似 `Class.forName(className)`, 查找类名对应的 `Class` 对象。  
例如 `luajava.bindClass("java.lang.String")` 返回 `String.class`。

jmethod luajava.bindMethod(jclass obj, string methodName, string signature)  
类似 `obj.getClass().getMethod(methodName, signature)`, 查找对象的指定方法。当 `methodName` 为 `new` 时，返回构造方法。  
例如 `luajava.bindMethod(obj, "toString", "String")` 返回 `Method` 对象。  
例如 `luajava.bindMethod(Math, "max", "int,int")` 返回 `Method` 对象。

object luajava.luaify(jobject obj)  
将 Java 对象完全转换为 Lua 对象。  
例如 `luajava.luaify(luajava.bindClass("java.lang.String").new("Hello"))` 返回一个 Lua 字符串对象。

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
