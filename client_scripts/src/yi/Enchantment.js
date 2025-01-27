
//无限附魔的无限吃食物
ItemEvents.foodEaten(e => {
    if(e.item.enchantments.get('yi:infinity')){
        e.item.count++
}
})
/*

MoreJSEvents.enchantmentTableTooltip(e=>{
    e.lines[0]=Text.of(`you can't see`).font('minecraft:alt')
})

*/