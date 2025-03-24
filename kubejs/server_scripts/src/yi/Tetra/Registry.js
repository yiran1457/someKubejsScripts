
TetraEvent.Registry(e => {
    e.type.archetype('test', 200)
    .addSlot('right_up',true,true,15,15)
    .addSlot('right_down',true,true,15,-15)
    .addSlot('curios/left',true,true,-15,0)

    e.type.schematic('test')
    .addSlot('curios/left')
    .addSlot('right_up')
    .setMaterialSlotCount(1)

    // e.type.module()
})
TetraRegistryStream['tetra:modules/left'] = {
    "replace": true,
    "type": "tetra:basic_module",
    "slots": ["curios/left"],
    "renderLayer": "higher",
    "variants": [
        {
            "materials": ["tetra:metal/", "tetra:fibre/"],
            "key": "left",
            "integrity": 5,
            "tags": ["curios:ring"],
            "extract": {
                "glyph": {
                    "textureX": 88,
                    "textureY": 16
                },
                "availableTextures": ["custom_alchemy"],
                "models": [
                    {
                        "location": "yi:item/"
                    }
                ]
            }
        }
    ]
}