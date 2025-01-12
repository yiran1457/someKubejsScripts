//priority:1

const { $BasicItemJS$Builder } = require("packages/dev/latvian/mods/kubejs/item/custom/$BasicItemJS$Builder")




//物品注册
//===================================
let PotionTime = function (itemstack) {
    let count = 10, timecount = 0, levelcount = 0
    if (itemstack.nbt?.Effects != undefined) {
        itemstack.nbt.Effects.forEach(value => {
            timecount = timecount + value.time//计算时间总和(s)
            levelcount = levelcount + value.level//计算等级总和
        })
        //设置饮用时间
        count = (count + levelcount * 10 + timecount / 30) * Math.pow(1.1, itemstack.nbt.Effects.length - 1)
    }
    return count
}
global.PotionTime = PotionTime
//================================
StartupEvents.registry('item', event => {

    //注册50个占位的物品(无实际用处)
    let j
    for (let i = 0; i < 50; i++) {
        j = i.toString()
        event.create(j, "basic")
    }


    event.create('yi:technological_core').maxStackSize(16).rarity('yi')
    event.create('yi:structure_wand').unstackable().rarity('yi')
    event.create('yi:chest_wand').unstackable().rarity('yi')






    event.create('yi:random_potion')
        //不可堆叠
        .unstackable()
        //使用动画设置为drink
        .useAnimation('drink')
        //设置饮用时长
        .useDuration(itemstack => 20)
        //设置饮用冷却事件
        .use((level, player, hand) => {
            let CanDrink = false
            let itemstack = player.getItemInHand(hand)
            let DrinkTime = itemstack.nbt.getLong('DrinkTime')
            if (level.time - DrinkTime > PotionTime(itemstack)) { CanDrink = true }
            return CanDrink
        })
        .finishUsing((itemstack, level, entity) => {
            //检测是否有Effects存在，未检测nbt是否存在
            if (itemstack.nbt?.Effects != undefined) {
                itemstack.nbt.Effects.forEach(value => {
                    //给予buff
                    entity.potionEffects.add(value.potion, value.time * 20, value.level - 1, false, true)
                })
            }
            //获取随机药水效果
            itemstack.nbt.Effects = getRandomPotionList()
            itemstack.nbt.DrinkTime = level.time
            return itemstack
        })
        .color(() => Color.rgba(148, 52, 212, 0.42))


    event.create('yi:infinity_potion')
        .unstackable()
        .useAnimation('drink')
        .useDuration(itemstack => {
            let count = 10, timecount = 0, levelcount = 0
            if (itemstack.nbt?.Effects != undefined) {
                itemstack.nbt.Effects.forEach(value => {
                    timecount = timecount + value.time//计算时间总和(s)
                    levelcount = levelcount + value.level//计算等级总和
                })
                //设置饮用时间
                count = (count + levelcount * 10 + timecount / 30) * Math.pow(1.1, itemstack.nbt.Effects.length - 1)
            }
            return count
        })
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            if (itemstack.nbt?.Effects != undefined) {
                itemstack.nbt.Effects.forEach(value => {
                    //给予buff
                    entity.potionEffects.add(value.potion, value.time * 20, value.level - 1, false, true)
                })
            }
            return itemstack
        })




//=========================
})

//物品修改
ItemEvents.modification(e => {
    e.modify('minecraft:carrot', i => {
        let builder = new $BasicItemJS$Builder('')
        builder.finishUsing(
            (stack, Level,/**@type {Internal.Player}*/LivingEntity) => {
                if (LivingEntity.isCreative()) { return stack }
                if (stack.getEnchantments() != null) {
                    if (stack.getEnchantments().get('yi:infinity') != null) {
                        return stack
                    }
                }
                stack.shrink(1)
                return stack
            }
        )
        i.setItemBuilder(builder)
    })


    e.modify('create:minecart_contraption', item => {
        item.maxStackSize = 1
    })

})
