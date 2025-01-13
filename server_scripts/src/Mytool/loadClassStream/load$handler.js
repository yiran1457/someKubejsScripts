//priority:5000
//避免const导致的重新定义的报错
//避免require导致的隔离脚本导致无法获取正常补全
//通一导入class应用，避免反复导入

let { $SimpleContainer } = require("packages/net/minecraft/world/$SimpleContainer")
let { $SimpleMenuProvider } = require("packages/net/minecraft/world/$SimpleMenuProvider")
let { $ChestMenu } = require("packages/net/minecraft/world/inventory/$ChestMenu")
let { $CapabilityRegistry } = require("packages/com/hollingsworth/arsnouveau/setup/registry/$CapabilityRegistry")
let { $DamageTypes } = require("packages/net/minecraft/world/damagesource/$DamageTypes")
let { $ItemEffect } = require("packages/se/mickelus/tetra/effect/$ItemEffect")
let { $CuriosApi } = require("packages/top/theillusivec4/curios/api/$CuriosApi")
let { $ForgeCapabilities } = require("packages/net/minecraftforge/common/capabilities/$ForgeCapabilities")
let { $LivingHurtEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingHurtEvent")
let { $ModularItem } = require("packages/se/mickelus/tetra/items/modular/$ModularItem")
let { $PatchouliAPI } = require("packages/vazkii/patchouli/api/$PatchouliAPI")
let { $LivingDamageEvent } = require("packages/net/minecraftforge/event/entity/living/$LivingDamageEvent")

myRequire.$SimpleContainer = $SimpleContainer
myRequire.$SimpleMenuProvider = $SimpleMenuProvider
myRequire.$ChestMenu = $ChestMenu
myRequire.$CapabilityRegistry = $CapabilityRegistry
myRequire.$DamageTypes = $DamageTypes
myRequire.$ItemEffect = $ItemEffect
myRequire.$CuriosApi = $CuriosApi
myRequire.$ForgeCapabilities = $ForgeCapabilities
myRequire.$LivingHurtEvent = $LivingHurtEvent
myRequire.$ModularItem = $ModularItem
myRequire.$PatchouliAPI = $PatchouliAPI
myRequire.$LivingDamageEvent = $LivingDamageEvent
