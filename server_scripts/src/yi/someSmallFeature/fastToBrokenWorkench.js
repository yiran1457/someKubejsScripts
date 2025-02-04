const { $ToolAction } = require("packages/net/minecraftforge/common/$ToolAction")

BlockEvents.rightClicked('tetra:basic_workbench', e => {
    //判断玩家是否蹲下以及玩家是否拿着锤子等级高于3的锤
    if (e.player.isShiftKeyDown() || e.item.item.getToolLevel(e.item, $ToolAction.get('hammer_dig')) > 3) {
        e.level.destroyBlock(e.block.pos, true)
        e.player.swing(e.hand)
    }
})