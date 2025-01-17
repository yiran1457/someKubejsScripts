
//无限附魔的无限吃食物
ItemEvents.foodEaten(e => {
    if(e.item.enchantments.get('yi:infinity')){
        e.item.count++
}
})

MoreJSEvents.enchantmentTableTooltip(e=>{
    e.lines.add(`§c§l[Yi]§r§c§l无限附魔§r`)
    
})