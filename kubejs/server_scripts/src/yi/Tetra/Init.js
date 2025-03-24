//priority:20

/**
 * @typedef {{player:$Player_,effectLevel:number,effectEfficiency:number,isActual:Boolean,isImmediate:Boolean}&$LivingDamageEvent_} TetraEventDamageEvent
 */
//=======================================
// 初始化
//=======================================

let TetraEffectStream = {}
let TetraEvent = {}
let TetraRegistryStream = {}

/**
 * 在计算减伤前触发
 * @param {string} extra 
 * @param {(event:TetraEventDamageEvent)} event
 */
TetraEvent.Hurt = (extra, event) => {
    TetraEffectStream[extra + 'Hurt'] = e => event(e)
}
/**
 * 在计算减伤后触发
 * @param {string} extra 
 * @param {(event:TetraEventDamageEvent)} event
 */
TetraEvent.Damage = (extra, event) => {
    TetraEffectStream[extra + 'Damage'] = e => event(e)
}
/**
 * 用于注册tetra的各种数据包
 * @param {(event:TetraRegistryUtil)} event 
 */
TetraEvent.Registry = (event) => {
    event(TetraRegistryUtil)
    TetraRegistryUtil._overBulider()
}

let TetraRegistryUtil = {
    type: {
        archetype(id, honeBase) {
            TetraRegistryUtil._overBulider()
            TetraRegistryUtil._thisPath = 'tetra:archetypes/' + id
            TetraRegistryUtil._thisJson = {
                id: id,
                honeable: !!honeBase,
                honeBase: honeBase,
                honeIntegrityMultiplier: 1,
                slots: []
            }
            return TetraRegistryUtil$Archetype
        },
        module(id){
            TetraRegistryUtil._overBulider()
            TetraRegistryUtil._thisPath = 'tetra:schematics/' + id
            TetraRegistryUtil._thisJson = {
                "replace": true,
                "type": "tetra:basic_module",
                "slots": ["curios/left"],
                "renderLayer": "higher",
                "variants": [
                    {
                        "materials": ["tetra:metal/", "tetra:fibre/"],
                        "key": "curios/left",
                        "integrity": 5,
                        "tags": ["curios:ring"],
                        "extract": {
                            "glyph": {
                                "textureX": 88,
                                "textureY": 16
                            },
                            "availableTextures": ["default", "metal"],
                            "models": [
                                {
                                    "location": "tetra:item/module/artifact/attachment/binding/"
                                }
                            ]
                        }
                    }
                ]
            }
            return ModuleUtils
        },
        replacement(){},
        schematic(id){
            TetraRegistryUtil._overBulider()
            TetraRegistryUtil._thisPath = 'tetra:schematics/' + id
            TetraRegistryUtil._thisJson = {
                slots: [],
                "outcomes": [
                    {
                        "materials": [ "tetra:socket/" ],
                        "moduleKey": "left",
                        "moduleVariant": "curios/",
                        "experienceFactor": 1
                    }
                ]
            
            }
            return TetraRegistryUtil$Schematic
        },
        improvement(){},
        materials(){}

    },
    _thisPath: '',
    _thisJson: {},
    _overBulider: function () {
        if (this._thisPath) {
            TetraRegistryStream[this._thisPath] = this._thisJson
            this._thisPath = ''
            this._thisJson = {}
            return
        }
        return
    }
}
let TetraRegistryUtil$Schematic = {
    /**
     * 是否替换掉现有条目
     * @param {Boolean} Boolean 
     */
    setReplace(Boolean){
        TetraRegistryUtil._thisJson.replace = Boolean===undefined?true:Boolean
        return this
    },
    /**
     * 设置本地化键名
     * @param {String} TranslateKey 
     */
    setTranslateKey(TranslateKey){
        TetraRegistryUtil._thisJson.localizationKey = TranslateKey
        return this
    },
    /**
     * 设置允许的槽位
     * @param {String} slotName 
     */
    addSlot(slotName){
        TetraRegistryUtil._thisJson.slots.push(slotName)
        return this
    },
    /**
     * 设置是否仅在打磨时科技
     * @param {Boolean} Boolean 
     */
    isHone(Boolean){
        TetraRegistryUtil._thisJson.hone = Boolean===undefined?true:Boolean
        return this
    },
    /**
     * 设置需要的原理图
     * @param {*} arg 
     */
    setRequirement(arg){
        TetraRegistryUtil._thisJson.requirement = arg
        return this
    },
    /**
     * 设置是否在可制作时才显示
     * @param {Boolean} Boolean 
     */
    setMaterialRevealSlot(Boolean){
        TetraRegistryUtil._thisJson.materialRevealSlot = Boolean===undefined?true:Boolean
        return this
    },
    /**
     * 设置材料槽数量
     * @param {Number} number 
     */
    setMaterialSlotCount(number){
        TetraRegistryUtil._thisJson.materialSlotCount = number
        return this
    }
}
let TetraRegistryUtil$Archetype = {
    /**
     * 以最中间为原点，x向右为正，y向上为正\
     * 正数x至少为6，不然会出现在左边
     * @param {String} id 
     * @param {Boolean} canImprovements 
     * @param {Boolean} canDelete 
     * @param {Number} x 
     * @param {Number} y 
     */
    addSlot(id,canImprovements,canDelete,x,y){
        TetraRegistryUtil._thisJson.slots.push({key:id,major:canImprovements,required:!canDelete,x:x-5,y:-(y-9)})
        return this
    },
    setHoneIntegrityMultiplier(/**@type {Number} */int){
        TetraRegistryUtil._thisJson.honeIntegrityMultiplier = int
        return this
    }
}