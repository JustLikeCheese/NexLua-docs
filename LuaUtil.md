# LuaUtil (com.nexlua.LuaUtil)

LuaUtil 是一个用于处理文件、资产、流和安全相关操作的工具类。它提供了多种方法来读取文件、复制文件、处理资产以及计算消息摘要等。
你可以通过 luajava.bindClass("com.nexlua.LuaUtil") 获取 LuaUtil 类的实例。

## Base

Context getContext()

# FileUtil

## Buffer

Buffer readFileBuffer(File file) throws IOException

## bytes[]

byte[] readFileBytes(File file) throws IOException

## String

String readFile(File file) throws IOException

## Base Utils

void rmDir(File file) throws IOException

void copyFile(File srcFile, File destFile) throws IOException

void copyDir(File srcDir, File destDir) throws IOException

# Assets Utils

AssetsManager getAssets()

String[] listAssets(Context context, String assetPath)

boolean isAssetExists(Context context, String assetPath)

Buffer readAssetBuffer(Context context, String assetPath) throws IOException

byte[] readAssetBytes(Context context, String assetPath) throws IOException

String readAsset(Context context, String assetPath) throws IOException

void copyAssetsDir(Context context, String assetPath, File destDir) throws IOException

void copyAssetsFile(Context context, String assetPath, File destFile) throws IOException

# Stream Utils

void copyStream(InputStream in, OutputStream out) throws IOException

# Zip Utils

void zip(File srcFile, File zipFile) throws IOException

void unzip(File zipFile, File destDir) throws IOException

# Secure Utils

String getMessageDigest(String message, String algorithm) throws NoSuchAlgorithmException

String getMessageDigest(byte[] bytes, String algorithm) throws NoSuchAlgorithmException;

String getMessageDigest(Buffer bytes, String algorithm) throws NoSuchAlgorithmException;

String getFileDigest(File file, String algorithm) throws IOException, NoSuchAlgorithmException

String getAssetDigest(Context context, String assetPath, String algorithm) throws IOException, NoSuchAlgorithmException

String getStreamDigest(InputStream in, String algorithm) throws IOException, NoSuchAlgorithmException
