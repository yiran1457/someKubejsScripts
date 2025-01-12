//ignored true
//使脚本不加载

const { $BasicItemJS$Builder } = require("packages/dev/latvian/mods/kubejs/item/custom/$BasicItemJS$Builder")

//你不准吃土豆！
ItemEvents.modification(e => {
    e.modify('minecraft:potato',item => {
        let ItemBuilder = new $BasicItemJS$Builder('')//其中可填字符串，但暂时不知道有什么用(但是不能不填)
        ItemBuilder.use((Level,Player,Hand) => false)//禁用使用/食用
        item.setItemBuilder(ItemBuilder)
    })
})