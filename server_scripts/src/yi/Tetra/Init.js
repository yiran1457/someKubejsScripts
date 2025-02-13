//priority:20
let TetraEffectStream = {}

let TetraEvent = {}

/**
 * 
 * @param {string} extra 
 * @param {(event:TetraEventDamageEvent)} event
 */
TetraEvent.Hurt = (extra,event)=>{
    TetraEffectStream[extra + 'Hurt'] = e => event(e)
}
/**
 * 
 * @param {string} extra 
 * @param {(event:TetraEventDamageEvent)} event
 */
TetraEvent.Damage = (extra, event) => {
    TetraEffectStream[extra + 'Damage'] = e => event(e)
}

