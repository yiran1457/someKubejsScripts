
//server
let getTime = () => Utils.getServer().getLevel('minecraft:overworld').time
let chectCDTag = (itemStack) => { 
    if( itemStack.getOrCreateTag().cooldown === undefined )
        itemStack.getOrCreateTag().cooldown = {}
    }
const CDsystemUtils = {
    addCD(itemStack,CD,CDName){//添加一个冷却
        chectCDTag(itemStack)
        itemStack.nbt.cooldown[CDName||'common'] = {CDstart:getTime() , CDrequire:CD}
    },
    getRemainingCD(itemStack,CDName){//获取剩余冷却事件
        chectCDTag(itemStack)
        if(itemStack.nbt.cooldown[CDName||'common'] === undefined)return 0
        let {CDstart, CDrequire} = itemStack.nbt.cooldown[CDName||'common']
        if(CDstart + CDrequire < getTime())return 0
        return CDstart + CDrequire - getTime()
    },
    checkCD(itemStack,CDName){//检查冷却是否结束
        chectCDTag(itemStack)
        return this.getRemainingCD(itemStack,CDName) == 0
    },
    clearCD(itemStack,CDName){//清除指定冷却
        chectCDTag(itemStack)
        delete itemStack.nbt.cooldown[CDName||'common']
    },
    clearAllCD(itemStack,CDName){//清除全部冷却
        chectCDTag(itemStack)
        delete itemStack.nbt.cooldown
    }
}


ItemEvents.firstLeftClicked(e=>{
    CDsystemUtils.addCD(e.item,2000)
    e.player.addItemCooldown('diamond',15646)
})