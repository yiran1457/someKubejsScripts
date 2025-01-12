//requires:create
//requires:kubejs_create
/*
ItemEvents.rightClicked(event => {
    const {x , y , z } = event.player
    const rayTrace = event.player.rayTrace(10)
    event.server.tell(rayTrace.facing)
    event.server.tell(event.player.facing.normal)
    console.log(event.player.facing.y)
    
    
})*/




ServerEvents.recipes(e=>{



    let test = JsonIO.read('./kubejs/config/yiconfig.json')
    test.create='false'
    test.mna='false'
    test.ars='false'
    JsonIO.write('./kubejs/config/yiconfig.json',test)



e.shaped(
    Item.of('minecraft:enchanted_book').enchant('minecraft:protection', 4),
    [' A '],
    {A:'minecraft:enchanted_book'})




    
/*
    create$tool.mechanical_crafting
    .getEvent(e)
.setShape([
    '   BBB   ',
    '  BBBDAD ',
    '     AAA ',
    '    CDADB',
    '   CEC BB',
    '  CEC  BB',
    ' CEC   B ',
    'CEC      ',
    'CC       '
])
.addInput('A','ae2:fluix_pearl')
.addInput('B','alexsmobs:mimicream')
.addInput('C','gobber2:gobber2_rod_end')
.addInput('D','ae2:dense_energy_cell')
.addInput('E','ae2:fluix_block')
.addOutput('yi:tool_sword')
.over()*/


create$tool.mechanical_crafting
.getEvent(e)
.setShape([
    "ABCDDDCBA",
    "AEBCDCBEA",
    "AEAFFFAEA",
    "AEGFFFGEA",
    "AGGGHGGGA"
])
.addInput("A", 'minecraft:netherite_ingot') 
.addInput("B", 'create_sa:heat_engine')
.addInput("C", 'create_sa:steam_engine')
.addInput("D", 'create_sa:hydraulic_engine')
.addInput("E", 'minecraft:nether_star')
.addInput("F", 'create:blaze_burner')
.addInput("G", 'create:blaze_cake')
.addInput("H", 'create:rotation_speed_controller')
.addOutput('create:creative_motor') 
.over()


create$tool.sequenced_assembly
.getEvent(e)
.addInput("minecraft:cobblestone")
.addOutput(Item.of("minecraft:ancient_debris"))
.addPressingStep()
.addFillingStep(Fluid.of("minecraft:lava",200))
.addDeployingStep("minecraft:netherite_scrap")
.setLoops(1)
.over()


})

