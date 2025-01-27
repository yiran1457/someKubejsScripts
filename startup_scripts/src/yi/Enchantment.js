

//注册附魔Category
$EnchantmentCategory.create('infinity_food',(i)=>{return Item.of(i.id).hasTag('infinity:food')||i.id=='yi:enchantTest'})
$EnchantmentCategory.create('cant_enchant',()=>false)
//注册附魔
StartupEvents.registry('enchantment',event=>{
    event.create('yi:infinity')
    .category('infinity_food')
    //设置翻译键,写lang
    .displayName(Text.translatable('enchantment.yi.infinity'))

    //====================================
    //Devil evil  恶魔 邪恶
    //====================================
    event.create('yi:evil_life_drain').category('cant_enchant').rarity('rare').canEnchant((i)=>i.hasTag('minecraft:swords'))
    event.create('yi:evil_demonic_corruption').category('cant_enchant').rarity('rare').canEnchant((i)=>i.hasTag('minecraft:swords')||i.hasTag('forge:armors'))

    //====================================
    //Angel Holy 天使 圣洁
    //====================================
    event.create('yi:holy_angel_protection').category('cant_enchant').maxLevel(3).rarity('rare').canEnchant((i)=>i.hasTag('forge:armors'))


    //====================================
    //Fallen Angel 堕天使
    //====================================
    event.create('yi:fallen_angel_blessing').category('cant_enchant').rarity('rare').canEnchant((i)=>i.id=='yi:sacred_and_demonic_mirror')
    event.create('yi:avada_kedavra').category('cant_enchant').rarity('very_rare').canEnchant((i)=>i.hasTag('minecraft:swords'))

})

