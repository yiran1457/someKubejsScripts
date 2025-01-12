//priority:1000


//=============================================
//  Basic
//=============================================
/**@type {new (type:string) Base_Recipes_} */
Recipes.function.Base_Recipes = function (type) {
    this.json = { type: type }
}
Recipes.function.Base_Recipes.prototype = {
    modifyjson(callback) {
        callback(this.json)
        return this
    }, builder(event) {
        event.custom(this.json)
    }
}


//=============================================
//  Item
//=============================================

/**将Item.of() "(amount)x itemid" "itemid" (amount)x #tagid" "#tagid" 转换为json
 * @type {(item:$ItemStack_)=>{count:number, item?:string, tag?:string, Type?:string}} */
Recipes.function.ItemStack2Json = function (item) {
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
        item.count = Number(item.count || 1)
    }
    return item
}
/**@type {Ingredient_} */
Recipes.function.Ingredient = function () { }
Recipes.function.Ingredient.prototype = {
    setIngredientPath(path) {
        this.IingredientPath = path
        return this
    },
    setIngredient(/**@type {$ItemStack$Type} */ingredient) {
        ingredient = Recipes.function.ItemStack2Json(ingredient)
        this.json[this.IingredientPath || 'ingredient'] = ingredient
        return this
    }
}
/**@type {Ingredients_} */
Recipes.function.Ingredients = function () { }
Recipes.function.Ingredients.prototype = {
    setIngredientsPath(path) {
        this.IingredientsPath = path
        return this
    },
    setIngredients(/**@type {$ItemStack$Type[]} */ingredients) {
        ingredients = ingredients.map(value => Recipes$Tool.function.ItemStack2Json(value))
        this.json[this.IingredientsPath || 'ingredients'] = ingredients
        return this
    },
    addIngredient(/**@type {$ItemStack$Type} */ingredient) {
        this.json[this.IingredientsPath || 'ingredients'] = this.json[this.IingredientsPath || 'ingredients'] || []
        ingredient = Recipes.function.ItemStack2Json(ingredient)
        this.json[this.IingredientsPath || 'ingredients'].push(ingredient)
        return this
    }
}
/**@type {Result_} */
Recipes.function.Result = function () { }
Recipes.function.Result.prototype = {
    setResultPath(Path1, Path2) {
        this.IresultPath1 = Path1
        this.IresultPath2 = Path2
        return this
    },
    setResult(/**@type {$ItemStack$Type} */result) {
        result = Recipes.function.ItemStack2Json(result)
        if (this.IresultPath2 === undefined) { this.json[this.IresultPath1 || "result"] = result }
        else { this.json[this.IresultPath1] = {}; this.json[this.IresultPath1][this.IresultPath2] = result }
        return this
    }
}
/**@type {Results_} */
Recipes.function.Results = function (resultsname, key2) { }
Recipes.function.Results.prototype = {
    setResultsPath(Path1, Path2) {
        this.IresultsPath1 = Path1
        this.IresultsPath2 = Path2
        return this
    },
    setResults(/**@type {$ItemStack$Type[]} */results) {
        results = results.map(value => Recipes$Tool.function.ItemStack2Json(value))
        if (key2 === undefined) { this.json[this.IresultsPath1 || "results"] = results }
        else { this.json[this.IresultsPath1][IresultsPath2] = results }
        return this
    },
    addResult(/**@type {$ItemStack$Type} */result) {
        result = Recipes$Tool.function.ItemStack2Json(result)
        if (key2 === undefined) {
            this.json[this.IresultsPath1 || 'results'] = this.json[this.IresultsPath1 || 'results'] || []
            this.json[this.IresultsPath1 || 'results'].push(result)
        }
        else {
            this.json[this.IresultsPath1][IresultsPath2] = this.json[this.IresultsPath1][IresultsPath2] || []
            this.json[this.IresultsPath1][IresultsPath2].push(result)
        }
        return this
    }
}
//=============================================
//  Fluid
//=============================================

/**将fluid.of() "(amount)x itemid" "itemid" "(amount)x #tagid" "#tagid 转换为json 
 * @type {(fluid:$FluidStackJS_)=>{amount:number, fluid?:string, tag?:string}} */
Recipes.function.FluidStack2Json = function (fluid) {
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
/**@type {FluidIngredient_} */
Recipes.function.FluidIngredient = function () { }
Recipes.function.FluidIngredient.prototype = {
    setFluidIngredientPath(path) {
        this.FingredientPath = path
        return this
    },
    setFluidIngredient(/**@type {Special.Fluid} */ingredient) {
        ingredient = Recipes.function.FluidStack2Json(ingredient)
        this.json[this.FingredientPath || 'ingredient'] = ingredient
        return this
    }
}
/**@type {FluidIngredients_} */
Recipes.function.FluidIngredients = function () { }
Recipes.function.FluidIngredients.prototype = {
    setFluidIngredientsPath(path) {
        this.FingredientsPath = path
        return this
    },
    setFluidIngredients(/**@type {Special.Fluid[]} */ingredients) {
        ingredients = ingredients.map(value => Recipes.function.FluidStack2Json(value))
        this.json[this.FingredientsPath || 'ingredients'] = ingredients
        return this
    },
    addFluidIngredient(/**@type {Special.Fluid} */ingredient) {
        this.json[this.FingredientsPath || 'ingredients'] = this.json[this.FingredientsPath || 'ingredients'] || []
        ingredient = Recipes.function.FluidStack2Json(ingredient)
        this.json[this.FingredientsPath || 'ingredients'].push(ingredient)
        return this
    }
}
/**@type {FluidResult_} */
Recipes.function.FluidResult = function () { }
Recipes.function.FluidResult.prototype = {
    setFluidResultPath(Path1, Path2) {
        this.FresultPath1 = Path1
        this.FresultPath2 = Path2
        return this
    },
    setFluidResult(/**@type {Special.Fluid} */result) {
        result = Recipes.function.ItemStack2Json(result)
        if (this.FresultPath2 === undefined) { this.json[this.FresultPath1 || "result"] = result }
        else { this.json[this.FresultPath1] = {}; this.json[this.FresultPath1][this.FresultPath2] = result }
        return this
    }
}
/**@type {FluidResults_} */
Recipes.function.FluidResults = function (resultsname, key2) { }
Recipes.function.FluidResults.prototype = {
    setFluidResultsPath(Path1, Path2) {
        this.FresultPath1 = Path1
        this.FresultPath2 = Path2
        return this
    },
    setFluidResults(/**@type {Special.Fluid[]} */results) {
        results = results.map(value => Recipes.function.FluidStack2Json(value))
        if (key2 === undefined) { this.json[this.FresultPath1 || "results"] = results }
        else { this.json[this.FresultPath1][FresultPath2] = results }
        return this
    },
    addFluidResult(/**@type {Special.Fluid} */result) {
        result = Recipes.function.FluidStack2Json(result)
        if (this.FresultPath2 === undefined) {
            this.json[this.FresultPath1 || 'results'] = this.json[this.FresultPath1 || 'results'] || []
            this.json[this.FresultPath1 || 'results'].push(result)
        }
        else {
            this.json[this.FresultPath1][this.FresultPath2] = this.json[this.FresultPath1][this.FresultPath2] || []
            this.json[this.FresultPath1][this.FresultPath2].push(result)
        }
        return this
    }
}
/**
 * @type {new(type)=>FluidResults_&FluidResult_&Base_Recipes_&FluidIngredient_&FluidIngredients_}
 */
let xxx = function(type){
Recipes.function.Base_Recipes.call(this,type)
}
Object.assign(xxx.prototype,
    Recipes.function.FluidIngredient.prototype,
    Recipes.function.FluidIngredients.prototype,
    Recipes.function.FluidResult.prototype,
    Recipes.function.FluidResults.prototype,
    Recipes.function.Base_Recipes.prototype)

    new xxx(1).setFluidIngredient('create:flowing_tea').addFluidResult('sophisticatedcore:xp_still').modifyjson(j=>Client.tell(j))
