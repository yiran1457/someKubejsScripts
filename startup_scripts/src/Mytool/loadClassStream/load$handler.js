//priority:5000
//避免let导致的重新定义的报错
//避免require导致的隔离脚本导致无法获取正常补全
//通一导入class应用，避免反复导入

let { $BasicItemJS$Builder } = require("packages/dev/latvian/mods/kubejs/item/custom/$BasicItemJS$Builder")
let { $EnchantmentCategory } = require("packages/net/minecraft/world/item/enchantment/$EnchantmentCategory")
let { $EventBuses } = require("packages/dev/architectury/platform/forge/$EventBuses")
let { $Item$Properties } = require("packages/net/minecraft/world/item/$Item$Properties")
let { $PickaxeItem } = require("packages/net/minecraft/world/item/$PickaxeItem")
let { $DeferredRegister } = require("packages/net/minecraftforge/registries/$DeferredRegister")
let { $ForgeRegistries } = require("packages/net/minecraftforge/registries/$ForgeRegistries")
let { $Rarity } = require("packages/net/minecraft/world/item/$Rarity")
let { $ItemEffect } = require("packages/se/mickelus/tetra/effect/$ItemEffect")
let { $RangedAttribute } = require("packages/net/minecraft/world/entity/ai/attributes/$RangedAttribute")

myRequire.$BasicItemJS$Builder = $BasicItemJS$Builder
myRequire.$EnchantmentCategory = $EnchantmentCategory
myRequire.$EventBuses = $EventBuses
myRequire.$Item$Properties = $Item$Properties
myRequire.$PickaxeItem = $PickaxeItem
myRequire.$DeferredRegister = $DeferredRegister
myRequire.$ForgeRegistries = $ForgeRegistries
myRequire.$Rarity = $Rarity
myRequire.$ItemEffect = $ItemEffect
myRequire.$RangedAttribute = $RangedAttribute