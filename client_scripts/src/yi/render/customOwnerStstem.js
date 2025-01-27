
ItemEvents.tooltip(e => {
    e.addAdvancedToAll((i, a, t) => {
        if (!a || i.nbt?.owner == undefined) return
        t.add(1, Component.translatable('tooltip.owner').darkAqua().append(Component.of('  ' + i.nbt.owner).gold()))
    })
})