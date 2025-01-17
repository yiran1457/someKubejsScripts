//priority:999

let {function:tool} = Recipes
/**@type {new()cataclysm_amethyst_bless_ & Base_Recipes_ & Result_ & Ingredient_} */
let cataclysm_amethyst_bless = function(){
    Recipes.function.Base_Recipes.call(this,"cataclysm:amethyst_bless")
}
cataclysm_amethyst_bless.prototype = {
        setTime(time){
            this.json.time = time
            return this
        }
}
Function2ClassExtends(cataclysm_amethyst_bless,tool.Base_Recipes,tool.Result,tool.Ingredient)
/**@type {new()cataclysm_weapon_fusion_ & Base_Recipes_ & Result_} */
let cataclysm_weapon_fusion = function(){
    Recipes.function.Base_Recipes.call(this,"cataclysm:weapon_fusion")
}
cataclysm_weapon_fusion.prototype = {
    setIngredients(base,addition){
    this.json.base = tool.ItemStack2Json(base)
    this.json.addition = tool.ItemStack2Json(addition)
    return this
}
}
Function2ClassExtends(cataclysm_weapon_fusion,tool.Base_Recipes,tool.Result,tool.Ingredient)

Recipes.recipes.cataclysm = {
    get amethyst_bless$紫水晶祭坛祝福(){
        return new cataclysm_amethyst_bless().setIngredientPath("ingredients").modifyjson(json=>json.time = 120)
    },
    get weapon_fusion$机械融合砧(){
        return new cataclysm_weapon_fusion()
    }
}

ServerEvents.recipes(e=>{
    let {cataclysm} = Recipes.recipes
    cataclysm.amethyst_bless$紫水晶祭坛祝福
    .setTime(13)
    .setIngredient('acacia_sapling')
    .setResult('ae2:blue_covered_cable')
    .builder(e)
    cataclysm.weapon_fusion$机械融合砧
    .setResult('ae2:brown_paint_ball')
    .setIngredients('ae2:blue_paint_ball','alexscaves:abyssmarine_slab')
    .builder(e)
})