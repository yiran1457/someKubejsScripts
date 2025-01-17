//priority:999

let {function:tool} = Recipes
/**@type {new()iceandfire_dragonforge_ & Base_Recipes_ & Result_ & Ingredient_} */
let iceandfire_dragonforge = function(){
    Recipes.function.Base_Recipes.call(this,"iceandfire:dragonforge")
}
iceandfire_dragonforge.prototype = {
        setBloodSlot(/**@type {$ItemStack$Type} */ingredient){
            ingredient = tool.ItemStack2Json(ingredient)
            this.json.blood = ingredient
            return this
        },
        setTime(time){
            this.json.cook_time = time
            return this
        }
}
Object.assign(iceandfire_dragonforge.prototype,
    tool.Base_Recipes.prototype,
    tool.Result.prototype,
    tool.Ingredient.prototype
)

Recipes.recipes.iceandfire = {
    get icedragonforge$冰龙锻造(){
        return new iceandfire_dragonforge().setIngredientPath('input').modifyjson(json=>{json.dragon_type = 'ice';json.cook_time = 600})
    },
    get lightningdragonforge$雷龙锻造(){
        return new iceandfire_dragonforge().setIngredientPath('input').modifyjson(json=>{json.dragon_type = 'lightning';json.cook_time = 600})
    },
    get firedragonforge$火龙锻造(){
        return new iceandfire_dragonforge().setIngredientPath('input').modifyjson(json=>{json.dragon_type = 'fire';json.cook_time = 600})
    }
}
