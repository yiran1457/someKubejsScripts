function CheckBlock(e,chblock,CheckList){    let check=true
    for(let i=0;i<CheckList.length;i++){   if(e.block.offset(CheckList[i][0],CheckList[i][1],CheckList[i][2]) != chblock) check = false   }   return check    }
function getItemInBlock(e,CheckList){
    let itemlist = []
    for(let i=0;i<CheckList.length;i++){
        let cishu = -1
        for(let j=0;j<itemlist.length;j++){        
                if(e.block.offset(CheckList[i][0],CheckList[i][1],CheckList[i][2]).entityData['itemStack'].id == itemlist[j][0] ){
                cishu = j}}
        if(cishu != -1) {itemlist[cishu][1]++}
        else if(e.block.offset(CheckList[i][0],CheckList[i][1],CheckList[i][2]).entityData['itemStack'].id!='minecraft:air'){
            itemlist.push([e.block.offset(CheckList[i][0],CheckList[i][1],CheckList[i][2]).entityData['itemStack'].id,1])
        }            
    }
    itemlist.sort()
    console.info(itemlist)
    return itemlist
}

    
let recipes =[/*[' mainitem ',' item '],[' initem ',[' item ']],[' output ',' type ',' any ']]*/[
    ['minecraft:nether_star'],
    [['minecraft:netherite_block',2],['minecraft:gilded_blackstone',2],['minecraft:magma_block',2],['minecraft:basalt',2]],
    ['command','cataclysm:netherite_monstrosity']
    ],[
    ['minecraft:nether_star'],
    [['minecraft:nether_star',1],['cataclysm:void_stone',1],['minecraft:crying_obsidian',2],['minecraft:purpur_block',2],['minecraft:shulker_shell',2]],
    ['command','cataclysm:ender_guardian'],
    ],[
    ['minecraft:nether_star'],
    [['minecraft:nether_star',1],['minecraft:redstone_block',2],['minecraft:wither_skeleton_skull',3],['create:sturdy_sheet',2]],
    ['command','cataclysm:the_harbinger'],
    ],[
    ['minecraft:nether_star'],
    [['minecraft:bone_block',2],['minecraft:gold_block',1],['minecraft:sandstone',2],['create:brass_block',2],['cataclysm:necklace_of_the_desert',1]],
    ['command','cataclysm:ancient_remnant'],
    ],[
    ['minecraft:nether_star'],
    [['create:brass_block',2],['minecraft:diamond_block',2],['minecraft:nether_star',1],['cataclysm:black_steel_block',3]],
    ['command','cataclysm:maledictus'],
    ],[
    ['cataclysm:void_stone'],
    [['minecraft:crying_obsidian',2],['minecraft:obsidian',2]],
    ['command','cataclysm:ender_golem'],
    ],[
    ['quark:blaze_lantern'],
    [['minecraft:shield',2],['minecraft:nether_bricks',2]],
    ['command','cataclysm:ignited_revenant'],
    ],[
    ['minecraft:clay'],
    [['minecraft:amethyst_block',1],['minecraft:mossy_cobblestone',3]],
    ['command','cataclysm:amethyst_crab'],
    ],[
    ['minecraft:magma_block'],
    [['minecraft:redstone_block',1],['minecraft:iron_block',1],['minecraft:blackstone',2]],
    ['command','cataclysm:the_prowler'],
    ],[
    ['minecraft:sandstone'],
    [['create:brass_block',2],['minecraft:bone_block',2]],
    ['command','cataclysm:kobolediator'],
    ],[
    ['minecraft:sandstone'],
    [['create:brass_block',1],['minecraft:bone_block',3]],
    ['command','cataclysm:wadjet'],
    ],[
    ['minecraft:sea_lantern'],
    [['minecraft:dried_kelp_block',1],['minecraft:stone_bricks',2],['minecraft:brain_coral_block',1]],
    ['command','cataclysm:deepling_priest'],
    ],[
    ['minecraft:crying_obsidian'],
    [['minecraft:dried_kelp_block',1],['minecraft:stone_bricks',2],['minecraft:brain_coral_block',1]],
    ['command','cataclysm:deepling_warlock'],
    ],[
    ['minecraft:soul_sand'],
    [['minecraft:iron_block',2],['create:sturdy_sheet',2]],
    ['command','cataclysm:aptrgangr'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:snow_block',4],['minecraft:blue_ice',2],['minecraft:diamond_block',1]],
    ['command','mowziesmobs:frostmaw'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:gold_block',4],['minecraft:feather',2],['minecraft:blaze_rod',1]],
    ['command','mowziesmobs:umvuthi'],
    ],[
    ["minecraft:nether_star"],
    [['minecraft:netherite_ingot',1],['minecraft:iron_block',4],['create:sturdy_sheet',3]],
    ['command','mowziesmobs:wroughtnaut'],
    ],[
    ['minecraft:creeper_head'],
    [['alexscaves:uranium_rod',2],['alexscaves:charred_remnant',2]],
    ['command','alexscaves:nucleeper'],
    ]
    ]

let firstList = [[3,0,0],[-3,0,0],[0,0,3],[0,0,-3],[2,0,2],[-2,0,2],[-2,0,-2],[2,0,-2]]
BlockEvents.rightClicked(event=>{    
    if (event.block == 'ars_nouveau:arcane_pedestal'
        &&CheckBlock(event,'ars_nouveau:arcane_platform',firstList)
        &&event.player.mainHandItem == 'ars_nouveau:dowsing_rod'
        ){
            let initemlist = getItemInBlock(event,firstList)
            for(let a=0;a<recipes.length;a++){
                if (initemlist.toString() === recipes[a][1].sort().toString()
                    &&event.block.entityData['itemStack'].id== recipes[a][0]){
                    
        
        for(let j = 0 ;j < 30 ; j++){
            event.server.scheduleInTicks(j, () => {
            for(let i=0;i<firstList.length;i++){ 
                event.server.runCommandSilent(`particle minecraft:enchant ${event.block.x} ${event.block.y+2} ${event.block.z} ${firstList[i][0]} ${firstList[i][1]-1.5 } ${firstList[i][2]} 0.8 0 force`)  }
             }  )
            }
            
            for(let i=0;i<firstList.length;i++){   
                event.server.runCommandSilent(`data remove block ${event.block.x+firstList[i][0]} ${event.block.y+firstList[i][1]} ${event.block.z+firstList[i][2]} itemStack`)}  
                event.server.runCommandSilent(`data remove block ${event.block.x} ${event.block.y} ${event.block.z} itemStack`)
                event.server.scheduleInTicks(40, () => {
                if (recipes[a][2][0]=='command'){
                    event.server.runCommandSilent(`summon ${recipes[a][2][1]} ${event.block.x} ${event.block.y+3} ${event.block.z}`)
                }else{event.server.runCommandSilent(`summon give ${event.player.name.string} ${recipes[a][2][1]}`)
                    
                }})
            event.cancel()}}
    }
})