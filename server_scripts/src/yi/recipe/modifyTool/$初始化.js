//priority:1001
/**
 * @typedef {$OutputItem_} item
 */
var mna$setting = {}
var Recipes$Tool = {}
Recipes$Tool.recipes = {}
Recipes$Tool.function = {}
var Recipes = {}
Recipes.recipes = {}
Recipes.function = {}

const Function2ClassExtends = function(target){
    for(let i in arguments){
        if(arguments[i]!=target){
            Object.assign(target.prototype,arguments[i].prototype)
        }
    }
}