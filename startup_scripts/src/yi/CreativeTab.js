



StartupEvents.registry("creative_mode_tab", (event) => {
	let tab = event.create("yi:tab")
	tab.icon(() => Item.of("yi:infinity_potion"))
	tab.displayName = Text.translatable("item_group.yi.tab")
    tab.content(() => [
        Item.of('yi:structure_wand'),
        Item.of('yi:random_potion','{Effects:[]}'),
        Item.of("yi:infinity_potion",'{Effects:[]}')
    ])
})
StartupEvents.modifyCreativeTab('kubejs:tab',e=>{
    e.remove([
        Item.of('yi:structure_wand'),
        Item.of('yi:random_potion'),
        Item.of("yi:infinity_potion")
    ])
})
