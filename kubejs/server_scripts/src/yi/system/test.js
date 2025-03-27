
const { $MyTetraUtil } = require("packages/net/yiran/tetra_addition/$MyTetraUtil")
const { $WorkbenchTileCraftEvent } = require("packages/net/yiran/tetra_addition/$WorkbenchTileCraftEvent")
const { $ConfigSchematic } = require("packages/se/mickelus/tetra/module/schematic/$ConfigSchematic")

//存储路径
let path = "kubejs/server_scripts/src/yi/system/"
//存储文件名称
let MaterialItemLickFile = "MaterialItemLickJson.json"

// 是否自动写入文件
let writeMode = true
let MaterialItemLickJson = Utils.lazy(() => {
  return JsonIO.read(path + MaterialItemLickFile) || Utils.newMap()
})


NativeEvents.onEvent($WorkbenchTileCraftEvent, event => {
  let { player, level, currentSchematic, currentSlot, targetStack, upgradedStack, materials } = event
  //防止单人的时候client侧搞事情
  if (level.clientSide) return
  if (currentSchematic instanceof $ConfigSchematic && isReplace(targetStack, currentSlot, currentSchematic)) {
    let upgradedModuleMaterial = getModuleMaterial(upgradedStack, currentSlot)
    let targetModuleMaterial = getModuleMaterial(targetStack, currentSlot)
    let materialItem = materials[0].id

    //检测是否存在对应物品,不存在则写入
    if (writeMode && !MaterialItemLickJson.get().get(upgradedModuleMaterial)) {
      MaterialItemLickJson.get().put(upgradedModuleMaterial, materialItem)
      JsonIO.write(path + MaterialItemLickFile, MaterialItemLickJson.get())
    }

    //返还原材料
    player.give(
      Item.of(
        MaterialItemLickJson.get().getOrDefault(targetModuleMaterial, 'air'),
        getMaterialCount(targetStack, currentSlot))
    )

  }
})


/**
 * 获取ModuleKey
 * @param {$ItemStack_} item 
 * @param {String} slot 
 * @returns {String}
 */
function getModuleKey(item, slot) {
  return item.nbt.getString(slot)
}
/**
 * 获取材料消耗的数量
 * @param {$ItemStack_} item 
 * @param {String} slot 
 * @returns {number}
 */
function getMaterialCount(item, slot) {
  let schematic = moduleKey2Schematic.get().get(getModuleKey(item, slot))
  if (!schematic) return 1
  return schematic.definition.outcomes[0].material.count
}

/**
 * 获取ModuleMaterial
 * @param {$ItemStack_} item 
 * @param {String} slot 
 * @returns {String}
 */
function getModuleMaterial(item, slot) {
  return item.nbt.getString(getModuleKey(item, slot) + '_material').split("/")[1]
}
function isReplace(item, slot, Schematic) {
  return moduleKey2Schematic.get().get(getModuleKey(item, slot)) == Schematic
}


let moduleKey2Schematic = Utils.lazy(() => {
  /**
   * @type {$HashMap_<String, $ConfigSchematic>}
   */
  let map = Utils.newMap()
  $MyTetraUtil.getSchematic().forEach((/**@type {$ResourceLocation_}*/k,/**@type {$UpgradeSchematic_}*/v) => {
    if (v instanceof $ConfigSchematic && !v.isHoning()) {
      let moduleKey = v.definition.outcomes[0].moduleKey
      if (moduleKey) {
        map.put(moduleKey, v)
      }
    }
  })
  return map
})