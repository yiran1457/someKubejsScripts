//priority:5000


//=======================================
// 初始化部分工具所需变量
//=======================================
let AllEnchantIDList = {}
try {
    for (let i = 0; true; i++) {
        AllEnchantIDList[$Enchantment.byId(i).id] = i
    }
} catch (err) { }

let someEffectWithTick = {}
//=======================================
// 特化部分ResourceKey的获取
//=======================================
/**
 * 获取结构的ResourceKey
 * @param {Special.WorldgenStructure} structureName  
 */
function structureKey(structureName) { return $ResourceKey.create($Registries.STRUCTURE, structureName) }
structureKey('minecraftde')
/**
 * 获取伤害类型的ResourceKey
 * @param {Special.DamageType} damageTypeName 
 */
function damageTypeKey(damageTypeName) { return $ResourceKey.create($Registries.DAMAGE_TYPE, damageTypeName) }
//=======================================
// 对部分检查操作的简化
//=======================================
/**
 * 检测物品是否能附魔上某附魔
 * @param {$ItemStack_} itemstack 
 * @param {string} enchantname 
 * @returns {boolean}
 */
function checkItemCanEnchant(itemstack, enchantname) {
    return $Enchantment.byId(AllEnchantIDList[enchantname]).canEnchant(itemstack)
}
/**
 * 在1tick内第一次调用返回true，之后返回false
 * @param {$Player_} player 
 * @param {string} specialName 
 * @returns  {boolean}
 */
function checkEffectWithTick(player, specialName) {
    if (someEffectWithTick[`${player.username}${specialName}`] != player.age) {
        someEffectWithTick[`${player.username}${specialName}`] = player.age
        return true
    } else {
        return false
    }
}
/**
 * 检测坐标是否在结构内，如果在则返回true
 * @param {$ServerLevel_} level 
 * @param {$BlockPos$MutableBlockPos_} pos 
 * @param {Special.WorldgenStructure} structureName 
 * @returns {boolean}
 */
function simpleCheckPosInStructure(level, pos, structureName) {
    return !!level.structureManager().getStructureWithPieceAt(pos, structureKey(structureName)).getStructure()
}
//=======================================
// 部分数学方法封装
//=======================================
/**
 * 获取一个在指定范围内的随机整数
 * @param {number} Min 
 * @param {number} Max 
 * @returns {number}
 */
function getRandomInt(Min, Max) {
    return Math.floor(Math.random() * (Max - Min + 1) + Min)
}
//=======================================
// 对部分Cap操作的简化
//=======================================
/**
 * 简单操作实体的ArsManaCap
 * @param {$player_} player 
 * @param {(mana:$IManaCap_)} callback 
 */
function simple_AM_Cap(player, callback) {
    $CapabilityRegistry.getMana(player).ifPresent(callback)
}
/**
 * 简单获取实体的CurrentMana(现有魔力)
 * @param {$player_} player 
 * @returns {number}
 */
function simple_AM_Cap$CM(player) {
    let CurrentMana = 0
    $CapabilityRegistry.getMana(player).ifPresent(/**@param {$IManaCap_}  mana*/mana => { CurrentMana = mana.getCurrentMana() })
    return CurrentMana
}
/**
 * 简单操作物品的ForgeEnergyCap
 * @param {$ItemStack_} itemstack 
 * @param {(energy:$IEnergyStorage_)} callback 
 */
function simple_FE_Cap(itemstack, callback) {
    itemstack.getCapability(ForgeCapabilities.ENERGY).ifPresent(callback)
}
/**
 * 简单获取物品的EnergyStored(当前能量)
 * @param {$ItemStack_} itemstack 
 * @returns {number}
 */
function simple_FE_Cap$ES(itemstack) {
    let EnergyStored = 0
    itemstack.getCapability(ForgeCapabilities.ENERGY).ifPresent(energy => { EnergyStored = energy.getEnergyStored() })
    return EnergyStored
}
/**
 * 简单获取物品的MaxEnergyStored(最大能量)
 * @param {$ItemStack_} itemstack 
 * @param {(energy:$IEnergyStorage_)} callback 
 */
function simple_FE_Cap$MES(itemstack) {
    let MaxEnergyStored = 0
    itemstack.getCapability(ForgeCapabilities.ENERGY).ifPresent(energy => { MaxEnergyStored = energy.getMaxEnergyStored() })
    return MaxEnergyStored
}


//=======================================
// 一部分杂七杂八的小工具
//=======================================

/**
 * 简单获取tetra的Effect等级
 * @param {$ItemStack_} itemstack 
 * @param {string} effectname 
 * @returns {number}
 */
function simpleGetTetraEffectLevel(itemstack, effectname) {
    return itemstack.item.getEffectLevel(itemstack, $ItemEffect.get(effectname))
}

/**
 * 对实体造成无视无敌帧的伤害
 * @param {$LivingEntity_} source 
 * @param {$LivingEntity_} target 
 * @param {Special.DamageType} damagetype 
 * @param {number} amount
 */
function simpleAttackEntity(source, target, damagetype, amount) {
    let defTime = target.invulnerableTime
    target.invulnerableTime = 0
    target.attack(target.damageSources().source(damageTypeKey(damagetype), source, null), amount)
    target.invulnerableTime = defTime
}

/**
 * 计算对圣洁的影响
 * @param {$Player_} player 
 * @returns {number}
 */
function simpleGetHolyEffect(player) {
    let Effect = 1 * (1 + player.persistentData.getDouble('Angel') / 100)
    if (!player.persistentData.getBoolean('FallenAngel')) Effect *= 1 - player.persistentData.getDouble('Devil') / 50
    if (Effect < 0) Effect = 0
    return Effect
}
/**
 * 计算对邪恶的影响
 * @param {$Player_} player 
 * @returns {number}
 */
function simpleGetEvilEffect(player) {
    let Effect = 1 * (1 + player.persistentData.getDouble('Devil') / 100)
    if (!player.persistentData.getBoolean('FallenAngel')) Effect *= 1 - player.persistentData.getDouble('Angel') / 50
    if (Effect < 0) Effect = 0
    return Effect
}
/**
 * 计算对混沌的影响
 * @param {$Player_} player 
 * @returns {number}
 */
function simpleGetChaosEffect(player) {
    let Effect = 1
    let Angel = player.persistentData.getDouble('Angel')
    let Devil = player.persistentData.getDouble('Devil')
    let abs = Math.abs(Angel - Devil)
    Effect *= 1 + (Angel + Devil - 2 * abs) / 20
    return Effect
}