// ignored : true

//根据lang来自动生成tooltip
let tooltip_path
//设置lang的命名空间
let namespace = 'autotooltip'
//设置默认lang类型
let deflang = 'en_us'
//设置默认lang路径
let deflang_path = 'kubejs/assets/' + namespace + '/lang/' + deflang + '.json'

ClientEvents.loggedIn(e => {
    //获取客户端对应lang的路径
    tooltip_path = 'kubejs/assets/' + namespace + '/lang/' + Client.languageManager.selected + '.json'
})

/*
    lang键以tooltip.modid.itemid为开头，后面可随意添加
    若添加了shift或ctrl或alt会进行对应的检测(.shift|.noshift|.ctrl|.noctrl|.alt|.noalt)
    示例json
    {
        "tooltip.minecraft.iron_ingot.shift.ctrl":"shift+ctrl",
        "tooltip.minecraft.iron_ingot.noshift.ctrl":"noshift+ctrl",
        "tooltip.minecraft.iron_ingot.shift.noctrl":"shift+noctrl",
        "tooltip.minecraft.iron_ingot.noshift.noctrl":"noshift+noctrl",
        "tooltip.minecraft.iron_ingot.noshift":"noshift",
        "tooltip.minecraft.iron_ingot.shift":"shift",
        "tooltip.minecraft.iron_ingot.noctrl":"noctrl",
        "tooltip.minecraft.iron_ingot.ctrl":"ctrl",
        "tooltip.minecraft.iron_ingot":"common"
    }
 */


ItemEvents.tooltip(e => {
    //合并默认lang和客户端lang，使客户端lang缺失时使用默认lang
    Object.assign(JsonIO.read(deflang_path), JsonIO.read(tooltip_path))
        .forEach(/**@param {String} langkey*/langkey => {
            //切分键名成数组
            let itemid = langkey.split('.')
            //判断键名首位是否为 tooltip
            if (itemid[0] = 'tooltip') {
                //将itemid数组合并成物品id
                itemid = itemid[1] + ':' + itemid[2]
                e.addAdvanced(itemid, (item, unkonwn, text) => {
                    //进行对shift和ctrl和alt的需求判断
                    let Ctrl, Shift, Alt
                    if (langkey.includes('shift')) {
                        if (langkey.includes('.shift')) {
                            Shift = e.shift
                        } else {
                            Shift = !e.shift
                        }
                    } else { Shift = true }
                    if (langkey.includes('ctrl')) {
                        if (langkey.includes('.ctrl')) {
                            Ctrl = e.ctrl
                        } else {
                            Ctrl = !e.ctrl
                        }
                    } else { Ctrl = true }
                    if (langkey.includes('alt')) {
                        if (langkey.includes('.alt')) {
                            Alt = e.alt
                        } else {
                            Alt = !e.alt
                        }
                    } else { Alt = true }
                    if (Ctrl && Shift && Alt) {
                        text.add(Text.translatable(langkey))
                    }
                })
            }
        })
})

/*
ClientEvents.tick(e=>{
    let mesg
    //mesg = Client.screen.keyPressed($GLFWkey.GLFW_KEY_K,0,12354)
    //Client.tell(mesg)
//Client.tell(Client.screen.keyPressed($GLFWkey.GLFW_KEY_K,1,-1))
//Client.tell(Client.screen.keyPressed(1,$GLFWkey.GLFW_KEY_K,-1))
Client.tell()
//Client.tell(    )
})
$Minecraft.getInstance().keyboardHandler


Client.getWindow().getWindow()

Client.tell(    $Minecraft.getInstance().getWindow().getWindow())
//$InputConstants
Client.tell($InputConstants$Type.SCANCODE.compareTo($InputConstants$Type.SCANCODE))
*/
