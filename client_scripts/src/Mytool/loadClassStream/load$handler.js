//priority:5000
//避免require导致的隔离脚本导致无法获取正常补全
//通一导入class应用，避免反复导入

let { $Color } = require("packages/java/awt/$Color")
let { $GLFW } = require("packages/org/lwjgl/glfw/$GLFW")
let { $MobEffect } = require("packages/net/minecraft/world/effect/$MobEffect")
let { $ContainerScreenEvent$Render$Foreground } = require("packages/net/minecraftforge/client/event/$ContainerScreenEvent$Render$Foreground")
let { $Button } = require("packages/net/minecraft/client/gui/components/$Button")
let { $ImageButton } = require("packages/net/minecraft/client/gui/components/$ImageButton")
let { $Tooltip } = require("packages/net/minecraft/client/gui/components/$Tooltip")
let { $InventoryScreen } = require("packages/net/minecraft/client/gui/screens/inventory/$InventoryScreen")
let { $LecternScreen } = require("packages/net/minecraft/client/gui/screens/inventory/$LecternScreen")
let { $ScreenEvent$Init$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Init$Post")
let { $ScreenEvent$Render$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Render$Post")
let { $ScreenEvent$Render$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Render$Pre")
let { $GuiGraphics } = require("packages/net/minecraft/client/gui/$GuiGraphics")
let { $RenderNameTagEvent } = require("packages/net/minecraftforge/client/event/$RenderNameTagEvent")
let { $LivingEntity } = require("packages/net/minecraft/world/entity/$LivingEntity")
let { $RenderGuiEvent$Post } = require("packages/net/minecraftforge/client/event/$RenderGuiEvent$Post")
let { $KubeJS } = require("packages/dev/latvian/mods/kubejs/$KubeJS")
let { $RenderLivingEvent } = require("packages/net/minecraftforge/client/event/$RenderLivingEvent")
let { $AttackEntityEvent } = require("packages/net/minecraftforge/event/entity/player/$AttackEntityEvent")
myRequire.$GLFW = $GLFW
myRequire.$Color = $Color
myRequire.$MobEffect = $MobEffect
myRequire.$ContainerScreenEvent$Render$Foreground = $ContainerScreenEvent$Render$Foreground
myRequire.$Button = $Button
myRequire.$ImageButton = $ImageButton
myRequire.$Tooltip = $Tooltip
myRequire.$InventoryScreen = $InventoryScreen
myRequire.$ScreenEvent$Init$Post = $ScreenEvent$Init$Post
myRequire.$LecternScreen = $LecternScreen
myRequire.$ScreenEvent$Render$Post = $ScreenEvent$Render$Post
myRequire.$ScreenEvent$Render$Pre = $ScreenEvent$Render$Pre
myRequire.$GuiGraphics = $GuiGraphics
myRequire.$RenderNameTagEvent = $RenderNameTagEvent
myRequire.$LivingEntity = $LivingEntity
myRequire.$RenderGuiEvent$Post = $RenderGuiEvent$Post
myRequire.$KubeJS = $KubeJS
myRequire.$RenderLivingEvent = $RenderLivingEvent
myRequire.$AttackEntityEvent = $AttackEntityEvent
