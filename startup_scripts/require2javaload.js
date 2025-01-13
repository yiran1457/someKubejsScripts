//priority:999999

function require(/**@type {String}*/classpath) {
    let javaclass = classpath.split('/').slice(1)//将字符串切分成数组并去除packages
    let classname = javaclass.pop()//获取类名
    let newclasspath = javaclass.concat(classname.substring(1)).join('.')//将数组拼接回字符串
    let thisclass = {}
    thisclass[ classname ] = Java.loadClass( newclasspath )
    return thisclass
}