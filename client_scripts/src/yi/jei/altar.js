/**
 * 模拟配方数组
 */
global.testRecipe = [
    {
        principalItem: 'ae2:singularity',
        inputItems: [
            'integrateddynamics:logic_director', 'integrateddynamics:logic_director', 'integrateddynamics:logic_director','integrateddynamics:logic_director','create_new_age:netherite_magnet','create_new_age:netherite_magnet','create_new_age:netherite_magnet','create_new_age:netherite_magnet'
        ],
        outputItem: "yi:technological_core",
        desc:"科技核心合成仪式"
    }
]

/**
 * 注册配方
 * @param {String} output 输出物品
 * @param {String[]} input 祭坛周围的物品
 * @param {String} principal 祭坛中间的物品
 */
function regRecipe(output,input,principal){
    global.testRecipe.push({
        principalItem:principal,
        inputItems:input,
        outputItem:output
    })
}

function regRecipe1(list){
    for (let index = 0; index < list.length; index++){
        let output = list[index][2][1]
        let input1 = list[index][1]
        let principal = list[index][0][0]
        console.info(principal)
        let input = []
        for (let index01 = 0; index01 < input1.length; index01++){
            for (let index02 = 0; index02 < input1[index01][1]; index02++){
                input.push(input1[index01][0])
            }
        }
    output=output+'_spawn_egg'
    global.testRecipe.push({
        principalItem:principal,
        inputItems:input,
        outputItem:output
    })}
}
    
/*let recipes =[[
    ['minecraft:nether_star'],
    [['minecraft:netherite_block',2],['minecraft:gilded_blackstone',2],['minecraft:magma_block',2],['minecraft:basalt',2]],
    ['command','cataclysm:netherite_monstrosity']
    ],[
    ['minecraft:nether_star'],
    [['minecraft:nether_star',1],['cataclysm:void_stone',1],['minecraft:crying_obsidian',2],['minecraft:purpur_block',2],['minecraft:shulker_shell',2]],
    ['command','cataclysm:ender_guardian'],
    ],[
    ['minecraft:nether_star'],
    [['minecraft:nether_star',1],['minecraft:redstone_block',2],['minecraft:wither_skeleton_skull',3],['create:sturdy_sheet',2]],
    ['command','cataclysm:the_harbinger'],
    ],[
    ['minecraft:nether_star'],
    [['minecraft:bone_block',2],['minecraft:gold_block',1],['minecraft:sandstone',2],['create:brass_block',2],['cataclysm:necklace_of_the_desert',1]],
    ['command','cataclysm:ancient_remnant'],
    ],[
    ['minecraft:nether_star'],
    [['create:brass_block',2],['minecraft:diamond_block',2],['minecraft:nether_star',1],['cataclysm:black_steel_block',3]],
    ['command','cataclysm:maledictus'],
    ],[
    ['cataclysm:void_stone'],
    [['minecraft:crying_obsidian',2],['minecraft:obsidian',2]],
    ['command','cataclysm:ender_golem'],
    ],[
    ['quark:blaze_lantern'],
    [['minecraft:shield',2],['minecraft:nether_bricks',2]],
    ['command','cataclysm:ignited_revenant'],
    ],[
    ['minecraft:clay'],
    [['minecraft:amethyst_block',1],['minecraft:mossy_cobblestone',3]],
    ['command','cataclysm:amethyst_crab'],
    ],[
    ['minecraft:magma_block'],
    [['minecraft:redstone_block',1],['minecraft:iron_block',1],['minecraft:blackstone',2]],
    ['command','cataclysm:the_prowler'],
    ],[
    ['minecraft:sandstone'],
    [['create:brass_block',2],['minecraft:bone_block',2]],
    ['command','cataclysm:kobolediator'],
    ],[
    ['minecraft:sandstone'],
    [['create:brass_block',1],['minecraft:bone_block',3]],
    ['command','cataclysm:wadjet'],
    ],[
    ['minecraft:sea_lantern'],
    [['minecraft:dried_kelp_block',1],['minecraft:stone_bricks',2],['minecraft:brain_coral_block',1]],
    ['command','cataclysm:deepling_priest'],
    ],[
    ['minecraft:crying_obsidian'],
    [['minecraft:dried_kelp_block',1],['minecraft:stone_bricks',2],['minecraft:brain_coral_block',1]],
    ['command','cataclysm:deepling_warlock'],
    ],[
    ['minecraft:soul_sand'],
    [['minecraft:iron_block',2],['create:sturdy_sheet',2]],
    ['command','cataclysm:aptrgangr'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:snow_block',4],['minecraft:blue_ice',2],['minecraft:diamond_block',1]],
    ['command','mowziesmobs:frostmaw'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:gold_block',4],['minecraft:feather',2],['minecraft:blaze_rod',1]],
    ['command','mowziesmobs:umvuthi'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:iron_block',4],['create:sturdy_sheet',3]],
    ['command','mowziesmobs:wroughtnaut'],
    ]
    ]*/

regRecipe('alexscaves:spawn_egg_nucleeper',['alexscaves:uranium_rod','alexscaves:uranium_rod','alexscaves:charred_remnant','alexscaves:charred_remnant'],'minecraft:creeper_head')




JEIAddedEvents.registerCategories((event) => {
    event.custom("custom:altar", (category) => {
        const jeiHelpers = category.getJeiHelpers()
        const guiHelper = category.getJeiHelpers().getGuiHelper();
        global.jitan = category
            .title("祭坛合成")
            .background(guiHelper.createDrawable( new ResourceLocation("yi:textures/gui/jei.png"),0,0,150, 100))
            //.background(guiHelper.createBlankDrawable( 150, 100))
            .icon(guiHelper.createDrawableItemStack(Item.of("ars_nouveau:arcane_pedestal")))
            .isRecipeHandled((recipe) => {
                return verifyRecipe(jeiHelpers, recipe);
            })
            .handleLookup((builder, recipe, focuses) => {
                handleLookup(jeiHelpers, builder, recipe, focuses);
            })
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY)=>{
                guiRender(recipe, recipeSlotsView, guiGraphics, mouseX, mouseY)
            })
            
    });
});



let guiRender = (recipe, recipeSlotsView, /**@type {$GuiGraphics_} */guiGraphics, mouseX, mouseY) => {
    guiGraphics.drawWordWrap(Client.font, Text.of(recipe.data.desc), 80, 0, 100, 0)
}


let verifyRecipe = (jeiHelpers, recipe) => {
    return !!(
        recipe?.data?.inputs !== undefined &&
        recipe?.data?.output !== undefined &&
        recipe?.data?.principal !== undefined
    );
};
/**
 * @param {$IJeiHelpers_} jeiHelpers 
 * @param {$IRecipeLayoutBuilder_} builder 
 * @param {$CustomJSRecipe_} recipe 
 * @param {$IFocusGroup_} focuses 
 */
let handleLookup = (jeiHelpers, builder, recipe, focuses) => {
    builder.addSlot("INPUT", 35, 45).addItemStack(Item.of(recipe.data.principal)).setSlotName("input");
    let recipeItems = recipe.data.inputs
    for (let index = 0; index < 8; index++) {
        if (recipeItems == null) {
            recipeItems = "air"
        }
    }
    builder.addSlot("INPUT", 35, 15).addItemStack(Item.of(recipeItems[0])).setSlotName("input");
    builder.addSlot("INPUT", 35, 75).addItemStack(Item.of(recipeItems[1])).setSlotName("input");
    builder.addSlot("INPUT", 5, 45).addItemStack(Item.of(recipeItems[2])).setSlotName("input");
    builder.addSlot("INPUT", 65, 45).addItemStack(Item.of(recipeItems[3])).setSlotName("input");

    builder.addSlot("INPUT", 15, 25).addItemStack(Item.of(recipeItems[4])).setSlotName("input");
    builder.addSlot("INPUT", 15, 65).addItemStack(Item.of(recipeItems[5])).setSlotName("input");
    builder.addSlot("INPUT", 55, 25).addItemStack(Item.of(recipeItems[6])).setSlotName("input");
    builder.addSlot("INPUT", 55, 65).addItemStack(Item.of(recipeItems[7])).setSlotName("input");

    builder.addSlot("OUTPUT", 125, 45).addItemStack(Item.of(recipe.data.output)).setSlotName("output");

    builder.addInvisibleIngredients("OUTPUT").addItemStack(Item.of(recipe.data.output));
};


JEIAddedEvents.registerRecipes((event) => {
    let cb = event.custom("custom:altar")
    for (const key of global.testRecipe) {
        cb.add({ output: key.outputItem, inputs: key.inputItems, principal: key.principalItem, desc: key.desc||''})
    }
});


