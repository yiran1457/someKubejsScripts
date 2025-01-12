
//priority:1

export const tetra$setting = {
        Tier:{1:"minecraft:wood",
            2:"minecraft:stone"
        },
        key:"key",
        类别:"category",
        硬度:"primary",
        密度:"secondary",
        韧性:"tertiary",
        耐久:"durability",
        完整度消耗:"integrityCost",
        完整度奖励:"integrityGain",
        魔法容量:"magicCapacity",
        工具等级:"toolLevel",
        工具效率:"toolEfficiency"
}

export const tetra$tool = {
    registry:{
        materials:new registry$materials
    }
}
/**默认为樱桃木属性 */
function registry$materials(){
    this.json = {
        "key": "cherry",
        "category": "wood",
        "primary": 3.5,
        "secondary": 1.7,
        "tertiary": 6.5,
        "durability": 70,
        "integrityCost": 1,
        "integrityGain": 5,
        "magicCapacity": 80,
        "toolLevel": "minecraft:wood",
        "toolEfficiency": 2,
        "tints": {
            "glyph": "e3b1ab",
            "texture": "f5c8c2"
        },
        "textures": [
            "crude",
            "wooden"
        ],
        "material": {
            "items": [
                "minecraft:cherry_planks"
            ]
        },
        "requiredTools": {
            "axe_dig": "minecraft:stone"
        }
    }
    this.setkey = function(key,value){this.json[key] = value;return this}
    
}