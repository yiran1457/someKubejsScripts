//priority:999999

function require(/**@type {String}*/classpath) {
    let javaclass = classpath.split('/')//将字符串切分成数组
    javaclass.shift()//去除packages
    let classname = javaclass[ javaclass.length - 1 ]//获取类名
    javaclass[ javaclass.length - 1 ] = classname.substring(1)//将类前的多余$去除
    let newclasspath = javaclass.join('.')//将数组拼接回字符串
    let thisclass = {}
    thisclass[ classname ] = Java.loadClass( newclasspath )
    return thisclass
}