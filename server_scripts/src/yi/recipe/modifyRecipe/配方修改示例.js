

if (false) {
    let { MrCrayfish, ae2, cataclysm, integrateddynamics, mna2, iceandfire } = Recipes$Tool.recipes
    ServerEvents.recipes(e => {

        integrateddynamics: {
            /*
            集成动力 烘干机/电动烘干机
            setTime的单位为tick(20tick=1s),电动的耗电为80rf/tick,不填时间默认为400/20
            setFluidIngredient/setFluidResult仅可选择一个,允许使用Fluid.of(),数量不填数量默认1000
            */
            integrateddynamics.drying_basin$烘干机
                .setResult('minecraft:ancient_debris')
                .setFluidResult('200x minecraft:lava')
                .setIngredient('minecraft:enchanted_golden_apple')
                .setTime(100)
                .over(e)

            integrateddynamics.mechanical_drying_basin$电动烘干机
                .setResult('minecraft:ancient_debris')
                .setFluidResult(Fluid.of('minecraft:lava', 200))
                .setIngredient('minecraft:enchanted_golden_apple')
                .setTime(100)
                .over(e)

            /*
            集成动力 挤压机/电动挤压机
            addItem允许使用tag
            addOutItem中填写了chance数量固定为1
            setFluidResult允许使用Fluid.of(),电动的耗电为80rf/tick,数量不填写数量默认为1000
            电动的setTime单位为tick(20tick=1s),不填时间默认为40
            */
            integrateddynamics.squeezer$挤压机
                .addResult('minecraft:ancient_debris', 4)
                .addResult('minecraft:ancient_debris', 0.5)
                .setFluidResult('200x minecraft:lava')
                .setIngredient('minecraft:enchanted_golden_apple')
                .over(e)

            integrateddynamics.squeezer$挤压机
                .addResult('4x minecraft:ancient_debris',)
                .addResult('minecraft:ancient_debris', 0.5)
                .setFluidResult(Fluid.of('minecraft:lava', 200))
                .setIngredient('#minecraft:piglin_loved')
                .over(e)

            integrateddynamics.mechanical_squeezer$电动挤压机
                .addResult('4x minecraft:ancient_debris')
                .addResult('minecraft:ancient_debris', 0.5)
                .setIngredient('minecraft:enchanted_golden_apple')
                .setTime(100)
                .setFluidResult('200x minecraft:lava')
                .over(e)

            integrateddynamics.mechanical_squeezer$电动挤压机
                .addResult('4x minecraft:ancient_debris')
                .addResult('minecraft:ancient_debris', 0.5)
                .setFluidResult(Fluid.of('minecraft:lava', 200))
                .setIngredient('#minecraft:piglin_loved')
                .over(e)
        }

        MrCrayfish: {
            /*
            MrCrayfish 菜品组装
            最多只能添加5个物品,添加更多将无法合成
            */
            MrCrayfish.combining$菜品组装
                .setResult(Item.of('minecraft:ancient_debris'))
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .addIngredient('minecraft:enchanted_golden_apple')
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .over(e)

            MrCrayfish.slicing$切片
                .setResult(Item.of('minecraft:ancient_debris'))
                .setIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .over(e)

            MrCrayfish.freezing$冰冻
                .setResult(Item.of('minecraft:ancient_debris'))
                .setIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .settime(50)
                .over(e)

            MrCrayfish.frying$煎炸
                .setResult(Item.of('minecraft:ancient_debris'))
                .setIngredient(Item.of('minecraft:enchanted_golden_apple', '{Unbreakable:1b}').weakNBT())
                .settime(50)
                .over(e)

            MrCrayfish.heating$加热
                .setResult(Item.of('minecraft:ancient_debris'))
                .setIngredient(Item.of('minecraft:enchanted_golden_apple', '{Unbreakable:1b}').weakNBT())
                .settime(12000)
                .over(e)

            MrCrayfish.baking$烘焙
                .setResult(Item.of('minecraft:ancient_debris'))
                .setIngredient(Item.of('minecraft:enchanted_golden_apple', '{Unbreakable:1b}').weakNBT())
                .settime(12000)
                .over(e)

            MrCrayfish.toasting$烤面包
                .setResult(Item.of('minecraft:ancient_debris'))
                .setIngredient(Item.of('minecraft:enchanted_golden_apple', '{Unbreakable:1b}').weakNBT())
                .settime(12000)
                .over(e)

            /*
            MrCrayfish 工作站配方
            建议只加入9个输入物品(但是也可以加入更多)
            加入输入物品的数量不变
            */
            MrCrayfish.constructing$组装
                .setResult(Item.of('minecraft:ancient_debris'))
                .addIngredient('66x minecraft:enchanted_golden_apple')
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .addIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .over(e)
        }

        ae2: {
            ae2.inscriber$压印机
                .setResult(Item.of('minecraft:ancient_debris'))
                .setInputItem(Item.of('minecraft:enchanted_golden_apple'), 'acacia_fence', '#ae2:inscriber_presses')
                .over(e)

            ae2.charger$充能器
                .setResult(Item.of('minecraft:ancient_debris'))
                .setIngredient(Item.of('minecraft:enchanted_golden_apple'))
                .over(e)
        }

        cataclysm: {
            cataclysm.amethyst_bless$紫水晶祭坛祝福
                .setResult('minecraft:ancient_debris')
                .setIngredient('minecraft:enchanted_golden_apple')
                .setTime(5)
                .over(e)

            cataclysm.weapon_fusion$机械融合砧
                .setResult(Item.of('minecraft:ancient_debris').strongNBT())
                .setIngredients(Item.of('minecraft:enchanted_golden_apple', '{Unbreakable:1}').enchant('minecraft:protection', 4).weakNBT(), 'minecraft:enchanted_golden_apple')
                .over(e)
        }

        mna2: {
            mna2.arcanefurnace$奥术熔炉
                .setResult('minecraft:ancient_debris', 5)
                .setIngredient('minecraft:enchanted_golden_apple')
                .setBurnTime(2)
                .setTier(1)
                .over(e)

            mna2.runeforging$符文铁砧
                .setResult('minecraft:ancient_debris')
                .setUpIngredient('minecraft:enchanted_golden_apple')
                .setDownIngredient('minecraft:enchanted_golden_apple')
                .setHits(520)
                .over(e)

            mna2.manaweaving$织魔祭坛
                .setResult('minecraft:ancient_debris')
                .addIngredient('minecraft:enchanted_golden_apple')
                .addPattern(mna$setting.patterns$图案.永恒)
                .over(e)

            mna2.eldrin_altar$艾德灵祭坛
                .setResult('minecraft:ancient_debris')
                .addIngredient('minecraft:enchanted_golden_apple')
                .addaffinity(mna$setting.affinity$元素.奥术, 500)
                .over(e)
        }

        iceandfire: {
            iceandfire.icedragonforge$冰龙锻造
                .setResult('ancient_debris')
                .setIngredient('enchanted_golden_apple')
                .setBloodSlot('enchanted_golden_apple')
                .over(e)

            iceandfire.firedragonforge$火龙锻造
                .setResult('ancient_debris')
                .setIngredient('enchanted_golden_apple')
                .setBloodSlot('enchanted_golden_apple')
                .over(e)

            iceandfire.lightningdragonforge$雷龙锻造
                .setResult('ancient_debris')
                .setIngredient('enchanted_golden_apple')
                .setBloodSlot('enchanted_golden_apple')
                .setTime(50)
                .over(e)
        }


    })
}


