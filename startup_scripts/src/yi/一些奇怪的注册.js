//priority:100


const { $Rarity } = require("packages/net/minecraft/world/item/$Rarity")
const { $ModularItem } = require("packages/se/mickelus/tetra/items/modular/$ModularItem")
const { $ItemEffect } = require("packages/se/mickelus/tetra/effect/$ItemEffect");
const { $CapabilityRegistry } = require("packages/com/hollingsworth/arsnouveau/setup/registry/$CapabilityRegistry");
const { $DamageTypes } = require("packages/net/minecraft/world/damagesource/$DamageTypes");
const { $LivingHurtEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingHurtEvent");
const { $ItemAttributeModifierEvent } = require("packages/net/minecraftforge/event/$ItemAttributeModifierEvent");
const { $TickEvent$PlayerTickEvent } = require("packages/net/minecraftforge/event/$TickEvent$PlayerTickEvent");
const { $ItemStack } = require("packages/net/minecraft/world/item/$ItemStack");
const { $ForgeCapabilities } = require("packages/net/minecraftforge/common/capabilities/$ForgeCapabilities");
const { $ResourceLocation } = require("packages/net/minecraft/resources/$ResourceLocation");
const { $MenuType } = require("packages/net/minecraft/world/inventory/$MenuType");
const { $RenderGuiEvent$Pre } = require("packages/net/minecraftforge/client/event/$RenderGuiEvent$Pre");





$Rarity.create('test',"dark_red")
$Rarity.create('yi',"aqua")






//给予tetra FE的属性，实现效果写于server  ---tetra_energy.js
ItemEvents.modification(e => {
    e.modify(/tetra:modular_/,i => {
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


//已经移至server_scripts/src/yi/tetra/
if(false){

ForgeEvents.onEvent($LivingHurtEvent, event => {
    let attackplayer = event.getSource().getPlayer()
    let DamageType = event.getSource().getType()
    let target = event.getEntity()
    let heldStack = attackplayer.getMainHandItem()
    attackplayer.tell(`伤害类型:§e${event.source.getType()}   §r伤害量:§5${event.amount.toFixed(2)}`)
    //玩家攻击实体触发
    if ( heldStack.item instanceof $ModularItem && target.isLiving() ) {
        let level = 0
        if ( DamageType == 'player' ) {
            $CapabilityRegistry.getMana(attackplayer).ifPresent(/**@param {$IManaCap_}  mana*/mana => {
                //获取手持物品魔力附加等级
                level = heldStack.item.getEffectLevel(heldStack, $ItemEffect.get('yi:mana_addition'))
                if (level > 0) {
                    //判断魔力值是否大于20
                    if (mana.getCurrentMana() > 20) {
                        //扣除20点魔力
                        mana.addMana(-20)
                        //获取被攻击实体的默认无敌帧
                        let definvulnerableTime = target.invulnerableTime
                        //将无敌帧设置为0
                        target.invulnerableTime = 0
                        //试图添加来着玩家的法伤
                        target.attack(attackplayer.damageSources().source($DamageTypes.MAGIC, attackplayer), level)
                        //还原无敌帧
                        target.invulnerableTime = definvulnerableTime
                        //取消原伤害
                        //event.setCanceled(true)
                    }
                }
                //获取手持物品魔力汲取等级
                level = heldStack.item.getEffectLevel(heldStack, $ItemEffect.get('yi:mana_drain'))
                if (level > 0) {
                    attackplayer.tell(`mana回复:§e${(event.amount * level / 100).toFixed(2)}`)
                    mana.addMana(event.amount * level / 100)

                }
            })
            level = heldStack.item.getEffectLevel(heldStack, $ItemEffect.get('yi:energy_addition'))
            if ( level > 0 ){
                if (heldStack.nbt.Energy / heldStack.nbt.MaxEnergy > 0.7){
                    heldStack.nbt.Energy = heldStack.nbt.Energy - 500
                    let definvulnerableTime = target.invulnerableTime//获取被攻击实体的默认无敌帧
                    target.invulnerableTime = 0//将无敌帧设置为0
                    target.attack(target.damageSources().source($DamageTypes.LIGHTNING_BOLT, attackplayer), event.amount * level / 20)
                    target.invulnerableTime = definvulnerableTime//还原无敌帧
                }
            }
        }
        else if (DamageType == 'lightningBolt') {
            level = heldStack.item.getEffectLevel(heldStack, $ItemEffect.get('yi:energy_drain'))
            if (level > 0) {
                attackplayer.tell(`FE回复:§e${(event.amount * level).toFixed(2)}`)
                heldStack.nbt.Energy = Math.min(heldStack.nbt.Energy + event.amount * level , heldStack.nbt.MaxEnergy)
            }
        }
    }
})

}