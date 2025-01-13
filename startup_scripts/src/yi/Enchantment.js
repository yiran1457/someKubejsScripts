

//注册附魔Category
$EnchantmentCategory.create('infinity_food',(i)=>{return Item.of(i.id).hasTag('infinity:food')})
//注册附魔
StartupEvents.registry('enchantment',event=>{
    event.create('yi:infinity')
    .category('infinity_food')
    //设置翻译键,写lang
    .displayName(Text.translatable('enchantment.yi.infinity'))
})
