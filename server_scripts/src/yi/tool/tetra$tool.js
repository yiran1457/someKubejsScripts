//requires:tetra
//priority:1

import { yi } from '../../../../Man/WhatCanISay'



yi$tool.tetra$tool = {
    registry: {
        get materials() {
            function index() {
                this.json = {
                    "tints": {
                        "glyph": "e3b1ab",
                        "texture": "f5c8c2"
                    },
                    "textures": [
                        "crude",
                        "wooden"
                    ],
                    "material": {
                    },
                    "requiredTools": {
                    }
                }
            }
            index.prototype.setAttributes = function (/**@type {yi.tetra.attributes}*/attributes, value) {
                this.json.attributes = this.json.attributes || {}
                this.json.attributes[attributes] = value
                return this
            }
            index.prototype.setNeedExp = function (number) {
                this.json.experienceCost = number
                return this
            }
            index.prototype.setMustValue = function (key,/**@type {yi.tetra.module$type}*/类型, 硬度, 密度, 韧性, 耐久, 完整度消耗, 完整度奖励, 魔法容量, 工具等级, 工具效率, 合成材料) {
                this.json.key = key
                this.json.category = 类型
                this.json.primary = 硬度
                this.json.secondary = 密度
                this.json.tertiary = 韧性
                this.json.durability = 耐久
                this.json.integrityCost = 完整度消耗
                this.json.integrityGain = 完整度奖励
                this.json.magicCapacity = 魔法容量
                this.json.toolLevel = 工具等级
                this.json.toolEfficiency = 工具效率
                this.json.material.items = 合成材料
                return this
            }
            index.prototype.setSecondaryKey = function (/**@type {yi.tetra.key1}*/key1,/**@type {yi.tetra.key2}*/key2, value) {
                this.json[key1][key2] = value
                return this
            }
            index.prototype.setNeedTool = function (/**@type {yi.tetra.ToolType}*/type,/**@type {yi.tetra.tier}*/tier) {
                this.json.requiredTools = this.json.requiredTools || {}
                this.json.requiredTools[type] = tier
                return this
            }
            index.prototype.setEffects = function (effect, array) {
                this.json.effects = this.json.effects || {}
                this.json.effects[effect] = array
                return this
            }
            index.prototype.setName = function (name) {
                let lang = JsonIO.read('./kubejs/assets/yi/lang/zh_cn.json')
                lang[`tetra.material.${this.json.key}`] = name
                lang[`tetra.material.${this.json.key}.prefix`] = name
                JsonIO.write('./kubejs/assets/yi/lang/zh_cn.json', lang)
                global.name[`tetra.material.${this.json.key}`] = name
                global.name[`tetra.material.${this.json.key}.prefix`] = name
                return this
            }
            index.prototype.create = function (/**@type {Internal.DataPackEventJS}*/event) {
                event.addJson(`tetra:materials/${this.json.category}/${this.json.key}`, this.json)
            }
            return new index()
        },
        get modules() {
            function index() {
                this.json = {
                    "replace": true,
                    "slots": ["sword/blade"],
                    "type": "tetra:basic_major_module",
                    "improvements": [
                        "tetra:sword/rapier_blade/",
                        "tetra:sword/shared_blade/",
                        "tetra:sword/shared/",
                        "tetra:shared/"
                    ],
                    "variants": [
                        {
                            "aspects": {
                                "edged_weapon": 2,
                                "breakable": 2
                            },
                            "extract": {
                                " Attributes": {
                                    "generic.attack_damage": 0.7
                                },
                                "primaryEffects": {
                                    "skewering": 0.8
                                },
                                "secondaryEffects": {
                                    "armorPenetration": 2
                                },
                                "tertiaryEffects": {
                                    "art_of_forging:hubris":50,
                                    "armorPenetration": -1.5
                                },
                                "durability": 0.8,
                                "integrity": -1,
                                "magicCapacity": 1.5,
                                "glyph": {
                                    "textureLocation": "tetra:textures/gui/aof_glyph.png",
                                    "textureX": 48
                                },
                                "availableTextures": ["metal", "shiny", "grainy", "crude"],
                                "models": [{
                                    "location": "tetra:item/module/sword/blade/rapier_blade/"
                                }]
                            }
                        }
                    ]
                }
            }

            index.prototype.setMustValues = function (
                key,
                    /**@type {String}*/槽位,
                    /**@type {yi.tetra.module$type} */模块类型,
                    /**@type {yi.tetra.modules$type}*/类型,
                    /**@type {Path[]}*/打磨
            ) {
                this.json.variants[0].key = key
                this.json.slots = [槽位]
                this.json.type = 类型
                this.json.improvements = 打磨
                return this
            }
            index.prototype.setOptionalValues = function (
                完整性,
                魔法容量,
                耐久,
                材料) {
                let variants = this.json.variants[0]
                !完整性 == false ? variants.integrity = 完整性 : {}
                !魔法容量 == false ? variants.magicCapacity = 魔法容量 : {}
                !耐久 == false ? variants.durability = 耐久 : {}
                !材料 == false ? variants.materials = 材料 : {}
                return this
            }
            index.prototype.setTag = function (/**@type {String[]}*/tag) {
                this.json.variants[0].tags = tag
                return this
            }
            index.prototype.setAttributes = function (/**@type {yi.tetra.attributes}*/Attribute, value) {
                this.json.variants[0].attributes = this.json.variants[0].attributes || {}
                this.json.variants[0].attributes[Attribute] = value
                return this
            }
            index.prototype.setEffects = function (effect, value) {
                this.json.variants[0].effects = this.json.variants[0].effects || {}
                this.json.variants[0].effects[effect] = value
                return this
            }
            index.prototype.create = function (event) {
                console.log(this.json)
                let key = this.json.variants[0].key
                event.addJson(`tetra:modules/${this.json.slots[0].replace(/\/.*/i, '')}/${key}`, this.json)
            }
            return new index()
        },
        get improvements() {
            function index() {
                this.json = {}
            }
            index.prototype.setMustValue = function () { }
            return new index()
        }

    },
    setting: {
        effects: {
            /**击杀生物给予伤害吸收，发光，力量，生命恢复\
             * [ buff等级 , 时长 ] */
            生命纤维损失: 'art_of_forging:life_fiber_loss',
            /**number */
            直觉: "intuit",
            /**number */
            稳定性: "stabilizing",
            /**[ 爆率 , 爆伤 ] */
            暴击: "criticalStrike",
            /**[ 闪电数量 , 召唤概率 ] */
            风暴召唤者: "art_of_forging:stormcaller",
            /**[ 凋零等级 , 凋零时间 ] */
            衰朽: "art_of_forging:decaying",
            /**[ 回复量 , 回复概率 ] */
            生命偷取: "art_of_forging:life_steal",
            /**[ 拾取半径 , 末影螨出现概率] */
            jank: "janking",
            /**[用处暂时未知] */
            唤魔者尖牙: "art_of_forging:evoking_maw",
            灵魂污染: "sculkTaint",
            /**伤害:number */
            音波尖啸: "art_of_forging:sonic_shock",
            /**[ 持续时间 , 召唤概率 ] */
            龙雾: "art_of_forging:dragon_mist",
            /**效果为原版耐久,不显示于面板\
             * 等级:number */
            耐久: "unbreaking",
            /**启用:anynumber */
            真实横扫: "truesweep",
            /**[ 加伤 , 血量阈值 ] */
            复仇: "art_of_forging:vengeance",
            /**[ unknown , unknown ] */
            连击: "abilityCombo",
            /**[ unknown , unknown ] */
            "abilityExhilarated": "abilityExhilarated",
            /**[ 概率 , 最大层数 ] */
            切割: "severing",
            /**多个属性加算,于最终乘区乘算\
             * 横扫倍数:number */
            横扫之刃: "sweeping",
            /**number */
            穿甲: "armorPenetration",
            /**等级:number */
            吞噬等级: "art_of_forging:devouring",
            /**number */
            击退: "art_of_forging:knockback",
            /**伤害加成:number */
            狂妄诅咒: "art_of_forging:hubris",
            /**[ 加成 , 血量阈值 ] */
            宰杀: "art_of_forging:slaughtering",
        }
    }
}
