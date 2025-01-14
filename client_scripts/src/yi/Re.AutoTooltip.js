let  $GLFW  = Java.loadClass("org.lwjgl.glfw.GLFW")

/**
 * 
 * @param {'Q'|'W'|'E'|'R'|'T'|'Y'|'U'|'I'|'O'|'P'|
 * 'A'|'S'|'D'|'F'|'G'|'H'|'J'|'K'|'L'|
 * 'Z'|'X'|'C'|'V'|'B'|'N'|'M'|
 * '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'SPACE'
 * } keyname 
 * @returns 
 */
let keydown = (keyname)=>Client.isKeyDown($GLFW[`GLFW_KEY_${keyname}`])
                                          
let ToCheckKey = (/**@type {string} */key) => {
    if(key.indexOf('no')==-1)
        return keydown(key)?'T':'F'
    return !keydown(key.substring(2))?'T':'F'
}
                                          
//根据lang来自动生成tooltip
let tooltip_path
//设置lang的命名空间
let namespace = 'autotooltip'
//设置默认lang类型
let deflang = 'en_us'



//根据lang来自动生成tooltip
//设置lang的命名空间
let namespace = 'autotooltip'
//设置默认lang类型
let deflang = 'en_us'

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

ItemEvents.tooltip(e => {
    //合并默认lang和客户端lang，使客户端lang缺失时使用默认lang
    Object.assign(
        JsonIO.read('kubejs/assets/' + namespace + '/lang/' + deflang + '.json'), 
        JsonIO.read('kubejs/assets/' + namespace + '/lang/' + Client.languageManager.selected + '.json')
    )
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
