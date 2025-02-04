//priority:1

const { $CollarTagItem } = require("packages/com/github/alexthe668/domesticationinnovation/server/item/$CollarTagItem")
const { $UUID } = require("packages/java/util/$UUID")
const { $HoeItem } = require("packages/net/minecraft/world/item/$HoeItem")
const { $Item } = require("packages/net/minecraft/world/item/$Item")
const { $SwordItem } = require("packages/net/minecraft/world/item/$SwordItem")



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

    event.create('yi:custom_alchemy')
    .unstackable()
    .use((l,p,h)=>{
        return h == 'main_hand' && !p.isCrouching()
    })
    .useAnimation('brush')
    .useDuration((i)=>{return 3*20})
    .finishUsing((i,l,p)=>{
        if(i.nbt?.Item == undefined)return i
        return global.alchemyRecipesHandle(i)
    })

    event.create('yi:sacred_and_demonic_mirror')
        .unstackable()
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .curioTick((i, c) => {
            })
        )
        .tag('curios:mirror')



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
    e.modify('minecraft:carrot', /**@param {$Item} i*/i => {
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


    //给予tetra FE的属性，实现效果写于server  ---tetra_energy.js
    e.modify(/tetra:modular_/, i => {
        i.attachCapability(CapabilityBuilder.ENERGY.customItemStack()
            .canReceive(i => true)
            .receiveEnergy((item, energycount, boolean) => {
                let energy = item.nbt.getInt('Energy')
                let maxenergy = item.nbt.getInt('MaxEnergy')
                let inenergy = Math.min(1000, energycount, maxenergy - energy)
                if (!boolean) {
                    item.nbt.putInt('Energy', energy + inenergy)
                }
                return inenergy
            })
            .getEnergyStored(item => item.nbt.getInt('Energy'))
            .getMaxEnergyStored(item => item.nbt.getInt('MaxEnergy'))
        )
    })
})
