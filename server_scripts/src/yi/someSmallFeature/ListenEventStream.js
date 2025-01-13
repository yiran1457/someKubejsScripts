//priority:1000

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

let Blockright = {}
BlockEvents.rightClicked(e=>{
    if(e.hand == 'main_hand' && Blockright[e.block.id] !== undefined)
        Blockright[e.block.id](e)
})
/**
 * @param {$Block_} blockId 
 * @param {(event:$BlockRightClickedEventJS_)} code 
 */
let addBlockrightCase = (blockId,code) =>{ Blockright[blockId] = code }
addBlockrightCase('minecraft:diamond_block',e=>{
    e.player.tell(e.block.id)
    console.log(Utils.getRegistryIds('minecraft:mob_effect'))

    

})


