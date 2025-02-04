//priority:888888

const $ClassFilter = Java.loadClass("dev.latvian.mods.kubejs.util.ClassFilter")

/**@type {$Class_<T>} */
let $Class = $ClassFilter.__javaObject__
let sm = $Class.classLoader.loadClass('dev.latvian.mods.kubejs.bindings.JavaWrapper').getDeclaredField('manager')
sm.setAccessible(true)
sm = sm.get(Java)
let mana = $Class.classLoader.loadClass('dev.latvian.mods.kubejs.script.ScriptManager').getDeclaredField('classFilter')
mana.setAccessible(true)
mana.set(sm, $ClassFilter())