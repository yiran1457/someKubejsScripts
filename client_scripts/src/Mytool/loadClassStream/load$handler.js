//priority:5000
//避免const导致的重新定义的报错
//避免require导致的隔离脚本导致无法获取正常补全
//通一导入class应用，避免反复导入

const { $Color:$Color$ } = require("packages/java/awt/$Color")
const { $GLFW:$GLFW$ } = require("packages/org/lwjgl/glfw/$GLFW")
const { $MobEffect:$MobEffect$ } = require("packages/net/minecraft/world/effect/$MobEffect")
const { $ContainerScreenEvent$Render$Foreground:$ContainerScreenEvent$Render$Foreground$ } = require("packages/net/minecraftforge/client/event/$ContainerScreenEvent$Render$Foreground")

myRequire.$GLFW = $GLFW$
myRequire.$Color = $Color$
myRequire.$MobEffect = $MobEffect$
myRequire.$ContainerScreenEvent$Render$Foreground = $ContainerScreenEvent$Render$Foreground$