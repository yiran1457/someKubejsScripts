const { $TickEvent$PlayerTickEvent } = require("packages/net/minecraftforge/event/$TickEvent$PlayerTickEvent");



NativeEvents.onEvent($TickEvent$PlayerTickEvent,/**@param {$TickEvent$PlayerTickEvent} e */e => {
    switch (e.phase) {
        case 'START':
            CuriosToInventoryEnergy(e)
            TetraEnergyCap(e)
            break;
        case 'END':
            break;
    }
})