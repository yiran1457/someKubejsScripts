

//注册附魔Category
$EnchantmentCategory.create('infinity_food',(i)=>{return Item.of(i.id).hasTag('infinity:food')})
//注册附魔
StartupEvents.registry('enchantment',event=>{
    event.create('yi:infinity')
    .category('infinity_food')
    //设置翻译键,写lang
    .displayName(Text.translatable('enchantment.yi.infinity'))

    event.create('yi:evil_life_drain').category('weapon').rarity('very_rare')/*
    .postAttack((attacker,entity,level)=>{
        if(attacker.health>1){
            attacker.attack(attacker.damageSources().magic(),1)
            if(entity.isLiving())
                attacker.tell('living')
            if(!entity.isLiving())
                attacker.tell('!living')
            if(entity.isAlive())
                attacker.tell('alive')
            if(!entity.isAlive())
                attacker.tell('!alive')
        }
    })*/
})
/*
恶魔：Devil
天使：Angel
邪恶：Evil
圣洁：Holy
*/