EntityEvents.spawned(e => {
    /**@type {{entity:$LivingEntity_,level:$ServerLevel_}} */
    let { entity, level } = e
    if (!entity) return
    commonModify(entity)//通过加算给予部分实体基础数值
    let player = entity.level.getNearestPlayer(entity, 64)
    if (!player) return
    //player.tell(entity.type)
})

/**@type {Record<Special.EntityType, Record<Special.Attribute, number>>} */
let specialEntityModifyList = {
    "cataclysm:ignis": { "yi:evil_damage": 3, "yi:holy_protection": -0.5, "yi:evil_protection": 0.2 },
    'cataclysm:maledictus': { "yi:holy_damage": 10, "yi:evil_damage": -0.67, "yi:holy_protection": 0.35 }
}
/**@type {(entity:$LivingEntity_)} */
let commonModify = (entity) => {
    if (specialEntityModifyList[entity.type])
        for (const key in specialEntityModifyList[entity.type])
            if (entity.attributes.hasAttribute(key))
                entity.setAttributeBaseValue(key, entity.getAttributeValue(key) + specialEntityModifyList[entity.type][key])
}
