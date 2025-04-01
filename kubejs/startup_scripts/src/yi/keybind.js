
KeyBindEvents.register(event => {
  event.create('ftb-item', 'key.ftb-item', GLFW.GLFW_KEY_I, 'key.category.common')
  event.create('openDebugScreen', 'key.debugScreen', GLFW.GLFW_KEY_V, 'key.category.common')
})
/**
 * 
 * @param {"remove"|"modifyKey"|"addHideKey"} k 
 * @param {number} v 
 */
function consoleKeyInfo(k, v) {

  let info = ''
  KeyBindUtil.getAllKeyName().forEach(text => {
    let name = text.slice(0, text.indexOf(":") - 1)
    let key = text.slice(text.indexOf(":") + 2)
    let category = Text.translatable(KeyBindUtil.findKeyMappingInAllKeyMapping(key).category).getString()

    info += `
  event.${k}('${key}'${v ? ',' + v : ''}) //${category}--${name}`

  })
  console.log(info)
}
consoleKeyInfo("remove")


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
  event.remove('key.modernui.zoom') //Modern UI--缩放
  event.remove('iris.keybind.reload') //Oculus--重新加载光影包
  event.remove('iris.keybind.toggleShaders') //Oculus--启用/禁用光影
  event.remove('iris.keybind.shaderPackSelection') //Oculus--光影包选择界面
  event.remove('key.jade.show_recipes') //Jade--显示配方
  event.remove('key.jade.show_uses') //Jade--显示用途
  event.remove('key.jade.narrate') //Jade--语音复述

  event.addHideKey('key.hotbar.1') //物品栏--快捷栏1
  event.addHideKey('key.hotbar.2') //物品栏--快捷栏2
  event.addHideKey('key.hotbar.3') //物品栏--快捷栏3
  event.addHideKey('key.hotbar.4') //物品栏--快捷栏4
  event.addHideKey('key.hotbar.5') //物品栏--快捷栏5
  event.addHideKey('key.hotbar.6') //物品栏--快捷栏6
  event.addHideKey('key.hotbar.7') //物品栏--快捷栏7
  event.addHideKey('key.hotbar.8') //物品栏--快捷栏8
  event.addHideKey('key.hotbar.9') //物品栏--快捷栏9
  event.addHideKey('key.attack') //游戏内容--攻击/摧毁
  event.addHideKey('key.use') //游戏内容--使用物品/放置方块
  event.addHideKey('key.forward') //移动--向前移动
  event.addHideKey('key.left') //移动--向左移动
  event.addHideKey('key.back') //移动--向后移动
  event.addHideKey('key.right') //移动--向右移动
  event.addHideKey('key.playerlist') //多人游戏--显示玩家列表
  event.addHideKey('key.pickItem') //游戏内容--选取方块
  event.addHideKey('key.modernfix.config') //现代化修复--打开配置屏幕
  event.addHideKey('key.jade.show_details') //Jade--显示细节

  //因为有emi，jei的就不需要了
  event.remove('key.jei.showUses') //JEI（鼠标悬停）--显示物品用途
  event.remove('key.jei.showRecipe') //JEI（鼠标悬停）--显示物品配方
  event.remove('key.jei.showUses2') //JEI（鼠标悬停）--显示物品用途
  event.remove('key.jei.previousPage') //JEI（悬浮界面）--上一页
  event.remove('key.jei.cheatItemStack') //JEI（作弊模式）--作弊获得 1 组
  event.remove('key.jei.showRecipe2') //JEI（鼠标悬停）--显示物品配方
  event.remove('key.jei.recipeBack') //JEI（配方）--上一个配方
  event.remove('key.jei.transferRecipeBookmark') //JEI（鼠标悬停）--合成书签合成表 (一次)
  event.remove('key.jei.cheatOneItem') //JEI（作弊模式）--作弊获得 1 个物品
  event.remove('key.jei.bookmark') //JEI（鼠标悬停）--添加/删除书签
  event.remove('key.jei.toggleWildcardHideIngredient') //JEI（编辑模式）--隐藏原料（通配符）
  event.remove('key.jei.toggleOverlay') //JEI（悬浮界面）--显示/隐藏 JEI 悬浮界面
  event.remove('key.jei.toggleCheatMode') //JEI（作弊模式）--切换作弊模式
  event.remove('key.jei.cheatOneItem2') //JEI（作弊模式）--作弊获得 1 个物品
  event.remove('key.jei.nextPage') //JEI（悬浮界面）--下一页
  event.remove('key.jei.previousRecipePage') //JEI（配方）--上一页配方
  event.remove('key.jei.maxTransferRecipeBookmark') //JEI（鼠标悬停）--合成书签合成表 (最大数量)
  event.remove('key.jei.previousSearch') //JEI（搜索过滤器）--上一个搜索
  event.remove('key.jei.copy.recipe.id') //JEI（开发者工具）--复制配方 ID 到剪贴板
  event.remove('key.jei.previousCategory') //JEI（配方）--上一分类
  event.remove('key.jei.nextCategory') //JEI（配方）--下一分类
  event.remove('key.jei.cheatItemStack2') //JEI（作弊模式）--作弊获得 1 组
  event.remove('key.jei.focusSearch') //JEI（悬浮界面）--高亮搜索框
  event.remove('key.jei.nextRecipePage') //JEI（配方）--下一页配方
  event.remove('key.jei.closeRecipeGui') //JEI（配方）--关闭配方界面
  event.remove('key.jei.clearSearchBar') //JEI（搜索过滤器）--清除搜索过滤器
  event.remove('key.jei.toggleEditMode') //JEI（编辑模式）--编辑模式开关
  event.remove('key.jei.toggleBookmarkOverlay') //JEI（悬浮界面）--显示/隐藏加入书签的物品
  event.remove('key.jei.toggleHideIngredient') //JEI（编辑模式）--隐藏原料
  event.remove('key.jei.nextSearch') //JEI（搜索过滤器）--下一个搜索

})