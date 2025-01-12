//priority:999

import { $ItemStack$Type } from "packages/net/minecraft/world/item/$ItemStack"
import { $FluidStackJS$Type } from "packages/dev/latvian/mods/kubejs/fluid/$FluidStackJS"
import { Result , FluidResult , Results , Ingredient , FluidIngredient , Base_Recipes} from "./$基础配方构建工具"

let func = Recipes$Tool.function
//========================================================
let integrateddynamics_basic_one = function(type){
    func.Base_Recipes.call(this,type)
    func.Ingredient.call(this,'item')
    func.FluidIngredient.call(this,'fluid')
    func.Result.call(this,'result','item')
    func.FluidResult.call(this,'result','fluid')
}
let integrateddynamics_basic_two = function(type){
    func.Base_Recipes.call(this,type)
    func.Ingredient.call(this,'item')
    func.TestRecipes.call(this)
    func.FluidResult.call(this,'result','fluid')
    this.addResult = function (/**@type {$ItemStack$Type} */result,chance) {
        result = Recipes$Tool.function.ItemStack2Json(result)
        if (chance !== undefined) { result.chance = chance }
        if (result.item !== undefined){
            let newitem = {}
            for (let key in result) {
                if (key != 'chance') {
                    newitem[key] = result[key]
                    delete result[key]
                }
            }
            result.item = newitem
        }
        this.super.json.result.items = this.super.json.result.items || []
        this.super.json.result.items.push(result)
        return this
    }
}
//========================================================
Recipes$Tool.recipes.integrateddynamics = {
    get drying_basin$烘干机(){
        let Special = function(){
            integrateddynamics_basic_one.call(this,'integrateddynamics:drying_basin')
            this.setTime = function(time){
                this.super.json.duration = time
                return this
            }
        }
        /**@type { Result & FluidResult & Ingredient & FluidIngredient & Base_Recipes & Special} */
        let returnmethod = new Special().modifyjson(json=>{json.duration = 120;json.result={}})
        return returnmethod
    },
    get mechanical_drying_basin$电动烘干机() {
        let Special = function(){
            integrateddynamics_basic_one.call(this,'integrateddynamics:mechanical_drying_basin')
            this.setTime = function(time){
                this.super.json.duration = time
                return this
            }
        }
        /**@type { Result & FluidResult & Ingredient & FluidIngredient & Base_Recipes & Special} */
        let returnmethod = new Special().modifyjson(json=>{json.duration = 20;json.result={}})
        return returnmethod
    },
    get squeezer$挤压机() {
        /**@type { FluidResult & Results & Ingredient & Base_Recipes & Recipes$Tool.function.TestRecipes} */
        let returnmethod = new integrateddynamics_basic_two("integrateddynamics:squeezer").modifyjson(json=>json.result={})
        return returnmethod
    },
    get mechanical_squeezer$电动挤压机(){
        let Special = function(){
            integrateddynamics_basic_two.call(this,"integrateddynamics:mechanical_squeezer")
            this.setTime = function(time){
                this.super.json.duration = time
                return this
            }
        }
        /**@type { FluidResult & Results & Ingredient & Base_Recipes & Recipes$Tool.function.TestRecipes & Special} */
        let returnmethod = new Special().modifyjson(json=>{json.duration = 20;json.result={}})
        return returnmethod
    }
}
yi$tool.integrateddynamics = {
    recipes: {
        get drying_basin$烘干机() {
            function index() {
                this.json =
                {
                    "type": "integrateddynamics:drying_basin",
                    "duration": 400,
                    "result": {}
                }
            }
            /**设置加工时间,不填为400t(20s) */
            index.prototype.setTime = function (time) {
                this.json.duration = time
                return this
            }
            index.prototype.addFluid = function (/**@type {$FluidStackJS$Type}*/fluid, amount) {
                if (typeof fluid != "string"){
                    [ fluid , amount ] = [ fluid.id , fluid.amount ]
                }
                !amount ? amount = 1000:{}
                this.json.fluid = {}
                this.json.fluid.fluid = fluid
                this.json.fluid.amount = amount
                return this
            }
            index.prototype.addItem = function (/**@type {$ItemStack$Type}*/item) {
                this.json.item = item
                return this
            }
            index.prototype.addOutItem = function (/**@type {$ItemStack$Type}*/item) {
                this.json.result.item = item
                return this
            }
            index.prototype.addOutFluid = function (/**@type {$FluidStackJS$Type}*/fluid, amount) {
                if (typeof fluid != "string"){
                    [ fluid , amount ] = [ fluid.id , fluid.amount ]
                }
                !amount ? amount = 1000:{}
                this.json.result.fluid = {}
                this.json.result.fluid.fluid = fluid
                this.json.result.fluid.amount = amount
                return this
            }
            index.prototype.over = function (event) {
                event.custom(this.json)
            }
            return new index()
        },
        get mechanical_drying_basin$电动烘干机() {
            function index() {
                this.json =
                {
                    "type": "integrateddynamics:mechanical_drying_basin",
                    "duration": 20,
                    "result": {
                    }
                }
            }
            /**设置加工时间,不填为20t(1s) */
            index.prototype.setTime = function (time) {
                this.json.duration = time
                return this
            }
            index.prototype.addFluid = function (/**@type {$FluidStackJS$Type}*/fluid, amount) {
                if (typeof fluid != "string"){
                    [ fluid , amount ] = [ fluid.id , fluid.amount ]
                }
                !amount ? amount = 1000:{}
                this.json.fluid = {}
                this.json.fluid.fluid = fluid
                this.json.fluid.amount = amount
                return this
            }
            index.prototype.addItem = function (/**@type {$ItemStack$Type}*/item) {
                this.json.item = item
                return this
            }
            index.prototype.addOutItem = function (/**@type {$ItemStack$Type}*/item) {
                this.json.result.item = item
                return this
            }
            index.prototype.addOutFluid = function (/**@type {$FluidStackJS$Type}*/fluid, amount) {
                if (typeof fluid != "string"){
                    [ fluid , amount ] = [ fluid.id , fluid.amount ]
                }
                !amount ? amount = 1000:{}
                this.json.result.fluid = {}
                this.json.result.fluid.fluid = fluid
                this.json.result.fluid.amount = amount
                return this
            }
            index.prototype.over = function (event) {
                event.custom(this.json)
            }
            return new index()
        },
        get squeezer$挤压机() {
            function index() {
                this.json = {
                    "type": "integrateddynamics:squeezer",
                    "item": {
                    },
                    "result": {
                    }
                }
            }
            index.prototype.addItem = function(/**@type {$ItemStack$Type}*/item){
                if(item[0]=='#'){this.json.item.tag = item.substring(1)}
                else{this.json.item.item = item}
                return this
            }
            index.prototype.addOutItem = function(/**@type {$ItemStack$Type}*/item , count , chance){
                count = count || 1
                this.json.result.items = this.json.result.items || []
                if (!!chance){
                this.json.result.items.push({
                        item: item,
                        chance: chance
                })
            }else{
                this.json.result.items.push({
                    item: {
                        item: item,
                        count: count
                    }
                })
            }
                return this
            }
            index.prototype.addOutFluid = function(/**@type {$FluidStackJS$Type}*/fluid, amount){
                if (typeof fluid != "string"){
                    [ fluid , amount ] = [ fluid.id , fluid.amount ]
                }
                !amount ? amount = 1000:{}
                this.json.result.fluid = {
                    fluid: fluid,
                    amount: amount
                }
                return this
            }
            index.prototype.over = function(event){
                event.custom(this.json)
            }
            return new index()
        },
        get mechanical_squeezer$电动挤压机() {
            function index() {
                this.json = {
                    "type": "integrateddynamics:mechanical_squeezer",
                    "item": {
                    },
                    "result": {
                    },
                    "duration": 40
                }
            }
            index.prototype.setTime = function (time) {
                this.json.duration = time
                return this
            }
            index.prototype.addItem = function(/**@type {$ItemStack$Type}*/item){
                if(item[0]=='#'){this.json.item.tag = item.substring(1)}
                else{this.json.item.item = item}
                return this
            }
            index.prototype.addOutItem = function(/**@type {$ItemStack$Type}*/item , count , chance){
                count = count || 1
                this.json.result.items = this.json.result.items || []
                if (!!chance){
                this.json.result.items.push({
                        item: item,
                        chance: chance
                })
            }else{
                this.json.result.items.push({
                    item: {
                        item: item,
                        count: count
                    }
                })
            }
                return this
            }
            index.prototype.addOutFluid = function(/**@type {$FluidStackJS$Type}*/fluid, amount){
                if (typeof fluid != "string"){
                    [ fluid , amount ] = [ fluid.id , fluid.amount ]
                }
                !amount ? amount = 1000:{}
                this.json.result.fluid = {
                    fluid: fluid,
                    amount: amount
                }
                return this
            }
            index.prototype.over = function(event){
                event.custom(this.json)
            }
            return new index()
        }

    }
}