const { $TeamData } = require("packages/dev/ftb/mods/ftbquests/quest/$TeamData")

if (config.ItemQuestLink) 
    {
    let openQuestGui = (id)=> {
        $ClientQuestFile.openGui(
            $ClientQuestFile.INSTANCE.getQuest($Long.parseLong(id, 16)),
            true
        )
    }
    let getToolTip = ()=> {
        let arg = Math.floor(HoldTime / MaxHoldTime * length) < 0 ? 0 : Math.floor(HoldTime / MaxHoldTime * length)
        return '§7' + TheText.slice(0, arg) + '§8' + TheText.slice(arg)
    }
    let getKeyToolTip=()=> {
        let keyMapping = KeyBindUtil.getKeyMapping('ftb-item')
        let tooltipAdditionText = '§7[ '
        switch (true) {
            case keyMapping.keyModifier.name() !== "NONE":
                tooltipAdditionText += keyMapping.keyModifier.name() + ' + '
            case true:
                tooltipAdditionText += '§7' + keyMapping.getKey().getDisplayName().getString() + ' ]'
        }
        return tooltipAdditionText
    }

    let ItemQuestLink = JsonIO.read('kubejs/MyConfig/ItemQuestLink.json')
    let HoldTime = -1
    let MaxHoldTime = config.MaxHoldTime
    let length = config.ToolTipLength
    let LastItem = Item.of('air')

    let TheText = Utils.lazy(() => {
        let text = ''
        for (let i = 0; i < length; i++) {
            text += '|'
        }
        return text
    }).get()

    NativeEvents.onEvent($ItemTooltipEvent, event => {
        LastItem = event.itemStack
        if (ItemQuestLink.get(event.itemStack.id) === null || LastItem != event.itemStack || HoldTime < MaxHoldTime) return
        openQuestGui(ItemQuestLink.get(event.itemStack.id))
    })

    KeyBindEvents.keyPressInGui('ftb-item', event => {
        HoldTime++
    })

    KeyBindEvents.keyReleaseInGui('ftb-item', event => {
        HoldTime = -1
        LastItem = Item.of('air')
    })

    ItemEvents.tooltip(event => {
        event.addAdvancedToAll((item, isAdvanced, textList) => {
            if (ItemQuestLink.get(item.id) === null) return
            textList.add(Text.translate('quest.item.link', getKeyToolTip()))
            textList.add(Text.of(getToolTip()))
            if (config.DisplayQuest)
                textList.add(Text.of('§e目标任务 : ').append($ClientQuestFile.INSTANCE.getQuest($Long.parseLong(ItemQuestLink.get(item.id), 16)).getTitle()))
            textList.add(
                Text.of(
                    $ClientQuestFile.INSTANCE.getQuest($Long.parseLong(ItemQuestLink.get(item.id), 16)).isCompletedRaw($TeamData.get(Client.player)) ? '§a已完成§r' : '§c未完成§r'
                )
            )
            textList.add(
                Text.of(
                    $ClientQuestFile.INSTANCE.getQuest($Long.parseLong(ItemQuestLink.get(item.id), 16)).areDependenciesComplete($TeamData.get(Client.player)) ? '§a前置已完成§r' : '§c前置未完成§r'
                )
            )
        })
    })
}
/**
 * 
 * @param {string} str 
 */
function tsTool(str) {

    let className = str.substring(str.indexOf('{') + 2, str.indexOf('}') - 1)
    let classPath = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
    let Import = `import { ${className} as My${className} } from ${classPath}`
    let Const = `const ${className}: typeof My${className}`
    console.log(Import, Const)
}
tsTool(`const { $ItemTooltipEvent } = require("packages/net/minecraftforge/event/entity/player/$ItemTooltipEvent")`)