//priority:999

import { $ItemStack$Type } from "packages/net/minecraft/world/item/$ItemStack"
import { Result , Ingredient , Base_Recipes} from "./$基础配方构建工具"

let func = Recipes$Tool.function
//================================
let basic_dragonforge = function(){
    func.Base_Recipes.call(this,"iceandfire:dragonforge")
    func.Result.call(this)
    func.Ingredient.call(this,'input')
    this.setBloodSlot = function(/**@type {$ItemStack$Type} */ingredient){
        ingredient = func.ItemStack2Json(ingredient)
        this.super.json.blood = ingredient
        return this
    }
    this.setTime = function(time){
        this.super.json.cook_time = time
        return this
    }
}
//================================
Recipes$Tool.recipes.iceandfire = {
    /**@type { Base_Recipes & Result & Ingredient & basic_dragonforge} */
    get icedragonforge$冰龙锻造(){
        return new basic_dragonforge().modifyjson(json=>{json.dragon_type = 'ice';json.cook_time = 600})
    },
    /**@type { Base_Recipes & Result & Ingredient & basic_dragonforge} */
    get lightningdragonforge$雷龙锻造(){
        return new basic_dragonforge().modifyjson(json=>{json.dragon_type = 'lightning';json.cook_time = 600})
    },
    /**@type { Base_Recipes & Result & Ingredient & basic_dragonforge} */
    get firedragonforge$火龙锻造(){
        return new basic_dragonforge().modifyjson(json=>{json.dragon_type = 'fire';json.cook_time = 600})
    },
}


