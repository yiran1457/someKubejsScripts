
/**
 * 更多工具类 一部分方法利用了1.20.1KubeJS的特性 1.21被修复
 * 无需前置工具类 反射mc的属性或者类时记得使用未映射的名字
 */

const $KubeJS = Java.loadClass("dev.latvian.mods.kubejs.KubeJS")
const $String = Java.loadClass("java.lang.String")
const $BufferedImage = Java.loadClass("java.awt.image.BufferedImage")

const MoreUtils = {
  //KubeJS被封禁的类 反射用
  classFilterPath: {
    File: "java.io.File",
    ImageIO: "javax.imageio.ImageIO",
    System: "java.lang.System",
    URI: "java.net.URI",
    URL: "java.net.URL"
  },
  //类加载器
  classLoader: $KubeJS.__javaObject__.getClassLoader(),
  /**
   * 根据类路径获取类对象
   * @param {String} path 类路径
   * @returns {any}
   */
  loadClass: function (path) {
    return this.classLoader.getLoadedClass(path)
  },
  /**
   * 反射属性(获取被封禁的类的共有属性)
   * @param {String} path 类路径
   * @param {String} field 字段名(要混淆前的字段名)
   * @returns {any} 属性值
   */
  getDeclaredField: function (path, field) {
    let objectClass = this.loadClass(path)
    let declaredField = objectClass.getDeclaredField(field)
    declaredField.setAccessible(true)
    return declaredField.get(objectClass)
  },
  /**
   * 反射属性(修改被封禁的类的共有属性)
   * @param {String} path 类路径
   * @param {String} field 字段名(要混淆前的字段名)
   * @param {any} newValue 新的属性值
   */
  setDeclaredField: function (path, field, newValue) {
    let objectClass = this.loadClass(path)
    let declaredField = objectClass.getDeclaredField(field)
    declaredField.setAccessible(true)
    declaredField.set(objectClass, newValue)
  },
  /**
   * 反射属性(获取私有属性)
   * @param {String} objectClass 对象实例
   * @param {String} field 字段名(要混淆前的字段名)
   * @returns {any} 属性值
   */
  getPrivateDeclaredField: function (objectClass, field) {
    let declaredField = objectClass.class.getDeclaredField(field)
    declaredField.setAccessible(true)
    return declaredField.get(objectClass)
  },
  /**
   * 反射属性(修改私有属性)
   * @param {String} objectClass 对象实例
   * @param {String} field 字段名(要混淆前的字段名)
   * @param {any} newValue 新的属性值
   */
  setPrivateDeclaredField: function (objectClass, field, newValue) {
    let declaredField = objectClass.class.getDeclaredField(field)
    declaredField.setAccessible(true)
    return declaredField.set(objectClass, newValue)
  },
  /**
   * 反射构造函数
   * @param {String} path 类路径
   * @param {Array | any} argsClass 参数Class数组
   * @param {Array | any} args 参数值数组
   * @returns {any} 构造函数构建的对象实例
   */
  getConstructor: function (path, argsClass, args) {
    let objectClass = this.loadClass(path)
    let constructor = argsClass !== undefined ? objectClass.getConstructor(argsClass) : objectClass.getConstructor()
    return argsClass !== undefined ? constructor.newInstance(args) : constructor.newInstance()
  },
  /**
   * 反射方法(适用于类被KubeJS封禁,方法为public的情况)
   * @param {String} path 类路径
   * @param {String} methodName 方法名
   * @param {Array | any} argsClass 参数Class数组
   * @param {Array | any} args 参数值数组
   * @returns {any} 方法的返回值当然也可能没有返回值
   */
  getMethod: function (path, methodName, argsClass, args) {
    let objectClass = this.loadClass(path)
    let method = argsClass !== undefined ? objectClass.getMethod(methodName, argsClass) : objectClass.getMethod(methodName)
    return argsClass !== undefined ? method.invoke(objectClass, args) : method.invoke(objectClass)
  },
  /**
   * 反射方法(适用于方法为private的情况)
   * @param {any} object 对象实例,由构造函数或者其他方式获取的对象实例而非Class对象
   * @param {String} methodName 方法名
   * @param {Array | any} argsClass 参数Class数组
   * @param {Array | any} args 参数值数组
   * @returns {any} 方法的返回值当然也可能没有返回值
   */
  getPrivateMethod: function (object, methodName, argsClass, args) {
    let method = argsClass !== undefined ? object.class.getMethod(methodName, argsClass) : object.class.getMethod(methodName)
    return argsClass !== undefined ? method.invoke(object, args) : method.invoke(object)
  },
  /**
   * 获取当前电脑的操作系统
   * @returns {String}
   */
  getSystemOs: function () {
    return this.getMethod(this.classFilterPath.System, "getProperty", $String, "os.name")
  },
  /**
   * 获取游戏根目录(未转码)
   * @returns {String} file:// 的路径
   */
  getGameDir: function () {
    let path = $KubeJS.getGameDirectory()
    let gameDir = "file://"
    path.forEach(p => {
      gameDir += `/${p}`
    })
    return gameDir
  },
  /**
   * 获取可操作图像的对象(BufferedImage)
   * @param {String} fileInfo 文件的信息 可以是file:// 也可以是 http:// 等
   * @returns {$BufferedImage}
   */
  getBufferedImage: function (fileInfo) {
    let $URL = this.loadClass(this.classFilterPath.URL)

    let uri = this.getConstructor(this.classFilterPath.URI, $String, fileInfo)
    let url = uri.toURL()
    return this.getMethod(this.classFilterPath.ImageIO, 'read', $URL, url)
  }
}
