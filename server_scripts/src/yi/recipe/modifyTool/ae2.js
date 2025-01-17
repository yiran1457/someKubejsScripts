//priority:999

let {function:tool} = Recipes
/**@type {new()ae2_inscriber_ & Base_Recipes_ & Result_ } */
let ae2_inscriber = function(){
    tool.Base_Recipes.call(this,'ae2:inscriber')
}
ae2_inscriber.prototype = {
    setIngredients(/**@type {$ItemStack$Type} */Middle,/**@type {$ItemStack$Type} */Top,/**@type {$ItemStack$Type} */Bottom) {
        this.json.ingredients.middle = tool.ItemStack2Json(Middle)
        this.json.ingredients.top = tool.ItemStack2Json(Top)
        this.json.ingredients.bottom = tool.ItemStack2Json(Bottom)
        return this
    },
    keepBesideItem(/**@type {Boolean} */boolean) {
        if (boolean || boolean === undefined) { this.json.mode = "inscribe" }
        else { this.json.mode = "press" }
        return this
    }
}
Function2ClassExtends(ae2_inscriber,tool.Base_Recipes,tool.Result)

/**@type {new()Ingredient_ & Base_Recipes_ & Result_ } */
let ae2_charger = function(){
    tool.Base_Recipes.call(this,"ae2:charger")
}
Function2ClassExtends(ae2_charger,tool.Base_Recipes,tool.Result,tool.Ingredient)
Recipes.recipes.ae2 = {
    get inscriber$压印机() {
        return new ae2_inscriber().modifyjson(j=>{j.mode = "press";j.ingredients = {}})
    },
    get charger$充能器() {
        return new ae2_charger()
    }
}
