# LuaUtil

`com.nexlua.LuaUtil` 提供了 Android 开发中常用的 IO、资源、压缩及哈希工具方法。

::: tip 初始化
一般 `LuaApplication` 会在 `onCreate` 自动调用 `LuaUtil.init`，开发者通常无需手动调用。
:::

## 核心环境 (Context & Init)

```java
// 初始化工具类
public static void init(Context ctx)

// 获取全局 Application Context
public static Context getContext()

// 获取全局 AssetManager
public static AssetManager getAssetManager()
```

## 缓冲区辅助 (Buffer)

```java
// 将 byte[] 包装为 DirectByteBuffer (NIO)
public static ByteBuffer wrap(byte[] bytes)
```

## 流操作 (Stream Utils)

包含基础流操作和自动关闭流（AutoClose）的变体。

### 基础流操作 (需手动关闭流)

```java
// 读取流的所有字节
public static byte[] readStreamBytes(InputStream in) throws IOException

// 读取流到指定大小的 ByteBuffer
// 如果流的内容超过 knownSize，会抛出 IOException
public static ByteBuffer readStreamBuffer(InputStream in, int knownSize) throws IOException

// 将输入流复制到输出流
public static void copyStream(InputStream in, OutputStream out) throws IOException
```

### 自动关闭流操作

以下方法在执行完毕或发生异常时会自动关闭传入的 `InputStream` 或 `OutputStream`。

```java
// 读取流并自动关闭
public static byte[] readStreamBytesWithAutoClose(InputStream in) throws IOException

// 读取流到 ByteBuffer 并自动关闭
public static ByteBuffer readStreamBufferWithAutoClose(InputStream in, int knownSize) throws IOException

// 复制流并自动关闭输入和输出流
public static void copyStreamWithAutoClose(InputStream in, OutputStream out) throws IOException
```

## 文件操作 (File Utils)

```java
// 读取文件到 ByteBuffer
public static ByteBuffer readFileBuffer(File file) throws IOException

// 读取文件所有字节
public static byte[] readFileBytes(File file) throws IOException

// 读取文件为字符串 (UTF-8)
public static String readFile(File file) throws IOException

// 删除文件
public static boolean rmFile(File file)

// 递归删除文件夹及其内容
public static boolean rmDir(File file)

// 复制文件
public static void copyFile(File src, File dest) throws IOException

// 递归复制文件夹
public static void copyDir(File srcDir, File destDir) throws IOException
```

## Assets 资源操作

```java
// 列出 assets 目录下的文件
public static String[] listAssets(String assetPath) throws IOException

// 判断 assets 文件是否存在
public static boolean isAssetExists(String assetPath)

// 读取 assets 文件到 ByteBuffer (尝试使用 mmap，失败则降级为流读取)
public static ByteBuffer readAssetBuffer(String assetPath) throws IOException

// 读取 assets 文件所有字节
public static byte[] readAssetBytes(String assetPath) throws IOException

// 读取 assets 文件为字符串 (UTF-8)
public static String readAsset(String assetPath) throws IOException

// 将 assets 文件复制到本地文件
public static void copyAssetsFile(String assetPath, File destFile) throws IOException

// 递归复制 assets 目录到本地目录
public static void copyAssetsDir(String assetPath, File destDir) throws IOException
```

## Raw 资源操作 (res/raw)

```java
// 读取 Raw 资源到 ByteBuffer
public static ByteBuffer readRawBuffer(int id) throws IOException

// 读取 Raw 资源所有字节
public static byte[] readRawBytes(int id) throws IOException

// 读取 Raw 资源为字符串 (UTF-8)
public static String readRaw(int id) throws IOException

// 将 Raw 资源复制到本地文件
public static void copyRawFile(int id, File destFile) throws IOException
```

## 压缩与解压 (Zip Utils)

```java
// 压缩文件或文件夹到指定 zip 文件
public static void zip(File srcFile, File zipFile) throws IOException

// 递归压缩内部逻辑方法 (通常供 zip 调用，但也为 public)
public static void zipInternal(ZipOutputStream zipOutputStream, File file, String baseName) throws IOException

// 解压 zip 文件到指定目录 (防止 Zip Slip 漏洞)
public static void unzip(File zipFile, File destDir) throws IOException
```

## 哈希摘要 (Digest Utils)

支持计算 MD5, SHA-1, SHA-256 等摘要。

```java
// 计算字符串摘要
public static String getMessageDigest(String message, String algorithm) throws NoSuchAlgorithmException

// 计算字节数组摘要
public static String getMessageDigest(byte[] bytes, String algorithm) throws NoSuchAlgorithmException

// 计算 ByteBuffer 摘要
public static String getMessageDigest(ByteBuffer buffer, String algorithm) throws NoSuchAlgorithmException

// 计算文件摘要
public static String getFileDigest(File file, String algorithm) throws IOException, NoSuchAlgorithmException

// 计算 Assets 文件摘要
public static String getAssetDigest(String assetPath, String algorithm) throws IOException, NoSuchAlgorithmException

// 计算 Raw 资源摘要
public static String getRawDigest(int id, String algorithm) throws IOException, NoSuchAlgorithmException

// 计算流摘要 (需手动关闭流)
public static String getStreamDigest(InputStream in, String algorithm) throws IOException, NoSuchAlgorithmException

// 计算流摘要并自动关闭流
public static String getStreamDigestWithAutoClose(InputStream in, String algorithm) throws IOException, NoSuchAlgorithmException
```

## 路径工具 (Path Utils)

```java
// 获取路径的父目录，如果父目录为空则返回 "/"
public static String getParentPath(String path)
```