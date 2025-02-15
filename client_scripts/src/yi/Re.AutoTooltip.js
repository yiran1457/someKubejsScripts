

//根据lang来自动生成tooltip
let tooltip_path
//设置lang的命名空间
let namespace = 'autotooltip'
//设置默认lang类型
let deflang = 'zh_cn'
//设置默认lang路径
let deflang_path = 'kubejs/assets/' + namespace + '/lang/' + deflang + '.json'

ClientEvents.loggedIn(e => {
    //获取客户端对应lang的路径
    tooltip_path = 'kubejs/assets/' + namespace + '/lang/' + Client.languageManager.selected + '.json'
})

/*
    lang键以modid.itemid为开头，tooltip为结尾，中间为检测按键，不可错填
    常见特殊按键:左shift:LEFT_SHIFT  左ctrl:LEFT_CONTROL  左alt:LEFT_ALT
    字母按键使用大写
    示例json
    {
        "minecraft.iron_ingot.LEFT_SHIFT.LEFT_CONTROL.tooltip":"shift+ctrl",
        "minecraft.iron_ingot.LEFT_SHIFT.N.tooltip":"shift+n",
        "minecraft.iron_ingot.LEFT_CONTROL.M.tooltip":"ctrl+n"
    }
 */
let ToCheckKey = (/**@type {string} */key) => {
    if(key.indexOf('no')==-1)
        return keydown(key)?'T':'F'
    return !keydown(key.substring(2))?'T':'F'
}

ItemEvents.tooltip(e => {
    //合并默认lang和客户端lang，使客户端lang缺失时使用默认lang
    Object.assign(JsonIO.read(deflang_path), JsonIO.read(tooltip_path))
        .forEach(/**@param {String} langkey*/langkey => {
            //切分键名成数组
            let keysplit = langkey.split('.')
            let tooltipIndex = keysplit.indexOf('tooltip')
            if (tooltipIndex !== -1&&tooltipIndex !== 0) {
                //将itemid数组合并成物品id
                let itemid = keysplit[0] + ':' + keysplit[1]
                e.addAdvanced(itemid, (item, unkonwn, text) => {
                    let keydowncheck = keysplit.slice(2,tooltipIndex).map((key) => ToCheckKey(key) )
                    if (keydowncheck.indexOf('F') === -1)
                        text.add(Text.translatable(langkey))
                })
            }
        })
})