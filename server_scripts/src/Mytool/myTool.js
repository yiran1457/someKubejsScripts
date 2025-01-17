//priority:5000
/**
 * 获取结构的ResourceKey
 * @param {string} structureName  
 */
let structureKey = (structureName) => $ResourceKey.create($Registries.STRUCTURE,structureName)
/**
 * 检测坐标是否在结构内，如果在则返回true
 * @param {$ServerLevel_} level 
 * @param {$BlockPos$MutableBlockPos_} pos 
 * @param {string} structureName 
 */
let simpleCheckPosInStructure = (level, pos, structureName) =>
    !!level.structureManager().getStructureWithPieceAt(pos,structureKey(strname)).getStructure()


