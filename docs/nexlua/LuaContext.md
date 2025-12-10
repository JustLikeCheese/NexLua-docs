# LuaContext

`LuaContext` 是 NexLua 提供的接口，用于管理和操作 Lua 环境。以下是该接口的主要 API：

## 获取类加载器与 Lua 实例

```java
ArrayList<ClassLoader> getClassLoaders();
Lua getLua();
```

- `getClassLoaders()`：返回一个包含类加载器的列表。
- `getLua()`：获取 Lua 实例。

## 获取 Lua 配置与路径

```java
LuaConfig getConfig();
String getLuaDir();
String getLuaPath();
String getLuaLpath();
String getLuaCpath();
```

- `getConfig()`：获取 Lua 配置。
- `getLuaDir()`、`getLuaPath()`、`getLuaLpath()`、`getLuaCpath()`：分别获取 Lua 的目录和路径信息。

## 上下文与消息处理

```java
Context getContext();
void showToast(String message);
void sendMessage(String message);
void sendError(Exception e);
```

- `getContext()`：获取上下文对象。
- `showToast(String message)`：显示提示信息。
- `sendMessage(String message)`：发送消息。
- `sendError(Exception e)`：处理异常错误。

## 执行 Lua 函数

```java
default boolean runFunc(String funcName, Object... args) {
    return LuaContextUtils.runFunc(getLua(), funcName, args);
}

default Object runFunc(String funcName, Class<?> clazz, Object... args) {
    return LuaContextUtils.runFunc(getLua(), funcName, clazz, args);
}
```

- `runFunc(String funcName, Object... args)`：执行指定名称的 Lua 函数，返回布尔值结果。
- `runFunc(String funcName, Class<?> clazz, Object... args)`：执行指定名称的 Lua 函数，并指定返回值类型。

# LuaApplication

在 LuaApplication 的环境中有以下全局变量，`application`, `app`, `context`, `this`，这些变量都指向 LuaApplication 对象。

LuaApplication 支持以下生命周期函数：`onCreate`, `onTerminate`, `onLowMemory`, `onTrimMemory` 和 `onConfigurationChanged`。

支持以下生命周期函数：

`main`
`onCreate()`
`onTerminate()`
`onLowMemory()`
`onTrimMemory()`
`onConfigurationChanged()`
`sendMessage()`
`sendError()`

# LuaActivity

在 LuaActivity 的环境中有以下全局变量，`activity`, `this`, `context`，这些变量都指向 LuaActivity 对象。还有 `application`, `app` 指向 LuaApplication 对象。

支持以下生命周期函数：

`main`
`onCreate()`
`onStart()`
`onResume()`
`onPause()`
`onStop()`
`onDestroy()`
`onRestart()`
`onSaveInstanceState()`
`onRestoreInstanceState()`
`onConfigurationChanged()`
`onNewIntent()`
`onRequestPermissionsResult()`
`onActivityResult()`
`onContentChanged()`
`onCreateOptionsMenu()`
`onOptionsItemSelected()`
`onMenuItemSelected()`
`onCreateContextMenu()`
`onContextItemSelected()`
`onKeyShortcut()`
`onKeyDown()`
`onKeyUp()`
`onKeyLongPress()`
`onTouchEvent()`
`onReceive()`
`sendMessage()`
`sendError()`

你可以在 Lua 中创建个全局的函数，当上述生命周期函数触发时会调用 Lua 中的全局函数。

若有遗漏欢迎向仓库提交 Issues 或 Pull Request。
