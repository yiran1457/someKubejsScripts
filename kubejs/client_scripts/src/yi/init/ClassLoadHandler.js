//priority:5000


//====================
//screenevent 合集
//=====================
const { $ScreenEvent$BackgroundRendered } = require("packages/net/minecraftforge/client/event/$ScreenEvent$BackgroundRendered")
const { $ScreenEvent$CharacterTyped$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$CharacterTyped$Post")
const { $ScreenEvent$CharacterTyped$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$CharacterTyped$Pre")
const { $ScreenEvent$Closing } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Closing")
const { $ScreenEvent$Init$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Init$Post")
const { $ScreenEvent$Init$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Init$Pre")
const { $ScreenEvent$KeyPressed$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$KeyPressed$Post")
const { $ScreenEvent$KeyPressed$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$KeyPressed$Pre")
const { $ScreenEvent$KeyReleased$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$KeyReleased$Post")
const { $ScreenEvent$KeyReleased$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$KeyReleased$Pre")
const { $ScreenEvent$MouseButtonPressed$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonPressed$Post")
const { $ScreenEvent$MouseButtonPressed$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonPressed$Pre")
const { $ScreenEvent$MouseButtonReleased$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonReleased$Post")
const { $ScreenEvent$MouseButtonReleased$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonReleased$Pre")
const { $ScreenEvent$MouseDragged$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseDragged$Post")
const { $ScreenEvent$MouseDragged$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseDragged$Pre")
const { $ScreenEvent$MouseScrolled$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseScrolled$Post")
const { $ScreenEvent$MouseScrolled$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$MouseScrolled$Pre")
const { $ScreenEvent$Opening } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Opening")
const { $ScreenEvent$Render$Post } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Render$Post")
const { $ScreenEvent$Render$Pre } = require("packages/net/minecraftforge/client/event/$ScreenEvent$Render$Pre")
const { $ScreenEvent$RenderInventoryMobEffects } = require("packages/net/minecraftforge/client/event/$ScreenEvent$RenderInventoryMobEffects")

//====================
// 一些render所需类
//====================
const { $InventoryScreen } = require("packages/net/minecraft/client/gui/screens/inventory/$InventoryScreen")
const { $GuiGraphics } = require("packages/net/minecraft/client/gui/$GuiGraphics")
const { $TitleScreen } = require("packages/net/minecraft/client/gui/screens/$TitleScreen")
const { $OptionsScreen } = require("packages/net/minecraft/client/gui/screens/$OptionsScreen")
const { $SelectWorldScreen } = require("packages/net/minecraft/client/gui/screens/worldselection/$SelectWorldScreen")
const { $ImageButton } = require("packages/net/minecraft/client/gui/components/$ImageButton")

//====================
// Util
//====================
const { $Random } = require("packages/java/util/$Random")
const { $KubeJS } = require("packages/dev/latvian/mods/kubejs/$KubeJS")
const { $KubeJSCommon } = require("packages/dev/latvian/mods/kubejs/$KubeJSCommon")

//====================
// 杂项
//====================

const { $ClientQuestFile } = require("packages/dev/ftb/mods/ftbquests/client/$ClientQuestFile")
const { $VanillaTypes } = require("packages/mezz/jei/api/constants/$VanillaTypes")
const { $Internal } = require("packages/mezz/jei/common/$Internal")
const { $ItemTooltipEvent } = require("packages/net/minecraftforge/event/entity/player/$ItemTooltipEvent")
const $Long = Java.loadClass("java.lang.Long")