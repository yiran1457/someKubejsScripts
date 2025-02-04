
ItemEvents.tooltip(e => {
    e.addAdvanced(/tetra:modular_/, (item, advanced, text) => {
        if(item.nbt == null)return
        let Energy = item.nbt.getInt('Energy')
        let MaxEnergy = item.nbt.getInt('MaxEnergy')
        if (MaxEnergy != 0) {
            text.add(1, [
                Text.aqua(`${e.shift ? Energy : formatNumber(Energy)}FE`),
                Text.white(`/`),
                Text.blue(`${e.shift ? MaxEnergy : formatNumber(MaxEnergy)}FE`)
            ])
        }
    })
})