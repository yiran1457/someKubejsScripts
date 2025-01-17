
//无限附魔的无限吃食物
ItemEvents.foodEaten(e => {
    if(e.item.enchantments.get('yi:infinity')){
        e.item.count++
}
})



/**
 * 当玩家在附魔台界面更换物品时被调用。
 */
// 对于1.18版本请使用: onEvent("morejs.enchantment_table.changed", (event) => { ... })
MoreJSEvents.enchantmentTableChanged((event) => {
    /**
     * `event.position`: 附魔台的位置
     * `event.player`: 更换物品的玩家
     * `event.level`: 等级（如主世界等）
     * `event.item`: 即将被附魔的物品
     * `event.secondItem`: 第二个物品。通常是青金石。
     * `event.get(slot)`: 从给定槽位(0, 1 或 2)获取附魔数据。
     */

    let firstSlot = event.get(0);
    firstSlot.requiredLevel; // 对物品进行附魔所需的等级
    firstSlot.enchantmentCount; // 物品将拥有的附魔数量
    firstSlot.forEachEnchantments((enchantment, level) => {
        // `enchantment` -> 附魔类型
        // `level` -> 该附魔的等级
    });

    // 在这个事件中我们还可以变更槽位的数据。
    firstSlot.requiredLevel = 50; // 设置所需等级为50
    //firstSlot.clearEnchantments(); // 移除此槽位中的所有附魔
    //firstSlot.addEnchantment(enchantment, level); // 向此槽位添加附魔
    
    firstSlot.addEnchantment('yi:test', 5); // 向此槽位添加附魔
    // 在变更附魔后你应该调用 `updateClue()` 来更新附魔台。
    firstSlot.updateClue();
});







