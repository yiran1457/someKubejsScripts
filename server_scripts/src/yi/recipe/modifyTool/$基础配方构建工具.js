//priority:1000

import { $ItemStack$Type } from "packages/net/minecraft/world/item/$ItemStack"
import { $FluidStackJS$Type } from "packages/dev/latvian/mods/kubejs/fluid/$FluidStackJS"

/**
 * @typedef {Recipes$Tool.function.Result} Result
 * @typedef {Recipes$Tool.function.Ingredient} Ingredient
 * @typedef {Recipes$Tool.function.Ingredients} Ingredients
 * @typedef {Recipes$Tool.function.Base_Recipes} Base_Recipes
 * @typedef {Recipes$Tool.function.FluidIngredient} FluidIngredient
 * @typedef {Recipes$Tool.function.FluidIngredients} FluidIngredients
 * @typedef {Recipes$Tool.function.FluidResult} FluidResult
 * @typedef {Recipes$Tool.function.Results} Results
 * @typedef {Recipes$Tool.function.FluidResults} FluidResults
 */

/**将Item.of() "(amount)x itemid" "itemid" (amount)x #tagid" "#tagid" 转换为json */
Recipes$Tool.function.ItemStack2Json = function (item) {
    if (typeof item == "string") {
        let count = 1
        if (/^[0-9]+$/.test(item.split('x ')[0])) {
            count = Number(item.split('x ')[0])
            item = item.split('x ')[1]
        }
        if (item[0] == "#") { item = { "tag": item.substring(1), count: count } }
        else { item = { "item": item, count: count } }
    }
    else {
        item = item.toJson().asMap()
        item.count = Number(item.count||1)
    }
    return item
}

/**将fluid.of() "(amount)x itemid" "itemid" "(amount)x #tagid" "#tagid 转换为json */
Recipes$Tool.function.FluidStack2Json = function (fluid) {
    if (typeof fluid == "string") {
        let amount = 1000
        if (/^[0-9]+$/.test(fluid.split('x ')[0])) {
            amount = Number(fluid.split('x ')[0])
            fluid = fluid.split('x ')[1]
        }
        if (fluid[0] == "#") { fluid = { "tag": fluid.substring(1), amount: amount } }
        else { fluid = { "fluid": fluid, amount: amount } }
    }
    else { fluid = fluid.toJson().asMap() }
    return fluid
}
//===================
Recipes$Tool.function.TestRecipes = function () {
    this.showjson = function () {
        console.log(this.super.json)
        Client.tell(this.super.json)
        return this
    }
}

Recipes$Tool.function.Base_Recipes = function (type) {
    this.super = { json: { type: type } }
    this.over = function (event) {
        event.custom(this.super.json)
    }
    this.modifyjson = function (/**@type {(json:{})=>{}}*/callback) {
        callback(this.super.json)
        return this
    }
}

//===================
Recipes$Tool.function.Ingredients = function (ingredientsname) {
    this.setIngredients = function (/**@type {$ItemStack$Type[]} */ingredients) {
        ingredients = ingredients.map(value => Recipes$Tool.function.ItemStack2Json(value))
        this.super.json[ingredientsname || 'ingredients'] = ingredients
        return this
    }
    this.addIngredient = function (/**@type {$ItemStack$Type} */ingredient) {
        this.super.json[ingredientsname || 'ingredients'] = this.super.json[ingredientsname || 'ingredients'] || []
        ingredient = Recipes$Tool.function.ItemStack2Json(ingredient)
        this.super.json[ingredientsname || 'ingredients'].push(ingredient)
        return this
    }
}

Recipes$Tool.function.FluidIngredients = function (ingredientsname) {
    this.setFluidIngredients = function (/**@type {$FluidStackJS$Type[]} */ingredients) {
        ingredients = ingredients.map(value => Recipes$Tool.function.FluidStack2Json(value))
        this.super.json[ingredientsname || 'ingredients'] = ingredients
        return this
    }
    this.addFluidIngredient = function (/**@type {$FluidStackJS$Type} */ingredient) {
        this.super.json[ingredientsname || 'ingredients'] = this.super.json[ingredientsname || 'ingredients'] || []
        ingredient = Recipes$Tool.function.FluidStack2Json(ingredient)
        this.super.json[ingredientsname || 'ingredients'].push(ingredient)
        return this
    }
}
//===================
Recipes$Tool.function.Ingredient = function (ingredientname) {
    this.setIngredient = function (/**@type {$ItemStack$Type} */ingredient) {
        ingredient = Recipes$Tool.function.ItemStack2Json(ingredient)
        this.super.json[ingredientname || 'ingredient'] = ingredient
        return this
    }
}

Recipes$Tool.function.FluidIngredient = function (ingredientname) {
    this.setFluidIngredient = function (/**@type {$FluidStackJS$Type} */ingredient) {
        ingredient = Recipes$Tool.function.FluidStack2Json(ingredient)
        this.super.json[ingredientname || 'ingredient'] = ingredient
        return this
    }
}
//===================
Recipes$Tool.function.Result = function (resultname , key2) {
    this.setResult = function (/**@type {$ItemStack$Type} */result) {
        result = Recipes$Tool.function.ItemStack2Json(result)
        if( key2 === undefined ){this.super.json[resultname || "result"] = result}
        else{this.super.json[resultname][key2] = result}
        return this
    }
}

Recipes$Tool.function.FluidResult = function (resultname , key2) {
    this.setFluidResult = function (/**@type {$ItemStack$Type} */result) {
        result = Recipes$Tool.function.FluidStack2Json(result)
        if( key2 === undefined ){this.super.json[resultname || "result"] = result}
        else{this.super.json[resultname][key2] = result}
        return this
    }
}
//===================
Recipes$Tool.function.Results = function (resultsname , key2) {
    this.setResults = function (/**@type {$ItemStack$Type[]} */results) {
        results = results.map(value => Recipes$Tool.function.ItemStack2Json(value))
        if( key2 === undefined ){this.super.json[resultsname || "result"] = results}
        else{this.super.json[resultsname][key2] = results}
        return this
    }
    this.addResult = function (/**@type {$ItemStack$Type} */result) {
        result = Recipes$Tool.function.ItemStack2Json(result)
        if( key2 === undefined ){
            this.super.json[resultsname || 'result'] = this.super.json[resultsname || 'results'] || []
            this.super.json[resultsname || 'result'].push(result)
        }
        else{
            this.super.json[resultsname][key2] = this.super.json[resultsname][key2] || []
            this.super.json[resultsname][key2].push(result)
        }
        return this
    }
}

Recipes$Tool.function.FluidResults = function (resultsname , key2) {
    this.setFluidResults = function (/**@type {$FluidStackJS$Type[]} */results) {
        results = results.map(value => Recipes$Tool.function.FluidStack2Json(value))
        if( key2 === undefined ){this.super.json[resultsname || "result"] = results}
        else{this.super.json[resultsname][key2] = results}
        return this
    }
    this.addFluidResult = function (/**@type {$FluidStackJS$Type} */result) {
        result = Recipes$Tool.function.FluidStack2Json(result)
        if( key2 === undefined ){
            this.super.json[resultsname || 'result'] = this.super.json[resultsname || 'results'] || []
            this.super.json[resultsname || 'result'].push(result)
        }
        else{
            this.super.json[resultsname][key2] = this.super.json[resultsname][key2] || []
            this.super.json[resultsname][key2].push(result)
        }
        return this
    }
}

