const { $RecipeType } = require("packages/mezz/jei/api/recipe/$RecipeType")

//为配方添加 工作方块
JEIAddedEvents.registerRecipeCatalysts(e => {
    /**@type {(recipeType,Items:Special.Item[])} */
    let Items_In_RecipesTab = (recipeType, Items) => {
        e.data['addRecipeCatalysts(mezz.jei.api.recipe.RecipeType,net.minecraft.world.item.ItemStack[])'](recipeType, Items)
    }
    e.data.getJeiHelpers().getAllRecipeTypes().forEach(/**@param {$RecipeType} recipeType */recipeType => {
        switch (recipeType.getUid().toString()) {
            case 'custom:altar':
                Items_In_RecipesTab(recipeType, ['ars_nouveau:arcane_pedestal', 'ars_nouveau:arcane_platform'])
                break
            case 'refurbished_furniture:freezer_solidifying':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:light_fridge', 'refurbished_furniture:dark_fridge'])
                break
            case 'refurbished_furniture:cutting_board_slicing':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:oak_cutting_board', 'refurbished_furniture:spruce_cutting_board', 'refurbished_furniture:oak_cutting_board', 'refurbished_furniture:birch_cutting_board', 'refurbished_furniture:jungle_cutting_board', 'refurbished_furniture:dark_oak_cutting_board', 'refurbished_furniture:mangrove_cutting_board', 'refurbished_furniture:cherry_cutting_board', 'refurbished_furniture:warped_cutting_board', 'refurbished_furniture:crimson_cutting_board'])
                break
            case 'refurbished_furniture:frying_pan_cooking':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:frying_pan', 'refurbished_furniture:light_stove', 'refurbished_furniture:dark_stove'])
                break
            case 'refurbished_furniture:microwave_heating':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:light_microwave', 'refurbished_furniture:dark_microwave'])
                break
            case 'refurbished_furniture:toaster_heating':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:dark_toaster', 'refurbished_furniture:light_toaster'])
                break
            case 'refurbished_furniture:grill_cooking':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:red_grill'])
                break
            case 'refurbished_furniture:cutting_board_combining':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:oak_cutting_board', 'refurbished_furniture:spruce_cutting_board', 'refurbished_furniture:oak_cutting_board', 'refurbished_furniture:birch_cutting_board', 'refurbished_furniture:jungle_cutting_board', 'refurbished_furniture:dark_oak_cutting_board', 'refurbished_furniture:mangrove_cutting_board', 'refurbished_furniture:cherry_cutting_board', 'refurbished_furniture:warped_cutting_board', 'refurbished_furniture:crimson_cutting_board'])
                break
            case 'refurbished_furniture:workbench_constructing':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:workbench'])
                break
            case 'refurbished_furniture:oven_baking':
                Items_In_RecipesTab(recipeType, ['refurbished_furniture:light_stove', 'refurbished_furniture:dark_stove'])
                break
        }
    })
})
