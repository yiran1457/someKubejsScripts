




function secondsToTime(seconds) {
    // 确保输入的是正数，并且是有限的数值
    if (isNaN(seconds) || seconds < 0) {
        return 'Invalid input';
    }

    // 将秒数四舍五入到最接近的整数
    seconds = Math.floor(seconds);

    // 计算小时、分钟和秒
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let remainingSeconds = seconds - (hours * 3600) - (minutes * 60);

    // 格式化输出
    let result = [
        padZero(hours),
        padZero(minutes),
        padZero(remainingSeconds)
    ].join(':');

    // 如果小时数为0，则只返回分钟和秒
    if (hours === 0) {
        result = result.split(':').slice(1).join(':');
    }

    return result;
}

function padZero(/**@type {Number}*/num) {
    return num.toString().padStart(2, '0')
}

function numberToRoman(num) {
    if (typeof num !== 'number' || num <= 0 || num >= 4000) {
        return 'Invalid input';
    }

    const romanNumerals = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];

    let roman = '';

    for (let [value, symbol] of romanNumerals) {
        while (num >= value) {
            roman += symbol;
            num -= value;
        }
    }

    return roman;
}
let getEffectLangKey = (id) => $MobEffect.byId($MobEffect.getId(id)).descriptionId

let getEffectCategory = (id) => $MobEffect.byId($MobEffect.getId(id)).category








let createtool$type = ['yi:tool_axe', 'yi:tool_pickaxe', 'yi:tool_shovel', 'yi:tool_sword', 'yi:tool_hoe']
ItemEvents.tooltip(event => {
    event.addAdvanced('ringsofascension:ring_health', (I, A, L) => {
        let first = L.getFirst()
        L.removeFirst()
        L.addFirst(Component.of('§4Evil  ').append(first))
    })
    event.addAdvanced('mna:wand_clone', (arg0, arg1, arg3) => {
        if (arg0.nbt != undefined) {
            let fe = ToChangeInt(arg0.nbt.getInt('energy'))
            let maxfe = ToChangeInt(arg0.nbt.getInt('maxenergy') + 648000)
            arg3.set(1, [Text.of(`§eFE§r:§d${fe}§r/§a${maxfe}`)])
            arg3.set(1, [Text.of('§11§22§33§44§55§66§77§88§99§aa§bb§cc§dd§ee')])
        }
    })

    for (let index = 0; index < createtool$type.length; index++) {
        event.addAdvanced(createtool$type[index], (arg0, arg1, arg3) => {
            if (arg3.length > 1) {
                if (arg0.nbt != undefined) {
                    let fe = ToChangeInt(arg0.nbt.getInt('energy'))
                    let maxfe = ToChangeInt(arg0.nbt.getInt('maxenergy') + 648000)
                    arg3.set(1, [Text.of(`§eFE§r:§d${fe}§r/§a${maxfe}`)])
                }
            }
        })
    }

})

ItemEvents.tooltip(event => {


    event.addAdvanced(/sons_of_sins:sinful_(axe|pickaxe|sword|shovel|hoe)/i, (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable('tooltip.sons_of_sins.sinful_*'))
    })

    event.addAdvanced(/sons_of_sins:flesh_(axe|pickaxe|sword|shovel|hoe)/i, (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable('tooltip.sons_of_sins.flesh_*'))
    })

    event.addAdvanced(/sons_of_sins:osseous_(axe|pickaxe|sword|shovel|hoe)/i, (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable('tooltip.sons_of_sins.osseous_*'))
    })

    event.addAdvanced(/sons_of_sins:soul_steel_/i, (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable('tooltip.sons_of_sins.soul_steel_*'))
    })

    event.addAdvanced('sons_of_sins:shape_shifting_tool', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:sickle_of_struggle', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:ether_sword', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:bloody_bone', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:wistivers_jaws', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:bottle_of_blood', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:remnant_chestplate', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:soul_steel', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:ether_ashes', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:blood_bucket', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:butcher_cleaver', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:flesh_carcass', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:puppet_of_strife', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:hand_of_riot', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:ether_engine', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:cursed_head', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced('sons_of_sins:touch_of_greed', (ItemStack, boolean, textList) => {
        textList.set(1, Text.translatable(`tooltip.${ItemStack.id.replace(":", ".")}`))
    })

    event.addAdvanced(/born_in_chaos_v1:dark_metal_armor_/, (ItemStack, boolean, textList) => {
        if (textList.length > 1) {
            textList.set(1, Text.of('§7完整护甲套装奖励:'))
            textList.set(2, Text.of('§8让你陷入狂暴状态'))
            textList.set(3, Text.of('§8在生命值低时'))
            textList.set(4, Text.of('§8凋灵保护'))
        }
    })

    event.addAdvanced("yi:infinity_potion", (ItemStack, boolean, textList) => {
        if (textList.length > 1) {
            let count = 10, timecount = 0, levelcount = 0
            if (ItemStack.nbt != null && ItemStack.nbt.Effects != undefined) {
                ItemStack.nbt.Effects.forEach((value, index) => {
                    let effname = getEffectLangKey(value.potion)
                    if (event.shift) {
                        textList.add(1, [Text.translatable(effname), ` ${numberToRoman(value.level)}`, `   (${secondsToTime(value.time)})`])
                    }
                    timecount = timecount + value.time//计算时间总和(s)
                    levelcount = levelcount + value.level//计算等级总和
                })
                //设置饮用时间
                count = (count + levelcount * 10 + timecount / 30) * Math.pow(1.1, ItemStack.nbt.Effects.length - 1)
            }
            textList.add(1, Text.of(`按§eshift§r查看药水详情`))
            textList.add(1, Text.of(`饮用时间为§e${Math.floor(count / 20 * 100) / 100}§rs`))
        }
    })

    event.addAdvanced("yi:random_potion", (ItemStack, boolean, textList) => {
        let count = 10, timecount = 0, levelcount = 0, needcountdown = 0
        if (ItemStack.nbt != null && ItemStack.nbt.Effects != undefined) {
            ItemStack.nbt.Effects.forEach((value, index) => {
                let effname = getEffectLangKey(value.potion)
                let EffectCategory = getEffectCategory(value.potion)
                let effcolor
                if (EffectCategory == "BENEFICIAL") {
                    effcolor = Color.rgba(71, 212, 71, 0.84)
                } else if (EffectCategory == "HARMFUL") {
                    effcolor = Color.rgba(213, 32, 32, 0.89)
                } else {
                    effcolor = Color.rgba(56, 86, 204, 0.87)
                }
                if (event.shift && Client.player.stages.has("level")) {
                    textList.add(1, [Text.translatable(effname).color(effcolor), Text.of(` ${numberToRoman(value.level)}`).color(effcolor), Text.of(`   (${secondsToTime(value.time)})`).color(effcolor)])
                }
                timecount = timecount + value.time//计算时间总和(s)
                levelcount = levelcount + value.level//计算等级总和
            })
            //设置饮用时间
            count = (count + levelcount * 10 + timecount / 30) * Math.pow(1.1, ItemStack.nbt.Effects.length - 1)
            needcountdown = Math.max(Math.floor((count - Client.level.time + ItemStack.nbt.getLong('DrinkTime')) / 20), 0)
        }
        if (!Client.player.stages.has("level")) { textList.add(1, Text.of(`你现在的学识不足以查看药水详情`)) }
        else if (!event.shift) { textList.add(1, Text.of(`按§eshift§r查看药水详情`)) }
        if (!event.shift) {
            textList.add(1, Text.of(`§8剩余冷却时间§7${needcountdown}§8s`))
            textList.add(1, Text.of(`饮用冷却为§e${Math.floor(count / 20)}§rs`))
            textList.add(1, Text.of(`§5这瓶药水似乎永远也喝不完,饮用冷却似乎和其中药水的强度有关`))
            textList.add(1, Text.of(`§5被诅咒的药水,在每次饮用后会刷新其中的效果(或许有某种办法祛除诅咒)`))
        }
    })

    event.addAdvanced('yi:custom_alchemy', (i, a, t) => {
        switch (true) {
            case i.nbt?.Item == undefined:
                break
            case !event.shift:
                t.add(1, Component.of('内含物品[按shift显示]'))
                break
            case event.shift:
                t.add(1, Component.of('内含物品'))
            case event.shift && i.nbt?.Item != undefined:
                /**@type {{id:string}[]} */
                let itemList = i.nbt.Item.toArray()
                itemList.forEach((item, index) => {
                    if (index == itemList.length - 1)
                        t.add(2 + index, Component.of(` ╚ `).gray().append(Component.translatable(`${Item.of(item.id).descriptionId}`).gray()))
                    else
                        t.add(2 + index, Component.of(` ╠ `).gray().append(Component.translatable(`${Item.of(item.id).descriptionId}`).gray()))
                })
        }
    })


})


ItemEvents.firstRightClicked('command_block', e => {
    let i = 0
    let potionlist = { "BENEFICIAL": [], "HARMFUL": [], "NEUTRAL": [] }
    try {
        for (i = 1; i > 0; i++) {
            potionlist[$MobEffect.byId(i).getCategory().name()].push(
                $MobEffect.byId(i).descriptionId
                    .replace("effect.", "")
                    .replace(".", ":")
                    .replace("potion:", "")
            )
        }
    } catch (err) {
    }
    Client.tell(`已找到§e${i - 1}§r个药水效果`)
    Client.tell(`正面效果§e${potionlist.BENEFICIAL.length}§r个`)
    Client.tell(`负面效果§e${potionlist.HARMFUL.length}§r个`)
    Client.tell(`中立效果§e${potionlist.NEUTRAL.length}§r个`)
    JsonIO.write("./potion.json", potionlist)
})
