TetraEvent.Damage('yi:vibration', event => {
    if(!event.isActual)return
    event.player.tell('vibration')
})

TetraEvent.Hurt('yi:vibration', event => {
    if(!event.isActual)return
    event.player.tell(event.effectLevel)
    event.player.tell(event.effectEfficiency)
})