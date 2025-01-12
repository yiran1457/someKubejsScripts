
//const  $PatchouliAPI  = Java.loadClass("vazkii.patchouli.api.PatchouliAPI")
const  $Character  = Java.loadClass("java.lang.Character")
let str = str => new $Character(str)
const { $PatchouliAPI } = require("packages/vazkii/patchouli/api/$PatchouliAPI")

BlockEvents.rightClicked('minecraft:diamond_block', (event) => {
    const { item, level, block } = event
    const { pos } = block
    if(item != "minecraft:stick" || level.isClientSide()) {
        return
    }
    let rotation1 = Test_MultiBlock_Machine().validate(level, pos)
    if(rotation1 === null){
        return
    }
    block.up.popItem("clay_ball")
})

BlockEvents.rightClicked('minecraft:oak_log', (event) => {
    $PatchouliAPI.get().showMultiblock($PatchouliAPI.get().getMultiblock("kubejs:test_multiblock_machine"),null,event.block.pos.offset(0,2,0),"none")
})
const Test_MultiBlock_Machine = () =>
    $PatchouliAPI.get().makeMultiblock(
        [
            [   "___________",
                "_e_______e_",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "_e_______e_",
                "___________"],
            [   "___________",
                "_c_______c_",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "_c_______c_",
                "___________"],
            [   "___________",
                "_c_______c_",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "___________",
                "_c_______c_",
                "___________"],
            [   "___________",
                "_c_______c_",
                "_____d_____",
                "___d___d___",
                "___________",
                "__d__0__d__",
                "___________",
                "___d___d___",
                "_____d_____",
                "_c_______c_",
                "___________"],
            [   "aaa_____aaa",
                "a_aaaaaaa_a",
                "aabbbbbbbaa",
                "_abbbbbbba_",
                "_abbbbbbba_",
                "_abbbbbbba_",
                "_abbbbbbba_",
                "_abbbbbbba_",
                "aabbbbbbbaa",
                "a_aaaaaaa_a",
                "aaa_____aaa"]
        ],
        new $Character('_'),
        $PatchouliAPI.get().anyMatcher(),
        new $Character('0'),'ars_nouveau:arcane_pedestal',
        new $Character('d'),'ars_nouveau:arcane_platform[facing=up]',
        new $Character('c'),'ae2:quartz_pillar',
        new $Character('a'),'ae2:cut_quartz_block',
        new $Character('b'),'ae2:fluix_block',
        new $Character('e'),'mna:brazier[active=true]'
    )


    
ServerEvents.loaded(event => {
    console.info("loaded")
    $PatchouliAPI.get().registerMultiblock(ResourceLocation("kubejs:test_multiblock_machine"),Test_MultiBlock_Machine())
})

ServerEvents.recipes(event => {
    let findRecipes = event.findRecipes({type:'create:item_application'})
    for(let i = 0 ; i < findRecipes.length ; i++){
        let input = []
        let ingredients = findRecipes[i].json.get('ingredients')
        let results = findRecipes[i].json.get('results').get(0).get('item')
        for(let j = 0 ; j < ingredients.size() ; j++){
            let keySet = ingredients.get(j).keySet()[0]
            let value = ingredients.get(j).get(keySet).toString().slice(1,-1)
            if(keySet=='tag'){input.push("#"+ value)}
            else{input.push(value)}
        }
        event.recipes.minecraft.crafting_shapeless(results,input)
    }
})
//try{$PatchouliAPI.get().registerMultiblock(ResourceLocation("kubejs:test_multiblock_machine"),Test_MultiBlock_Machine())}catch(e){console.error(e)}
/*
let altar$Tier1 = $PatchouliAPI.get().makeMultiblock([[
    '___s___',
    '_s___s_',
    '_______',
    's__0__s',
    '_______',
    '_s___s_',
    '___s___'
]],
str('0'),'mna:runeforge',
str('s'),'mna:runeforge',
str('_'),$PatchouliAPI.get().anyMatcher()
)
*/
//$PatchouliAPI.get().registerMultiblock(ResourceLocation('custom:altar_Tier1'),altar$Tier1)
ItemEvents.firstRightClicked('yi:structure_wand',e=>{
    //Client.tell(e.getTarget()?.block)
    if(e.getTarget().block == undefined || e.hand == 'off_hand'){return}
    console.log(e.getTarget().block)
    $PatchouliAPI.get().showMultiblock($PatchouliAPI.get().getMultiblock('custom:altar_Tier1'),null,e.getTarget().block.pos,"none")
})