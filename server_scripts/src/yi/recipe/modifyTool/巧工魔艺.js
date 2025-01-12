//priority:999

import { $ItemStack$Type } from "packages/net/minecraft/world/item/$ItemStack"
import { Base_Recipes } from "./$基础配方构建工具"

//==================================
let func = Recipes$Tool.function
//==================================

mna$setting.patterns$图案 = {
    '世界': "mna:manaweave_patterns/circle",
    "闪电": "mna:manaweave_patterns/bolt",
    "金刚石": "mna:manaweave_patterns/diamond",
    "时之漏": "mna:manaweave_patterns/hourglass",
    "永恒": "mna:manaweave_patterns/infinity",
    "倒三角": "mna:manaweave_patterns/inverted_triangle",
    "中心结": "mna:manaweave_patterns/knot",
    "受承结": "mna:manaweave_patterns/knot2",
    "领交结": "mna:manaweave_patterns/knot3",
    "随附结": "mna:manaweave_patterns/knot4",
    "拆分三角": "mna:manaweave_patterns/split_triangle",
    "倒置拆分三角": "mna:manaweave_patterns/inverted_split_triangle",
    "正方": "mna:manaweave_patterns/square",
    "三角": "mna:manaweave_patterns/triangle",
    "裂口": "mna:manaweave_patterns/slash",
    "反裂口": "mna:manaweave_patterns/backslash",
    "星辰": "mna:manaweave_patterns/star",
}
mna$setting.affinity$元素 = {
    "奥术": "ARCANE",
    "末影": "ENDER",
    "风": "WIND",
    "地": "EARTH",
    "火": "FIRE",
    "水": "WATER",
    "冰": "ICE",
    "雷电": "LIGHTNING"
}

//==================================
let mna_basic = function (type) {
    func.TestRecipes.call(this)
    func.Base_Recipes.call(this, type)
    this.setTier = function (tier) {
        this.super.json.tier = tier
        return this
    }
    this.setResult = function (/**@type {$ItemStack$Type} */result, count) {
        this.super.json.output = result
        if (count !== undefined) { this.super.json.outputQuantity = count }
        return this
    }
}
//==================================
Recipes$Tool.recipes.mna2 = {
    get arcanefurnace$奥术熔炉() {
        let Special = function () {
            mna_basic.call(this, "mna:arcane-furnace")
            this.setBurnTime = function (time) {
                this.super.json.burnTime = time
                return this
            }
            this.setIngredient = function (/**@type {$ItemStack$Type} */ingredient) {
                this.super.json.input = ingredient
                return this
            }
        }
        /**@type { Base_Recipes & Special & mna_basic } */
        let returnmethod = new Special()
        return returnmethod.modifyjson(json => { json.burnTime = 2000; json.tier = 1 })
    },
    get runeforging$符文铁砧() {
        let Special = function () {
            mna_basic.call(this, "mna:runeforging")
            this.setHits = function (hits) {
                this.super.json.hits = hits
                return this
            }
            this.setUpIngredient = function (/**@type {$ItemStack$Type} */ingredient) {
                this.super.json.material = ingredient
                return this
            }
            this.setDownIngredient = function (/**@type {$ItemStack$Type} */ingredient) {
                this.super.json.pattern = ingredient
                return this
            }
        }
        /**@type { Base_Recipes & mna_basic & Special} */
        let returnmethod = new Special()
        return returnmethod.modifyjson(json => { json.tier = 1 })
    },
    get manaweaving$织魔祭坛() {
        let Special = function () {
            mna_basic.call(this, "mna:manaweaving-recipe")
            this.addIngredient = function (/**@type {$ItemStack$Type} */ingredient) {
                this.super.json.items.push(ingredient)
                return this
            }
            this.addPattern = function (pattern) {
                this.super.json.patterns.push(pattern)
                return this
            }
        }
        /**@type { Base_Recipes & mna_basic & Special} */
        let returnmethod = new Special()
        return returnmethod.modifyjson(json => { json.tier = 1; json.items = []; json.patterns = [] })
    },
    get eldrin_altar$艾德灵祭坛() {
        let Special = function () {
            mna_basic.call(this, 'mna:eldrin-altar')
            this.addIngredient = function (/**@type {$ItemStack$Type} */ingredient) {
                this.super.json.items.push(ingredient)
                return this
            }
            this.addaffinity = function (affinity, amount) {
                this.super.json.power_requirements.push({ "affinity": affinity, "amount": amount })
                return this
            }
            this.setFaction = function (faction) {
                this.json.requiredFaction = faction
                return this
            }
        }
        /**@type { Base_Recipes & mna_basic & Special } */
        let returnmethod = new Special()
        return returnmethod.modifyjson(json => { json.tier = 1; json.items = []; json.power_requirements = [] })
    }
}
//==================================