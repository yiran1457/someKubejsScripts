//priority:5000
//避免let导致的重新定义的报错
//避免require导致的隔离脚本导致无法获取正常补全
//通一导入class应用，避免反复导入

let { $SimpleContainer } = require("packages/net/minecraft/world/$SimpleContainer")
let { $SimpleMenuProvider } = require("packages/net/minecraft/world/$SimpleMenuProvider")
let { $ChestMenu } = require("packages/net/minecraft/world/inventory/$ChestMenu")
let { $CapabilityRegistry } = require("packages/com/hollingsworth/arsnouveau/setup/registry/$CapabilityRegistry")
let { $ItemEffect } = require("packages/se/mickelus/tetra/effect/$ItemEffect")
let { $CuriosApi } = require("packages/top/theillusivec4/curios/api/$CuriosApi")
let { $ForgeCapabilities } = require("packages/net/minecraftforge/common/capabilities/$ForgeCapabilities")
let { $LivingHurtEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingHurtEvent")
let { $ModularItem } = require("packages/se/mickelus/tetra/items/modular/$ModularItem")
let { $PatchouliAPI } = require("packages/vazkii/patchouli/api/$PatchouliAPI")
let { $LivingDamageEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingDamageEvent")
let { $TickEvent$PlayerTickEvent } = require("packages/net/minecraftforge/event/$TickEvent$PlayerTickEvent")
let { $Registries } = require("packages/net/minecraft/core/registries/$Registries")
let { $ResourceKey } = require("packages/net/minecraft/resources/$ResourceKey")
let { $Enchantment } = require("packages/net/minecraft/world/item/enchantment/$Enchantment")
let { $Player } = require("packages/net/minecraft/world/entity/player/$Player")
let { $LivingAttackEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingAttackEvent")
let { $UUID } = require("packages/java/util/$UUID")
let { $EquipmentSlot } = require("packages/net/minecraft/world/entity/$EquipmentSlot")
let { $AttributeModifier } = require("packages/net/minecraft/world/entity/ai/attributes/$AttributeModifier")
let { $ItemAttributeModifierEvent } = require("packages/net/minecraftforge/event/$ItemAttributeModifierEvent")
let { $CurioAttributeModifierEvent } = require("packages/top/theillusivec4/curios/api/event/$CurioAttributeModifierEvent")
let { $LivingEquipmentChangeEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingEquipmentChangeEvent")

myRequire.$SimpleContainer = $SimpleContainer
myRequire.$SimpleMenuProvider = $SimpleMenuProvider
myRequire.$ChestMenu = $ChestMenu
myRequire.$CapabilityRegistry = $CapabilityRegistry
myRequire.$ItemEffect = $ItemEffect
myRequire.$CuriosApi = $CuriosApi
myRequire.$ForgeCapabilities = $ForgeCapabilities
myRequire.$LivingHurtEvent = $LivingHurtEvent
myRequire.$ModularItem = $ModularItem
myRequire.$PatchouliAPI = $PatchouliAPI
myRequire.$LivingDamageEvent = $LivingDamageEvent
myRequire.$TickEvent$PlayerTickEvent = $TickEvent$PlayerTickEvent
myRequire.$Registries = $Registries
myRequire.$ResourceKey = $ResourceKey
myRequire.$Enchantment = $Enchantment
myRequire.$Player = $Player
myRequire.$LivingAttackEvent = $LivingAttackEvent
myRequire.$UUID = $UUID
myRequire.$EquipmentSlot = $EquipmentSlot
myRequire.$AttributeModifier = $AttributeModifier
myRequire.$ItemAttributeModifierEvent = $ItemAttributeModifierEvent
myRequire.$CurioAttributeModifierEvent = $CurioAttributeModifierEvent
myRequire.$LivingEquipmentChangeEvent = $LivingEquipmentChangeEvent