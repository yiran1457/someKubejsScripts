//priority:999

import { $ItemStack$Type } from "packages/net/minecraft/world/item/$ItemStack"
import { Result, Ingredient , Ingredients , Base_Recipes} from "./$基础配方构建工具"

let func = Recipes$Tool.function
//==============================
let cataclysm_basic = function(type){
    func.Base_Recipes.call(this,type)
    func.Result.call(this)
}
//==============================
Recipes$Tool.recipes.cataclysm = {
    get amethyst_bless$紫水晶祭坛祝福(){
        let Special = function(){
            cataclysm_basic.call(this,"cataclysm:amethyst_bless")
            func.Ingredient.call(this,"ingredients")
            this.setTime = function(time){
                this.super.json.time = time
                return this
            }
        }
        /**@type { Base_Recipes & Result & Ingredient & Special} */
        let returnmethod = new Special().modifyjson(json=>json.time = 120)
        return returnmethod
    },
    get weapon_fusion$机械融合砧(){
        let Special = function(){
            cataclysm_basic.call(this,"cataclysm:weapon_fusion")
            this.setIngredients = function(/**@type {$ItemStack$Type} */base,/**@type {$ItemStack$Type} */addition){
                this.super.json.base = func.ItemStack2Json(base)
                this.super.json.addition = func.ItemStack2Json(addition)
                return this
            }
        }
        /**@type { Base_Recipes & Result & Special } */
        let returnmethod = new Special()
        return returnmethod
    }
}