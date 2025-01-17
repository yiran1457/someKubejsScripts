//priority:999

let { function: tool } = Recipes

let MrCrayfish_Result = function () { }
MrCrayfish_Result.prototype = {
    setResult(/**@type {$ItemStack$Type} */result) {
        result = tool.ItemStack2Json(result)
        Object.assign(this.json, result)
        this.json.result = this.json.item
        delete this.json.item
        return this
    }
}
let MrCrayfish_Time = function () { }
MrCrayfish_Time.prototype = {
    setTime(/**@type {number} */time) {
        this.json.time = time
        return this
    }
}
/**@type {new(type:string)Base_Recipes_ & MrCrayfish_Result_ & MrCrayfish_Time_ & Ingredient_} */
let MrCrayfish_needTime = function (type) {
    tool.Base_Recipes.call(this, type)
}
Function2ClassExtends(MrCrayfish_needTime, tool.Base_Recipes, MrCrayfish_Time, MrCrayfish_Result, tool.Ingredient)

/**@type {new()Base_Recipes_ & MrCrayfish_Result_ & Ingredient_} */
let MrCrayfish_slicing = function () {
    tool.Base_Recipes.call(this, "refurbished_furniture:cutting_board_slicing")
}
Function2ClassExtends(MrCrayfish_slicing, tool.Base_Recipes, MrCrayfish_Result, tool.Ingredient)

/**@type {new(type:string)Base_Recipes_ & MrCrayfish_Result_ & Ingredients_} */
let MrCrayfish_Other = function (type) {
    tool.Base_Recipes.call(this, type)
}
Function2ClassExtends(MrCrayfish_Other, tool.Base_Recipes, MrCrayfish_Result, tool.Ingredients)




Recipes.recipes.MrCrayfish = {
    get freezing$冰冻() {
        return new MrCrayfish_needTime("refurbished_furniture:freezer_solidifying").modifyjson(j => { j.time = 200; j.category = 'blocks' })
    },
    get frying$煎炸() {
        return new MrCrayfish_needTime('refurbished_furniture:frying_pan_cooking').modifyjson(j => { j.time = 200; j.category = 'food' })
    },
    get heating$加热() {
        return new MrCrayfish_needTime('refurbished_furniture:microwave_heating').modifyjson(j => { j.time = 200; j.category = 'food' })
    },
    get baking$烘焙() {
        return new MrCrayfish_needTime('refurbished_furniture:oven_baking').modifyjson(j => { j.time = 200; j.category = 'food' })
    },
    get toasting$烤面包() {
        return new MrCrayfish_needTime('refurbished_furniture:toaster_heating').modifyjson(j => { j.time = 200; j.category = 'food' })
    },
    get slicing$切片() {
        return new MrCrayfish_slicing()
    },
    get combining$菜品组装() {
        return new MrCrayfish_Other("refurbished_furniture:cutting_board_combining")
    },
    get constructing$组装() {
        return new MrCrayfish_Other("refurbished_furniture:workbench_constructing").setIngredientsPath("materials")
    }
}
