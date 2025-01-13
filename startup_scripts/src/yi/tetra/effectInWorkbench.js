

ClientEvents.init(event => {
    const { $WorkbenchStatsGui } = require("packages/se/mickelus/tetra/blocks/workbench/gui/$WorkbenchStatsGui");
    const { $StatsHelper } = require("packages/se/mickelus/tetra/gui/stats/$StatsHelper");
    const { $LabelGetterBasic } = require("packages/se/mickelus/tetra/gui/stats/getter/$LabelGetterBasic");
    const { $StatGetterEffectLevel } = require("packages/se/mickelus/tetra/gui/stats/getter/$StatGetterEffectLevel");
    const { $TooltipGetterInteger } = require("packages/se/mickelus/tetra/gui/stats/getter/$TooltipGetterInteger");
    const { $HoloStatsGui } = require("packages/se/mickelus/tetra/items/modular/impl/holo/gui/craft/$HoloStatsGui");
    const { $GuiStatBar } = require("packages/se/mickelus/tetra/gui/stats/bar/$GuiStatBar");


    let simpleRegWorkbenchBar = (Name,barMax) => {
        let statGetter = new $StatGetterEffectLevel($ItemEffect.get(Name), 1)
        Name = Name.split(':')
        let statBar = new $GuiStatBar(0, 0, $StatsHelper.barLength,
            `${Name[0]}.effect.${Name[1]}.name`, 0, barMax, false, false, false,
            statGetter, $LabelGetterBasic.integerLabel,
            new $TooltipGetterInteger(`${Name[0]}.effect.${Name[1]}.tooltip`, statGetter)
        )
        $WorkbenchStatsGui.addBar(statBar)
        $HoloStatsGui.addBar(statBar)
    }

    simpleRegWorkbenchBar('yi:power',10000)
    simpleRegWorkbenchBar('yi:vibration',50)
    simpleRegWorkbenchBar('yi:mana_addition',10)
    simpleRegWorkbenchBar('yi:energy_addition',10)
    simpleRegWorkbenchBar('yi:mana_drain', 100)
    simpleRegWorkbenchBar('yi:energy_drain', 100)

})