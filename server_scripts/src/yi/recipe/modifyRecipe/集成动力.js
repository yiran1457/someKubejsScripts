ServerEvents.recipes(e=>{
    let {create}=e.recipes
    let input = ''
    let output = ''
    e.remove({output:'integrateddynamics:cable'})
    e.recipes.kubejs.shaped('16x integrateddynamics:cable',
        ['AAA','BCB','AAA'],
        {A:'integratedterminals:menril_glass',B:'ae2:engineering_processor',C:'create:precision_mechanism'}
    )

    e.remove({output:'integrateddynamics:logic_director'})
    e.recipes.kubejs.shaped('8x integrateddynamics:logic_director',
        ['ABA','BCB','ABA'],
        {A:'integrateddynamics:crystalized_chorus_chunk',B:'minecraft:chorus_flower',C:'minecraft:nether_star'}
    )

    e.remove({output:'integratedtunnels:part_interface_item'})
    e.recipes.kubejs.shaped('integratedtunnels:part_interface_item',
            [' C ','ABA','AAA'],
        {A:'integrateddynamics:crystalized_chorus_chunk',B:'integrateddynamics:enhancement_offset',C:'#balm:wooden_chests'}
    )

    e.remove({output:'integratedtunnels:part_interface_fluid'})
    e.recipes.kubejs.shaped('integratedtunnels:part_interface_fluid',
            [' C ','ABA','AAA'],
        {A:'integrateddynamics:crystalized_chorus_chunk',B:'integrateddynamics:enhancement_offset',C:'create:fluid_tank'}
    )

    e.remove({output:'integratedtunnels:part_interface_energy'})
    e.recipes.kubejs.shaped('integratedtunnels:part_interface_energy',
            [' C ','ABA','AAA'],
        {A:'integrateddynamics:crystalized_chorus_chunk',B:'integrateddynamics:enhancement_offset',C:'integrateddynamics:energy_battery'}
    )

    input='integratedtunnels:part_interface_item'
    output='integratedtunnels:part_interface_filter_item'
    e.remove({output:output})
    create.sequenced_assembly(
        [output],
        input,
        [
            create.deploying(input,[input,'minecraft:hopper']),
            create.pressing(input,input),
            create.deploying(input,[input,'integrateddynamics:wrench']).keepHeldItem()
        ]
    ).transitionalItem(input).loops(1)

    input='integratedtunnels:part_interface_fluid'
    output='integratedtunnels:part_interface_filter_fluid'
    e.remove({output:output})
    create.sequenced_assembly(
        [output],
        input,
        [
            create.deploying(input,[input,'minecraft:hopper']),
            create.pressing(input,input),
            create.deploying(input,[input,'integrateddynamics:wrench']).keepHeldItem()
        ]
    ).transitionalItem(input).loops(1)

    input='integratedtunnels:part_interface_energy'
    output='integratedtunnels:part_interface_filter_energy'
    e.remove({output:output})
    create.sequenced_assembly(
        [output],
        input,
        [
            create.deploying(input,[input,'minecraft:hopper']),
            create.pressing(input,input),
            create.deploying(input,[input,'integrateddynamics:wrench']).keepHeldItem()
        ]
    ).transitionalItem(input).loops(1)



})