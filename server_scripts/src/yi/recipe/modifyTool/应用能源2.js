//priority:999

import { $ItemStack$Type } from "packages/net/minecraft/world/item/$ItemStack"
import { Result , Ingredient , Base_Recipes} from "./$基础配方构建工具"


Recipes$Tool.recipes.ae2 = {
    get inscriber$压印机() {
        
        let Special$inscriber = function () {
            Recipes$Tool.function.Base_Recipes.call(this,'ae2:inscriber')
            Recipes$Tool.function.Result.call(this)
            this.setInputItem = function (/**@type {$ItemStack$Type} */Middle,/**@type {$ItemStack$Type} */Top,/**@type {$ItemStack$Type} */Bottom) {
                this.super.json.ingredients = {}
                this.super.json.mode = "press"
                this.super.json.ingredients.middle = Recipes$Tool.function.ItemStack2Json(Middle)
                this.super.json.ingredients.top = Recipes$Tool.function.ItemStack2Json(Top)
                this.super.json.ingredients.bottom = Recipes$Tool.function.ItemStack2Json(Bottom)
                return this
            }
            this.keepBesideItem = function (/**@type {Boolean} */boolean) {
                if (boolean || boolean === undefined) { this.super.json.mode = "inscribe" }
                else { this.super.json.mode = "press" }
                return this
            }
        }
        /**@type { Base_Recipes & Result & Special$inscriber } */
        let returnmethod = new Special$inscriber()
        return returnmethod
    },
    get charger$充能器() {
        /**@type { Base_Recipes & Result & Ingredient} */
        let returnmethod = function(){
            Recipes$Tool.function.Base_Recipes.call(this,"ae2:charger")
            Recipes$Tool.function.Result.call(this)
            Recipes$Tool.function.Ingredient.call(this)
        }
        returnmethod = new returnmethod()
        return returnmethod
    }
}