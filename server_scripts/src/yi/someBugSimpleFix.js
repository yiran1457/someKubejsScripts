//对机械动力遥控器讲台刷物品进行修复
BlockEvents.broken('create:lectern_controller', e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
BlockEvents.rightClicked('create:lectern_controller', e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
BlockEvents.leftClicked('create:lectern_controller', e => {
    if (e.block.entityData.getCompound('Controller').getString('id') != 'create:linked_controller')
        e.block.entityData = {}
})
