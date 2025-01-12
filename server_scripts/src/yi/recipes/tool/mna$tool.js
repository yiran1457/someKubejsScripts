//requires:mna
//priority:1



let mna$tool = {
    patterns:{
        '世界':"mna:manaweave_patterns/circle",
        "闪电":"mna:manaweave_patterns/bolt",
        "金刚石":"mna:manaweave_patterns/diamond",
        "时之漏":"mna:manaweave_patterns/hourglass",
        "永恒":"mna:manaweave_patterns/infinity",
        "倒三角":"mna:manaweave_patterns/inverted_triangle",
        "中心结":"mna:manaweave_patterns/knot",
        "受承结":"mna:manaweave_patterns/knot2",
        "领交结":"mna:manaweave_patterns/knot3",
        "随附结":"mna:manaweave_patterns/knot4",
        "拆分三角":"mna:manaweave_patterns/split_triangle",
        "倒置拆分三角":"mna:manaweave_patterns/inverted_split_triangle",
        "正方":"mna:manaweave_patterns/square",
        "三角":"mna:manaweave_patterns/triangle",
        "裂口":"mna:manaweave_patterns/slash",
        "反裂口":"mna:manaweave_patterns/backslash",
        "星辰":"mna:manaweave_patterns/star",
    },
    affinity:{
        "奥术":"ARCANE",
        "末影":"ENDER",
        "风":"WIND",
        "地":"EARTH",
        "火":"FIRE",
        "水":"WATER",
        "冰":"ICE",
        "雷电":"LIGHTNING"
    },
    /**创建织魔祭坛配方 */
    manaweaving:{
        json:{
            "type": "mna:manaweaving-recipe",
            "output": null,
            "tier": 1,
            "items": [
            ],
            "patterns": [
            ]
        },
        getEvent:function(e){
            this.event = e
            return this
        },
        addInput:function(input){
            this.json.items.push(input)
            return this
        },
        addOutput:function(output){
            this.json.output = output
            return this
        },
        setTier:function(tier){
            this.json.tier = tier
            return this
        },
        addPatterns:function(patterns){
            this.json.patterns.push(patterns)
            return this
        },
        over:function(){
            this.event.custom(this.json)
            this.json = {
                "type": "mna:manaweaving-recipe",
                "output": null,
                "tier": 1,
                "items": [
                ],
                "patterns": [
                ]
            }
            return this
        }
    },
    /**创建符文铁砧配方 */
    runeforging:{
        json:{
            "type": "mna:runeforging",
            "tier": 1,
            "material": null,
            "hits": 5,
            "pattern": null,
            "output": null
        },
        getEvent:function(e){
            this.event = e
            return this
        },
        setTier:function(tier){
            this.json.tier = tier
            return this
        },
        setHits:function(hits){
            this.json.hits=hits
            return this
        },
        addUpput:function(item){
            this.json.material=item
            return this
        },
        addDowmput:function(item){
            this.json.pattern=item
            return this
        },
        addOutput:function(item){
            this.json.output=item
            return this
        },
        over:function(){
            this.event.custom(this.json)
            this.json={
                "type": "mna:runeforging",
                "tier": 1,
                "material": null,
                "hits": 5,
                "pattern": null,
                "output": null
            }
            return this
        }

    },
    /**创建艾德灵祭坛配方 */
    eldrin_altar:{
        json:{
            "type": "mna:eldrin-altar",
            "output": null,
            "tier": 1,
            "requiredFaction": "",
            "items": [],
            "power_requirements": []
        },
        getEvent:function(e){
            this.event = e
            return this
        },
        setTier:function(tier){
            this.json.tier = tier
            return this
        },
        addOutput:function(item){
            this.json.output=item
            return this
        },
        addInput:function(input){
            this.json.items.push(input)
            return this
        },
        setFaction:function(faction){
            this.json.requiredFaction=faction
            return this
        },
        addaffinity:function(affinity,amount){
            this.json.power_requirements.push({"affinity":affinity,"amount": amount})
            return this
        },
        over:function(){
            this.event.custom(this.json)
            this.json = {
                "type": "mna:eldrin-altar",
                "output": null,
                "tier": 1,
                "requiredFaction": "",
                "items": [],
                "power_requirements": []
            }
            return this
        }
    }
}
