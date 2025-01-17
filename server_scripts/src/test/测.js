const { $AttributeModifier } = require("packages/net/minecraft/world/entity/ai/attributes/$AttributeModifier")





let { ItemStack2Json , FluidStack2Json } = Recipes.function
let sequenced_assembly$序列 = function(ingredient,transitionalItem){
    this.json = {
        ingredient:ItemStack2Json(ingredient),
        transitionalItem:ItemStack2Json(transitionalItem||ingredient),
        sequence: [],
        type: "create:sequenced_assembly",
        loops: 3,
        results: []
    }
}
sequenced_assembly$序列.prototype = {
    energising$充能(energy) {
        this.json.sequence.push({
            "type": "create_new_age:energising",
            "energy_needed": energy,
            "ingredients": [this.json.transitionalItem],
            "results": [this.json.transitionalItem]
        })
        return this
    },
    deploying$安装(item, keep) {
        this.json.sequence.push({
            "type": "create:deploying",
            "ingredients": [
                this.json.transitionalItem,
                ItemStack2Json(item)
            ],
            "results": [this.json.transitionalItem],
            "keepHeldItem": keep || false
        })
        return this
    },
    cutting$切割() {
        this.json.sequence.push({
            "type": "create:cutting",
            "ingredients": [this.json.transitionalItem],
            "results": [this.json.transitionalItem]
        })
        return this
    },
    pressing$辊压(){
        this.json.sequence.push({
                "type": "create:pressing",
                "ingredients": [this.json.transitionalItem],
                "results": [this.json.transitionalItem]
        })
        return this
    },
    filling$注液(fluid) {
        this.json.sequence.push(
            {
                "type": "create:filling",
                "ingredients": [this.json.transitionalItem,
                    FluidStack2Json(fluid)
                ],
                "results": [this.json.transitionalItem]
            })
            return this
    },
    getjson() { return this.json },
    setLoops(time) {
        this.json.loops = time
        return this
    },
    addResults(Result, weight) {
        let item = ItemStack2Json(Result)
        item.chance = weight || 1
        this.json.results.push(item)
        return this
    },
    overBuilder(event) {
        event.custom(this.json)
    }
}




ServerEvents.recipes(e => {
    let x = new sequenced_assembly$序列(Item.of("touhou_little_maid:power_point",2,{display:{Lore:['{"color":"white","text":"what can i say ?"}']}}).weakNBT())
    .addResults(Item.of("yi:technological_core",11,{display:{Lore:['{"color":"white","text":"what can i say ?"}']}}))
    .energising$充能(5000)
    .deploying$安装(Item.of('acacia_door'),true)
    .filling$注液('64x minecraft:lava')
    x.overBuilder(e)


    
})







let tellSomeThings = (info)=>{
    console.log(info)
    Client.player.tell(info)
}

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
    }else{
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

ServerEvents.entityLootTables(e=>{
    let simpleAddLootItem2Entity = function(entityid,test){
        e.modifyEntity(entityid,l=>{
            l.addPool(p=>{
                p.addItem
            })
        })
    }
    e.modifyEntity('pig',loot=>{
        loot.addPool(pool=>{
            pool.addItem('diamond',10,{"min":2, "max":3})['killedByPlayer']().randomChanceWithLooting(0.01,0.1).survivesExplosion()
            pool.addItem('diamond',100,1).randomChanceWithLooting(0.01,10).survivesExplosion()
        })
    })
})

ServerEvents.tags('item',e=>{
    e.add('infinity:food',['moonstone:apple','apple'])
})

