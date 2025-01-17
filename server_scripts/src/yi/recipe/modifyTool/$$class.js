// ignored : true
//以class形式提供补全


//=============================================
//  Basic Recipe Builder Tool
//=============================================

class Base_Recipes_{
    constructor(/**@type {string} */type){}
    modifyjson(/**@type {(json:{})=>{}}*/callback){return this}
    builder(event) {}
}
class Ingredient_{
    constructor(){}
    setIngredientPath(/**@type {string} */path) {return this}
    setIngredient(/**@type {Special.Item} */ingredient) {return this}
}
class Ingredients_{
    constructor(){}
    setIngredientsPath(/**@type {string} */path) {return this}
    setIngredients(/**@type {Special.Item[]} */ingredients) {return this}
    addIngredient(/**@type {Special.Item} */ingredient) {return this}
}
class Result_ {
    constructor(){}
    setResultPath(/**@type {string} */Path1,/**@type {string} */Path2) {return this}
    setResult(/**@type {Special.Item} */result) {return this}


}
class Results_ {
    constructor(){}
    setResultsPath(/**@type {string} */Path1,/**@type {string} */Path2) {return this}
    setResults(/**@type {Special.Item[]} */results) {return this}
    addResult(/**@type {Special.Item} */result) {return this}
}
class FluidIngredient_{
    constructor(){}
    setFluidIngredientPath(/**@type {string} */path) {return this}
    setFluidIngredient(/**@type {Special.Fluid} */ingredient) {return this}
}
class FluidIngredients_{
    constructor(){}
    setFluidIngredientsPath(/**@type {string} */path) {return this}
    setFluidIngredients(/**@type {Special.Fluid[]} */ingredients) {return this}
    addFluidIngredient(/**@type {Special.Fluid} */ingredient) {return this}
}
class FluidResult_ {
    constructor(){}
    setFluidResultPath(/**@type {string} */Path1,/**@type {string} */Path2) {return this}
    setFluidResult(/**@type {Special.Fluid} */result) {return this}


}
class FluidResults_ {
    constructor(){}
    setFluidResultsPath(/**@type {string} */Path1,/**@type {string} */Path2) {return this}
    setFluidResults(/**@type {Special.Fluid[]} */results) {return this}
    addFluidResult(/**@type {Special.Fluid} */result) {return this}
}


//=============================================
//  Special Recipe Builder Tool
//=============================================
class iceandfire_dragonforge_ {
    constructor() { }
    setBloodSlot(/**@type {Special.Item} */ingredient) { return this }
    setTime(/**@type {number} */time) { return this }
}
class cataclysm_amethyst_bless_ {
    constructor() { }
    setTime(/**@type {number} */time) { return this }
}
class cataclysm_weapon_fusion_ {
    constructor() { }
    setIngredients(/**@type {Special.Item} */base,/**@type {Special.Item} */addition) { return this }
}
class ae2_inscriber_ {
    constructor() { }
    setIngredients(/**@type {Special.Item} */Middle,/**@type {Special.Item} */Top,/**@type {Special.Item} */Bottom) {return this}
    keepBesideItem(/**@type {Boolean} */boolean) {return this}
}
class MrCrayfish_Result_{
    constructor() { }
    setResult(/**@type {Special.Item} */result) {return this}
}
class MrCrayfish_Time_{
    constructor(){}
    setTime(/**@type {Number} */time) {return this}
}
//=============================================
//  Tetra
//=============================================
//effect
/**
 * @typedef {{
 * "intuit":直觉等级
 * "stabilizing":稳定性
 * 'art_of_forging:life_fiber_loss':[ buff等级 , 时长 ]
 * "criticalStrike":[ 爆率 , 爆伤 ]
 * "art_of_forging:stormcaller":[ 闪电数量 , 召唤概率 ]
 * "art_of_forging:decaying":[ 凋零等级 , 凋零时间 ]
 * "art_of_forging:life_steal":[ 回复量 , 回复概率 ]
 * "janking":[ 拾取半径 , 末影螨出现概率 ]
 * "art_of_forging:evoking_maw":unknown
 * "sculkTaint":unknown
 * "art_of_forging:sonic_shock":伤害
 * "art_of_forging:dragon_mist":[ 持续时间 , 召唤概率 ]
 * "unbreaking":耐久等级
 * "truesweep":任意数字启用
 * "art_of_forging:vengeance":[ 加伤 , 血量阈值 ]
 * "abilityCombo":[ unknown , unknown ]
 * "abilityExhilarated":[ unknown , unknown ]
 * "severing":[ 概率 , 最大层数 ]
 * "sweeping":横扫倍数
 * "armorPenetration":穿甲比例
 * "art_of_forging:devouring":遭受伤害
 * "art_of_forging:knockback":击退等级
 * "art_of_forging:hubris":伤害加成
 * "art_of_forging:slaughtering":[ 加成 , 血量阈值 ]
 * }} effects_
 */
//attribute
/**
 * @typedef {{"forge:block_reach","forge:entity_reach","forge:swim_speed","minecraft:generic.armor","minecraft:generic.armor_toughness","minecraft:generic.attack_damage","minecraft:generic.attack_knockback","minecraft:generic.attack_speed","minecraft:generic.luck","minecraft:generic.max_health","minecraft:generic.movement_speed","ars_nouveau:ars_nouveau.perk.mana_regen","ars_nouveau:ars_nouveau.perk.max_mana","ars_nouveau:ars_nouveau.perk.spell_damage","ars_nouveau:ars_nouveau.perk.warding","ars_nouveau:ars_nouveau.perk.wixie"}} attributes_
 */
//tool_type
/**
 * @typedef {{"axe_dig","shovel_dig","pickaxe_dig","hammer_dig","hoe_dig","cut","pry"}} tetra_tool_type_
 */


class basic_tetra_ {
    constructor(){}
    modifyJson(/**@type {(json:{})=>{}} */callback){return this}
    showJson(){return this}
}

class tetra_materials_ extends basic_tetra_ {
    constructor(){}
    builder(event){}
    setReplace(/**@type {Boolean} */boolean){return this}
    setAttributes(/**@type {attributes_} */attributes){return this}
    setEffects(/**@type {effects_} */effects){return this}
    sethidden(/**@type {Boolean} */boolean){return this}
    setRequiredTools(/**@type {tetra_tool_type_} */requiredTools){return this}
    setExperienceCost(/**@type {number} */cost){return this}
}


