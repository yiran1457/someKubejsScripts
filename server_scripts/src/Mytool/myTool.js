//priority:5000
/**
 * 获取结构的ResourceKey
 * @param {string} structureName  
 */
function structureKey(structureName) { return $ResourceKey.create($Registries.STRUCTURE, structureName) }
/**
 * @param {Special.DamageType} damageTypeName 
 */
function damageTypeKey(damageTypeName) { return $ResourceKey.create($Registries.DAMAGE_TYPE, damageTypeName) }
/**
 * 检测坐标是否在结构内，如果在则返回true
 * @param {$ServerLevel_} level 
 * @param {$BlockPos$MutableBlockPos_} pos 
 * @param {string} structureName 
 */
function simpleCheckPosInStructure(level, pos, structureName) {
    return !!level.structureManager().getStructureWithPieceAt(pos, structureKey(structureName)).getStructure()
}


function getRandomInt(Min, Max) { return Math.floor(Math.random() * (Max - Min + 1) + Min) }


/**
 * 检测物品是否能附魔上某附魔
 * @param {$ItemStack_} itemstack 
 * @param {string} enchantname 
 */
function checkItemCanEnchant(itemstack, enchantname) {
    return $Enchantment.byId(AllEnchantIDList[enchantname]).canEnchant(itemstack)
}

let AllEnchantIDList = {}
try {
    for (let i = 0; true; i++) {
        AllEnchantIDList[$Enchantment.byId(i).id] = i
    }
} catch (err) {}


let someEffectWithTick = {}
//在1tick内第一次调用返回true，之后返回false
function checkEffectWithTick(player, effectname) {
    if (someEffectWithTick[`${player.name}${effectname}`] != player.age) {
        someEffectWithTick[`${player.name}${effectname}`] = player.age
        return true
    } else {
        return false
    }
}
/**
 * 对实体造成无视无敌帧的伤害
 * @param {$LivingEntity_} source 
 * @param {$LivingEntity_} target 
 * @param {Special.DamageType} damagetype 
 * @param {number} amount
 */
function simpleAttackEntity(source, target, damagetype, amount){
    let defTime = target.invulnerableTime
    target.invulnerableTime = 0
    target.attack(target.damageSources().source(damageTypeKey(damagetype),source,null),amount)
    target.invulnerableTime = defTime
}