//====================
//screenevent 合集
//=====================
import { $ScreenEvent$BackgroundRendered as My$ScreenEvent$BackgroundRendered } from "packages/net/minecraftforge/client/event/$ScreenEvent$BackgroundRendered"
import { $ScreenEvent$CharacterTyped$Post as My$ScreenEvent$CharacterTyped$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$CharacterTyped$Post"
import { $ScreenEvent$CharacterTyped$Pre as My$ScreenEvent$CharacterTyped$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$CharacterTyped$Pre"
import { $ScreenEvent$Closing as My$ScreenEvent$Closing } from "packages/net/minecraftforge/client/event/$ScreenEvent$Closing"
import { $ScreenEvent$Init$Post as My$ScreenEvent$Init$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$Init$Post"
import { $ScreenEvent$Init$Pre as My$ScreenEvent$Init$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$Init$Pre"
import { $ScreenEvent$KeyPressed$Post as My$ScreenEvent$KeyPressed$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$KeyPressed$Post"
import { $ScreenEvent$KeyPressed$Pre as My$ScreenEvent$KeyPressed$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$KeyPressed$Pre"
import { $ScreenEvent$KeyReleased$Post as My$ScreenEvent$KeyReleased$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$KeyReleased$Post"
import { $ScreenEvent$KeyReleased$Pre as My$ScreenEvent$KeyReleased$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$KeyReleased$Pre"
import { $ScreenEvent$MouseButtonPressed$Post as My$ScreenEvent$MouseButtonPressed$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonPressed$Post"
import { $ScreenEvent$MouseButtonPressed$Pre as My$ScreenEvent$MouseButtonPressed$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonPressed$Pre"
import { $ScreenEvent$MouseButtonReleased$Post as My$ScreenEvent$MouseButtonReleased$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonReleased$Post"
import { $ScreenEvent$MouseButtonReleased$Pre as My$ScreenEvent$MouseButtonReleased$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseButtonReleased$Pre"
import { $ScreenEvent$MouseDragged$Post as My$ScreenEvent$MouseDragged$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseDragged$Post"
import { $ScreenEvent$MouseDragged$Pre as My$ScreenEvent$MouseDragged$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseDragged$Pre"
import { $ScreenEvent$MouseScrolled$Post as My$ScreenEvent$MouseScrolled$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseScrolled$Post"
import { $ScreenEvent$MouseScrolled$Pre as My$ScreenEvent$MouseScrolled$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$MouseScrolled$Pre"
import { $ScreenEvent$Opening as My$ScreenEvent$Opening } from "packages/net/minecraftforge/client/event/$ScreenEvent$Opening"
import { $ScreenEvent$Render$Post as My$ScreenEvent$Render$Post } from "packages/net/minecraftforge/client/event/$ScreenEvent$Render$Post"
import { $ScreenEvent$Render$Pre as My$ScreenEvent$Render$Pre } from "packages/net/minecraftforge/client/event/$ScreenEvent$Render$Pre"
import { $ScreenEvent$RenderInventoryMobEffects as My$ScreenEvent$RenderInventoryMobEffects } from "packages/net/minecraftforge/client/event/$ScreenEvent$RenderInventoryMobEffects"
//====================
// 一些render所需类
//====================
import { $InventoryScreen as My$InventoryScreen } from "packages/net/minecraft/client/gui/screens/inventory/$InventoryScreen"
import { $GuiGraphics as My$GuiGraphics } from "packages/net/minecraft/client/gui/$GuiGraphics"
import { $TitleScreen as My$TitleScreen } from "packages/net/minecraft/client/gui/screens/$TitleScreen"
import { $OptionsScreen as My$OptionsScreen } from "packages/net/minecraft/client/gui/screens/$OptionsScreen"
import { $SelectWorldScreen as My$SelectWorldScreen } from "packages/net/minecraft/client/gui/screens/worldselection/$SelectWorldScreen"
import { $ImageButton as My$ImageButton } from "packages/net/minecraft/client/gui/components/$ImageButton"
//====================
// Util
//====================
import { $Random as My$Random } from "packages/java/util/$Random"
import { $KubeJS as My$KubeJS } from "packages/dev/latvian/mods/kubejs/$KubeJS"
import { $KubeJSCommon as My$KubeJSCommon } from "packages/dev/latvian/mods/kubejs/$KubeJSCommon"
//====================
// 杂项
//====================
import { $ClientQuestFile as My$ClientQuestFile } from "packages/dev/ftb/mods/ftbquests/client/$ClientQuestFile"
import { $VanillaTypes as My$VanillaTypes } from "packages/mezz/jei/api/constants/$VanillaTypes"
import { $Internal as My$Internal } from "packages/mezz/jei/common/$Internal"
import { $ItemTooltipEvent as My$ItemTooltipEvent } from "packages/net/minecraftforge/event/entity/player/$ItemTooltipEvent"
import { $Button as My$Button } from "packages/net/minecraft/client/gui/components/$Button"
import { $Screen as My$Screen } from "packages/net/minecraft/client/gui/screens/$Screen"
import { $TeamData as My$TeamData } from "packages/dev/ftb/mods/ftbquests/quest/$TeamData"
declare global {
const $ScreenEvent$BackgroundRendered: typeof My$ScreenEvent$BackgroundRendered
const $ScreenEvent$CharacterTyped$Post: typeof My$ScreenEvent$CharacterTyped$Post
const $ScreenEvent$CharacterTyped$Pre: typeof My$ScreenEvent$CharacterTyped$Pre
const $ScreenEvent$Closing: typeof My$ScreenEvent$Closing
const $ScreenEvent$Init$Post: typeof My$ScreenEvent$Init$Post
const $ScreenEvent$Init$Pre: typeof My$ScreenEvent$Init$Pre
const $ScreenEvent$KeyPressed$Post: typeof My$ScreenEvent$KeyPressed$Post
const $ScreenEvent$KeyPressed$Pre: typeof My$ScreenEvent$KeyPressed$Pre
const $ScreenEvent$KeyReleased$Post: typeof My$ScreenEvent$KeyReleased$Post
const $ScreenEvent$KeyReleased$Pre: typeof My$ScreenEvent$KeyReleased$Pre
const $ScreenEvent$MouseButtonPressed$Post: typeof My$ScreenEvent$MouseButtonPressed$Post
const $ScreenEvent$MouseButtonPressed$Pre: typeof My$ScreenEvent$MouseButtonPressed$Pre
const $ScreenEvent$MouseButtonReleased$Post: typeof My$ScreenEvent$MouseButtonReleased$Post
const $ScreenEvent$MouseButtonReleased$Pre: typeof My$ScreenEvent$MouseButtonReleased$Pre
const $ScreenEvent$MouseDragged$Post: typeof My$ScreenEvent$MouseDragged$Post
const $ScreenEvent$MouseDragged$Pre: typeof My$ScreenEvent$MouseDragged$Pre
const $ScreenEvent$MouseScrolled$Post: typeof My$ScreenEvent$MouseScrolled$Post
const $ScreenEvent$MouseScrolled$Pre: typeof My$ScreenEvent$MouseScrolled$Pre
const $ScreenEvent$Opening: typeof My$ScreenEvent$Opening
const $ScreenEvent$Render$Post: typeof My$ScreenEvent$Render$Post
const $ScreenEvent$Render$Pre: typeof My$ScreenEvent$Render$Pre
const $ScreenEvent$RenderInventoryMobEffects: typeof My$ScreenEvent$RenderInventoryMobEffects
const $InventoryScreen: typeof My$InventoryScreen
const $GuiGraphics: typeof My$GuiGraphics
const $TitleScreen: typeof My$TitleScreen
const $OptionsScreen: typeof My$OptionsScreen
const $SelectWorldScreen: typeof My$SelectWorldScreen
const $ImageButton: typeof My$ImageButton
const $Random: typeof My$Random
const $KubeJS: typeof My$KubeJS
const $KubeJSCommon: typeof My$KubeJSCommon
const $ClientQuestFile: typeof My$ClientQuestFile
const $VanillaTypes: typeof My$VanillaTypes
const $Internal: typeof My$Internal
const $ItemTooltipEvent: typeof My$ItemTooltipEvent
const $Long: typeof My$Long
const $Button: typeof My$Button
const $Screen: typeof My$Screen
const $TeamData: typeof My$TeamData
}
class My$Long {
static parseLong(数字: string, 进制: number): My$Long
}
