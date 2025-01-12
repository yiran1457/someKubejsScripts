//ignored true
//使脚本不加载

const { $EnchantmentCategory } = require("packages/net/minecraft/world/item/enchantment/$EnchantmentCategory")

//注册 Category
//可以在附魔的 category 使用
$EnchantmentCategory.create(
    'infinity_food',//category名称
    (item)=>Item.of(item.id).hasTag('infinity:food')//允许的附魔的物品
)