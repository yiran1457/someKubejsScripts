//priority:999

import { $ItemStack$Type } from "packages/net/minecraft/world/item/$ItemStack"
import { Ingredient , Ingredients , Base_Recipes} from "./$基础配方构建工具"
//==============================================================================
let MrCrayfishResult = function () {
    this.setResult = function (/**@type {$ItemStack$Type} */result) {
        result = Recipes$Tool.function.ItemStack2Json(result)
        for (const key in result) {
            this.super.json[key] = result[key]
        }
        this.super.json.result = this.super.json.item
        delete this.super.json.item
        return this
    }
}
let MrCrayfishCategory = function (type,category) {
    Recipes$Tool.function.Base_Recipes.call(this,type)
    Recipes$Tool.function.Ingredient.call(this)
    MrCrayfishResult.call(this)
    this.over = function (event) {
        this.super.json.category = category
        this.super.json.time = this.super.json.time || 200
        event.custom(this.super.json)
    }
    this.settime = function (time) {
        this.super.json.time = time
        return this
    }
}
let MrCrayfish_Ingredient_s_Result = function (type , ingredienttype , ingredientname){
    Recipes$Tool.function.Base_Recipes.call(this,type),
    Recipes$Tool.function[ingredienttype].call(this,ingredientname),
    MrCrayfishResult.call(this)
}
//==============================================================================
Recipes$Tool.recipes.MrCrayfish = {
    get combining$菜品组装() {
        /**@type {Base_Recipes & Ingredients & MrCrayfishResult} */
        let combining = new MrCrayfish_Ingredient_s_Result("refurbished_furniture:cutting_board_combining",'Ingredients')
        return combining
    },
    get slicing$切片() {
        /**@type { Base_Recipes & Ingredient & MrCrayfishResult} */
        let slicing = new MrCrayfish_Ingredient_s_Result("refurbished_furniture:cutting_board_slicing",'Ingredient')
        return slicing
    },
    get freezing$冰冻() {
        /**@type { Base_Recipes & Ingredient & MrCrayfishResult & MrCrayfishCategory} */
        let freezing = new MrCrayfishCategory("refurbished_furniture:freezer_solidifying","blocks")
        return freezing
    },
    get frying$煎炸() {
        /**@type { Base_Recipes& Ingredient & MrCrayfishResult & MrCrayfishCategory} */
        let frying = new MrCrayfishCategory('refurbished_furniture:frying_pan_cooking',"food")
        return frying
    },
    get heating$加热() {
        /**@type { Base_Recipes & Ingredient & MrCrayfishResult & MrCrayfishCategory} */
        let heating = new MrCrayfishCategory('refurbished_furniture:microwave_heating',"food")
        return heating
    },
    get baking$烘焙() {
        /**@type { Base_Recipes & Ingredient & MrCrayfishResult & MrCrayfishCategory} */
        let baking = new MrCrayfishCategory('refurbished_furniture:oven_baking',"food")
        return baking
    },
    get toasting$烤面包() {
        /**@type { Base_Recipes & Ingredient & MrCrayfishResult & MrCrayfishCategory} */
        let toasting = new MrCrayfishCategory('refurbished_furniture:toaster_heating',"food")
        return toasting
    },
    get constructing$组装() {
        /**@type { Base_Recipes & Ingredients & MrCrayfishResult} */
        let constructing = new MrCrayfish_Ingredient_s_Result("refurbished_furniture:workbench_constructing",'Ingredients',"materials")
        return constructing
    }
}
//==============================================================================