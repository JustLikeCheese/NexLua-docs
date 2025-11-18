# LuaJava Metatable

## Conversion

### FULL

转换所有可以被转换成 Lua 对象的 Java 对象。包含 Map、Collection 和 Array。

### SEMI

只转换字面量类型：字符串、数字、布尔值和 nil。

### NONE

不转换任何 Java 对象。

## Java Code Type

| 类型 | 对应 Java 类型 | 解释 |
| - | - | - |
| V | Void | 空类型 |
| Z | Boolean | 布尔值类型 |
| C | Character | 字符类型 |
| B | Byte | 字节类型 |
| S | Short | 短整型类型 |
| I | Integer | 整型类型 |
| J | Long | 长整型类型 |
| F | Float | 单精度小数类型 |
| D | Double | 双精度小数类型 |
| L | Object | 对象类型 |

## Java Object

通常在 luajavaobj.c 内部中，使用 _JavaObject 类型，外部一般使用 JavaObject  (_JavaObject*) 类型，。

### jclassIndex

// 0=>null, 1=>field, 2=>method, 3=>get method, 4=>get method(first char to upper case), 5=>get method(first char to lower case)

JNI 传入 Java 类和属性名。Java 通过判断的方式，获取方法/字段类型并返回给 JNI。

| 类型 | 解释 | 返回给 JNI 的值 |
| - | - | - |
| 0 | 找不到方法/字段 | 报错的内容 |
| 1 | 找到符合的字段 | Field、字段值类型 |
| 2 | 找到符合的方法 | 无 |
| 3 | 找到 get 语法糖 | Method、返回值类型 |
| 4 | 找到 get 语法糖(首字母大写) | Method、返回值类型 |
| 5 | 找到 get 语法糖(首字母小写) | Method、返回值类型 |

若找不到方法/字段，NxLuaJava 会调用 lua_error 抛出错误。

### jclassNewindex

JNI 传入 Java 类、属性名和属性值。

| 类型 | 解释 | 返回给 JNI 的值 |
| - | - | - |
| 0 | 找不到方法/字段 | 报错的内容 |
| 1 | 找到符合的字段 | Field、字段值类型 |
| 2 | 找到符合的方法 | Method |
| 3 | 找到 get 语法糖 | Method、返回值类型 |
| 4 | 找到 get 语法糖(首字母大写) | Method、返回值类型 |
| 5 | 找到 get 语法糖(首字母小写) | Method、返回值类型 |

