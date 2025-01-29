const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack")

ItemEvents.firstRightClicked('yi:structure_wand', e => {
    let { player, item, hand } = e
    if (hand == 'off_hand') { return }//不检测副手
    if (player.isShiftKeyDown() && e.getTarget().block == undefined) {//检测玩家是否按下shift
        if (item.getOrCreateTag().Item == undefined) { item.nbt.Item = [] }//检测手持物品的nbt
        player.openMenu(new $SimpleMenuProvider((windowid, inventory, pla) => {
            let containerItem = []//初始化容器内物品
            let itemNbt = item.nbt.Item//获取物品存储Item
            for (let i = 0; i < 27; i++) {//添加物品，让数组元素为27
                if (itemNbt[i] == undefined) {
                    containerItem.push('air')
                } else {
                    containerItem.push(Item.of(itemNbt[i].getString('id'), itemNbt[i].getInt('Count'), itemNbt[i].getCompound('tag')))
                }
            }
            item.nbt.Item = []//清空物品存储Item
            let container = new $SimpleContainer(containerItem).asContainer()//构造容器
            return new $ChestMenu('minecraft:generic_9x3', 123654789, inventory, container, 3)
        }, `${item.displayName.getString()}`))
        player.swing()
    } else {
        /**@type {$ListTag_} */
        let ItemList = item.nbt.get('Item')
        /**@type {string} */
        let ItemString = ItemList.getAsString()
        tellSomeThings(ItemString.search(/id:"minecraft:damaged_anvil"/))
    }
})
PlayerEvents.chestClosed(e => {
    if (e.inventoryContainer.containerId != 123654789 || e.player.mainHandItem != 'yi:structure_wand') { return }//检测容器id与玩家手持物品
    e.inventoryContainer.items.toArray().forEach((value, index) => {
        if (index < 27) {
            e.player.mainHandItem.nbt.Item.push(value)
        }
    })
})


ItemEvents.firstRightClicked('yi:custom_alchemy', e => {
    let { player, item, hand } = e
    if (hand == 'off_hand') return //不检测副手
    if (player.isShiftKeyDown() && e.getTarget().block == undefined) {//检测玩家是否按下shift
        if (item.getOrCreateTag().Item == undefined) { item.nbt.Item = [] }//检测手持物品的nbt
        player.openMenu(new $SimpleMenuProvider((windowid, inventory, pla) => {
            let containerItem = []//初始化容器内物品
            let itemNbt = item.nbt.Item//获取物品存储Item
            for (let i = 0; i < 9; i++) {//添加物品，让数组元素为27
                if (itemNbt[i] == undefined) {
                    containerItem.push('air')
                } else {
                    if (itemNbt[i].tag == undefined)
                        containerItem.push(Item.of(itemNbt[i].getString('id')))
                    else
                        containerItem.push(Item.of(itemNbt[i].getString('id'), itemNbt[i].getCompound('tag')))
                }
            }
            item.nbt.Item = []//清空物品存储Item
            let container = new $SimpleContainer(containerItem).asContainer()//构造容器
            return new $ChestMenu('minecraft:generic_3x3', 127, inventory, container, 1)
        }, `${item.displayName.getString()}`))
        player.swing()
    }
})
PlayerEvents.chestClosed(e => {
    if (e.inventoryContainer.containerId != 127 || e.player.mainHandItem != 'yi:custom_alchemy') return //检测容器id与玩家手持物品
    e.inventoryContainer.items.toArray().forEach((/**@type {$ItemStack}*/value, index) => {
        if (index < 9) {
            if (value.count > 1) {
                value.count--
                e.player.addItem(value)
                value.setCount(1)
            }
            e.player.mainHandItem.nbt.Item.push(value)
        }
    })
})
global.alchemyRecipes = [
]
global.alchemyRecipesHandle = i => {
    let containerItem = []//初始化容器内物品
    let itemNbt = item.nbt.Item//获取物品存储Item
    for (let i = 0; i < 9; i++) {//添加物品，让数组元素为27
        if (itemNbt[i] == undefined) {
            containerItem.push('air')
        } else {
            if (itemNbt[i].tag == undefined)
                containerItem.push(Item.of(itemNbt[i].getString('id')))
            else
                containerItem.push(Item.of(itemNbt[i].getString('id'), itemNbt[i].getCompound('tag')))
        }
    }
}
let weakNBT = (target, origin) => {
    for (let key in origin) {
        if (typeof origin[key] != typeof target[key]) return false
        switch (true) {
            case origin[key] instanceof Array:
                if (!target[key] instanceof Array)
                    return false
                /**@type {Array} */
                let originlist = origin[key].sort()
                /**@type {Array} */
                let targetlist = target[key].sort()
                if (targetlist.length == 0 && originlist.length != 0) return false
                for (let originindex = 0; originindex < originlist.length; originindex++) {
                    let originvalue = originlist[originindex]
                    for (let targetindex = 0; targetindex < targetlist.length; targetindex++) {
                        let targetvalue = targetlist[targetindex]
                        let pass = false
                        switch (true) {
                            case originvalue instanceof Object:
                                if (weakNBT(targetvalue, originvalue))
                                    pass = true
                                break
                            case originvalue == targetvalue:
                                pass = true
                        }
                        if (targetlist.length - targetindex < originlist.length - originindex) {
                            return false
                        }
                        if (pass) {
                            targetlist.slice(0, targetindex + 1)
                            break
                        }
                        if(targetlist.length - targetindex==1)
                            return false
                    }
                }
                break
            case origin[key] instanceof Object:
                if (!weakNBT(target[key], origin[key]))
                    return false
                break
            default:
                if (origin[key] != target[key]) return false
        }
    }
    return true
}
//true
Client.tell(weakNBT({a: 1, b: 2},{b: 2}))
//true
Client.tell(weakNBT({x:[1,2,3,4,1,2]},{x:[1,1,2,2]}))
//true
Client.tell(weakNBT({x:[{a:1,b:2},{a:1}]},{x:[{b:2}]}))
//false
Client.tell(weakNBT({x:[{a:1,b:2},{a:1}]},{x:[{b:2,a:5}]}))
//false
Client.tell(weakNBT({x:[1,54,1],u:'test'},{u:'yyy'}))