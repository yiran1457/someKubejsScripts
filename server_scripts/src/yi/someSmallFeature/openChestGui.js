
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