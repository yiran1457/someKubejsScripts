StartupEvents.registry('enchantment', e => {
    e.create('test')
})
KeyBindEvents.register(event => {
    event.create('ftb-item', 'key.ftb-item', GLFW.GLFW_KEY_I, 'key.category.common')
})


if (false)//删除按键
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
if (false)//隐藏按键
{
    let info = ''
    KeyBindUtil.getAllKeyName().forEach(text => {
        let name = text.slice(0, text.indexOf(":") - 1)
        let key = text.slice(text.indexOf(":") + 2)
        let category = Text.translatable(KeyBindUtil.findKeyMappingInAllKeyMapping(key).category).getString()
        info += `
    '${key}', //${category}--${name}`
    })
    console.log(info)
}


KeyBindEvents.modify(event => {
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

    event.addListener("jump", "key.jump")
})

let HideKeyList = [
    'key.hotbar.1', //物品栏--快捷栏1
    'key.hotbar.2', //物品栏--快捷栏2
    'key.hotbar.3', //物品栏--快捷栏3
    'key.hotbar.4', //物品栏--快捷栏4
    'key.hotbar.5', //物品栏--快捷栏5
    'key.hotbar.6', //物品栏--快捷栏6
    'key.hotbar.7', //物品栏--快捷栏7
    'key.hotbar.8', //物品栏--快捷栏8
    'key.hotbar.9', //物品栏--快捷栏9
    'key.attack', //游戏内容--攻击/摧毁
    'key.use', //游戏内容--使用物品/放置方块
    'key.forward', //移动--向前移动
    'key.left', //移动--向左移动
    'key.back', //移动--向后移动
    'key.right', //移动--向右移动
    'key.jei.showUses', //JEI（鼠标悬停）--显示物品用途
    'key.jei.showRecipe', //JEI（鼠标悬停）--显示物品配方
]
//在这里隐藏会使按键为默认状态,即不读取自己的配置
ClientEvents.init(e => {
    let newKeyMappings = []
    Client.options.keyMappings.forEach(key => {
        if (HideKeyList.indexOf(key.name) == -1)
            newKeyMappings.push(key)
    })
    Client.options.keyMappings = newKeyMappings
})