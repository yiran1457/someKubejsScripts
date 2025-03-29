const { $ItemEntity } = require("packages/net/minecraft/world/entity/item/$ItemEntity")

ServerEvents.recipes(e=>{
  e.remove({id:/refinedstorage:coloring_recipes/})
})


EntityEvents.spawned(e=>{
  if(e.entity instanceof $ItemEntity){
    e.entity.setItem(Item.of("minecraft:diamond"))
  } 
})

const { $Registries } = require("packages/net/minecraft/core/registries/$Registries")

if (global.Item_Link_CREATIVE_MODE_TAB === undefined) {
  let hashMap = Utils.newMap()

  Utils.getServer().registryAccess().registryOrThrow($Registries.CREATIVE_MODE_TAB).forEach(/**@param {$CreativeModeTab} c*/c => {
      let CREATIVE_MODE_TAB_ID = Utils.getServer().registryAccess().registryOrThrow($Registries.CREATIVE_MODE_TAB).getKey(c)
      c.getDisplayItems().forEach(i => {
          if (hashMap.get(i.id) === null) {
              hashMap.put(i.id, [CREATIVE_MODE_TAB_ID])
          } else if (hashMap.get(i.id).indexOf(CREATIVE_MODE_TAB_ID) == -1) {
              hashMap.get(i.id).push(CREATIVE_MODE_TAB_ID)
          }
      })
  })
  global.Item_Link_CREATIVE_MODE_TAB = hashMap
}

console.log('钻石所在的创造物品栏',global.Item_Link_CREATIVE_MODE_TAB.get('create:brown_toolbox'))
console.log('refinedstorage:pink_creative_controller所在的创造物品栏',global.Item_Link_CREATIVE_MODE_TAB.get('refinedstorage:creative_controller'))



Ingredient.all.itemIds.forEach(v=>{
  if(/refinedstorage:.*_controller/.test(v)&&!/creative/.test(v))
    console.log(v)
})