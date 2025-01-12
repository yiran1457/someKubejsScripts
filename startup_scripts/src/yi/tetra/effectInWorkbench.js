

ClientEvents.init(event => {
    const { $WorkbenchStatsGui } = require("packages/se/mickelus/tetra/blocks/workbench/gui/$WorkbenchStatsGui");
    const { $StatsHelper } = require("packages/se/mickelus/tetra/gui/stats/$StatsHelper");
    const { $LabelGetterBasic } = require("packages/se/mickelus/tetra/gui/stats/getter/$LabelGetterBasic");
    const { $StatGetterEffectLevel } = require("packages/se/mickelus/tetra/gui/stats/getter/$StatGetterEffectLevel");
    const { $TooltipGetterInteger } = require("packages/se/mickelus/tetra/gui/stats/getter/$TooltipGetterInteger");
    const { $HoloStatsGui } = require("packages/se/mickelus/tetra/items/modular/impl/holo/gui/craft/$HoloStatsGui");
    const { $GuiStatBar } = require("packages/se/mickelus/tetra/gui/stats/bar/$GuiStatBar");

    let statGetter = new $StatGetterEffectLevel($ItemEffect.get('yi:power'), 1)
    let statBar = new $GuiStatBar(0, 0, $StatsHelper.barLength,
        'yi.effect.power.name', 0, 10000, false, false, false,
        statGetter, $LabelGetterBasic.integerLabel,
        new $TooltipGetterInteger('yi.effect.power.tooltip', statGetter)
    )
    $WorkbenchStatsGui.addBar(statBar)
    $HoloStatsGui.addBar(statBar)

    statGetter = new $StatGetterEffectLevel($ItemEffect.get('yi:vibration'), 1)
    statBar = new $GuiStatBar(0, 0, $StatsHelper.barLength,
        'yi.effect.vibration.name', 0, 50, false, false, false,
        statGetter, $LabelGetterBasic.integerLabel,
        new $TooltipGetterInteger('yi.effect.vibration.tooltip', statGetter)
    )
    $WorkbenchStatsGui.addBar(statBar)
    $HoloStatsGui.addBar(statBar)

    statGetter = new $StatGetterEffectLevel($ItemEffect.get('yi:mana_addition'), 1)
    statBar = new $GuiStatBar(0, 0, $StatsHelper.barLength,
        'yi.effect.mana_addition.name', 0, 10, false, false, false,
        statGetter, $LabelGetterBasic.integerLabel,
        new $TooltipGetterInteger('yi.effect.mana_addition.tooltip', statGetter)
    )
    $WorkbenchStatsGui.addBar(statBar)
    $HoloStatsGui.addBar(statBar)

    statGetter = new $StatGetterEffectLevel($ItemEffect.get('yi:energy_addition'), 1)
    statBar = new $GuiStatBar(0, 0, $StatsHelper.barLength,
        'yi.effect.energy_addition.name', 0, 10, false, false, false,
        statGetter, $LabelGetterBasic.integerLabel,
        new $TooltipGetterInteger('yi.effect.energy_addition.tooltip', statGetter)
    )
    $WorkbenchStatsGui.addBar(statBar)
    $HoloStatsGui.addBar(statBar)

    statGetter = new $StatGetterEffectLevel($ItemEffect.get('yi:mana_drain'), 1)
    statBar = new $GuiStatBar(0, 0, $StatsHelper.barLength,
        'yi.effect.mana_drain.name', 0, 100, false, false, false,
        statGetter, $LabelGetterBasic.integerLabel,
        new $TooltipGetterInteger('yi.effect.mana_drain.tooltip', statGetter)
    )
    $WorkbenchStatsGui.addBar(statBar)
    $HoloStatsGui.addBar(statBar)

    statGetter = new $StatGetterEffectLevel($ItemEffect.get('yi:energy_drain'), 1)
    statBar = new $GuiStatBar(0, 0, $StatsHelper.barLength,
        'yi.effect.energy_drain.name', 0, 100, false, false, false,
        statGetter, $LabelGetterBasic.integerLabel,
        new $TooltipGetterInteger('yi.effect.energy_drain.tooltip', statGetter)
    )
    $WorkbenchStatsGui.addBar(statBar)
    $HoloStatsGui.addBar(statBar)


})