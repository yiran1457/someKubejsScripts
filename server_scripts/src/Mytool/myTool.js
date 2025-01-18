//priority:5000
/**
 * 获取结构的ResourceKey
 * @param {string} structureName  
 */
function structureKey(structureName) { return $ResourceKey.create($Registries.STRUCTURE, structureName) }
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
        enchantlist$[$Enchantment.byId(i).id] = i
    }
} catch (err) {
}

