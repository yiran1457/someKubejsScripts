StartupEvents.registry('enchantment',e=>{
    e.create('test')
})
KeyBindEvents.register(event=>{
    event.create('ftb-item','key.ftb-item',GLFW.GLFW_KEY_I,'key.category.common')
})


if (true)//删除按键
{
    let info = ''
    KeyBindUtil.getAllKeyName().forEach(text => {
        let name = text.slice(0, text.indexOf(":") - 1)
        let key = text.slice(text.indexOf(":") + 2)
        info += `
event.remove('${key}') //${name}`
    })
    console.log(info)
}
if (false)//修改默认按键
{
    let info = ''
    KeyBindUtil.getAllKeyName().forEach(text => {
        let name = text.slice(0, text.indexOf(":") - 1)
        let key = text.slice(text.indexOf(":") + 2)
        info += `
event.modifyKey('${key}',-1) //${name}`
    })
    console.log(info)
}


KeyBindEvents.modify(event=>{
    event.remove('key.socialInteractions') //社交屏幕
    event.remove('key.screenshot') //截图
    event.remove('key.smoothCamera') //切换电影视角
    event.remove('key.fullscreen') //切换全屏显示
    event.remove('key.spectatorOutlines') //高亮玩家（旁观者）
    event.remove('key.saveToolbarActivator') //保存快捷栏
    event.remove('key.loadToolbarActivator') //加载快捷栏
    event.remove('tetra.toolbelt.binding.access') //Quick access
    event.remove('tetra.toolbelt.binding.restock') //Restock toolbelt
    event.remove('tetra.toolbelt.binding.open') //打开工具带
    event.remove('tetra.toolbelt.binding.secondary_use') //Use secondary
    event.remove('key.jei.toggleCheatModeConfigButton') //切换作弊模式
    event.remove('keybinds.bettercombat.feint') //卖个破绽
    event.remove('key.modernui.openCenter') //打开操作中心

    event.addListener("jump","key.jump")
})
