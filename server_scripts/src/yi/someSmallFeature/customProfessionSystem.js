
const { $LecternMenu } = require("packages/net/minecraft/world/inventory/$LecternMenu")

let initProfessionInfo = {
    skillpoint: 0,//技能点
    profession: null,//职业
    level: 1,//等级
    xp: 0,//经验值
    skill: {//技能
        health:0,
        attack:0,
        armor:0,
        speed:0
    }
}
NetworkEvents.dataReceived('customProfessionSystem', e => {
    let { player, data } = e
    let { ProfessionInfo } = player.persistentData
    let { skill} = ProfessionInfo
    let modify = false
    for (let key in data) {
        if (key.startsWith('add') && ProfessionInfo.skillpoint > 0) {
            skill[key.slice(3)]++
            ProfessionInfo.skillpoint--
            modify = true
        }
        if (key=='debug') {
            ProfessionInfo.skillpoint++
            modify = true
        }
        if (key=='clear') {
            player.persistentData.ProfessionInfo=initProfessionInfo
            modify = true
        }
        if(key=='open'){
            player.openMenu(new $SimpleMenuProvider(
                ()=>new $LecternMenu(data[key]),
                ''
            ))
        }
    }
    player.modifyAttribute('generic.attack_damage','customtest',100,'addition')
    player.modifyAttribute('generic.attack_speed','customtest',10,'addition')
    player.modifyAttribute('generic.attack_damage','customtest0',20,'multiply_total')
    if (modify) {
        e.player.sendData('customProfessionSystem', player.persistentData.ProfessionInfo)
    }
})
PlayerEvents.chat(e => {
    let info = e.component.getString()
    /**@type {$ServerPlayer_} */
    let player = e.player
    player.statsCounter.setValue(e.player, $Stats.TIME_SINCE_REST, 0)
    if (!info.startsWith('open')) return
    let id = Number(info.substring(4))
    e.player.openMenu(
        new $SimpleMenuProvider(
            () => new $LecternMenu(id),
            ''
        )
    )
    e.player.persistentData.ProfessionInfo = e.player.persistentData.ProfessionInfo || {
        skillpoint: 0,//技能点
        profession: null,//职业
        level: 1,//等级
        xp: 0,//经验值
        skill: {//技能
            health:0,
            attack:0,
            armor:0,
            speed:0
        }
    }
    let ProfessionInfo = e.player.persistentData.ProfessionInfo
    e.player.sendData('customProfessionSystem', ProfessionInfo)
    e.cancel()
})
