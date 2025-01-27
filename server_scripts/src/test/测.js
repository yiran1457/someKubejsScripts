


let { ItemStack2Json, FluidStack2Json } = Recipes.function
let sequenced_assembly$序列 = function (ingredient, transitionalItem) {
    this.json = {
        ingredient: ItemStack2Json(ingredient),
        transitionalItem: ItemStack2Json(transitionalItem || ingredient),
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
    pressing$辊压() {
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
    let x = new sequenced_assembly$序列(Item.of("touhou_little_maid:power_point", 2, { display: { Lore: ['{"color":"white","text":"what can i say ?"}'] } }).weakNBT())
        .addResults(Item.of("yi:technological_core", 11, { display: { Lore: ['{"color":"white","text":"what can i say ?"}'] } }))
        //.energising$充能(5000)
        .deploying$安装(Item.of('minecraft:diamond_chestplate', '{Damage:0}').weakNBT(), true)
        .filling$注液('64x minecraft:lava')
    x.overBuilder(e)


})






let tellSomeThings = (info) => {
    console.log(info)
    Client.player.tell(info)
}



BlockEvents.broken('create:lectern_controller', e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
BlockEvents.rightClicked('create:lectern_controller', e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
BlockEvents.leftClicked('create:lectern_controller', e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
ItemEvents.firstLeftClicked(e => {
    e.player.randomTeleport(1,1,1,false)
})


MoreJSEvents.enchantmentTableIsEnchantable(e=>{
    e.player.tell(e.get(0).requiredLevel=5)
})