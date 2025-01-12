/*let conutdown = 1000
ServerEvents.tick(event => {
    if (conutdown<1200)conutdown++
    else {
        console.info(conutdown)
        conutdown=0
        console.info(event.server.getPlayerNames())
        
    }
}
)*/
/**生成指定范围内的随机整数
 * @param {number} min - 随机数范围的最小值（包含）
 * @param {number} max - 随机数范围的最大值（包含）
 * @returns {number} 在指定范围内的随机整数 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGradientColor(startColor, endColor, steps) {
    let colorList = []
    for (let i=0; i < steps; i++) {
        let ratio = i / (steps - 1)
        colorList.push([
            startColor[0] + ratio * (endColor[0] - startColor[0]),
            startColor[1] + ratio * (endColor[1] - startColor[1]),
            startColor[2] + ratio * (endColor[2] - startColor[2])
        ])
    }
    return colorList;
}

function HsvToRgb(h, s, v){
let c = v * s
let x = c * (1 - Math.abs((h / 60) % 2 - 1))
let m = v - c
let r;let g;let b
if      (h < 60 ){r = c ; g = x ; b = 0}
else if (h < 120){r = x ; g = c ; b = 0}
else if (h < 180){r = 0 ; g = c ; b = x}
else if (h < 240){r = 0 ; g = x ; b = c}
else if (h < 300){r = x ; g = 0 ; b = c}
else             {r = c ; g = 0 ; b = x}
r =(r + m) * 255
g =(g + m) * 255
b =(b + m) * 255
let outrgb = [r,g,b]
return outrgb
}


let intArrayTag = Java.loadClass("net.minecraft.nbt.IntArrayTag")
let intTag = Java.loadClass("net.minecraft.nbt.IntTag")
/**生成随机的UUID */
function getRandomUUID() {
    let uuid1 = new intTag.valueOf(getRandomInt(-2147483648, 2147483647))
    let uuid2 = new intTag.valueOf(getRandomInt(-2147483648, 2147483647))
    let uuid3 = new intTag.valueOf(getRandomInt(-2147483648, 2147483647))
    let uuid4 = new intTag.valueOf(getRandomInt(-2147483648, 2147483647))
    let RandomUUid = new intArrayTag([])
    RandomUUid.add(uuid1)
    RandomUUid.add(uuid2)
    RandomUUid.add(uuid3)
    RandomUUid.add(uuid4)
    return RandomUUid
}

function checkPLayerStage(player,stage){
    return player.stages.getAll().contains(stage)
}

/**从给定数组中随机获取指定数量的元素 
 * @param {Array} array - 待处理的数组
 * @param {number} number - 需要获取的元素数量
 * @returns {Array} - 包含随机获取元素的数组 */
function getSomeValueOfArray(array,number){
    // 初始化输出数组，用于存储从原始数组中随机获取的元素
    let outarray = []
    // 遍历原始数组，但不包括最后一个元素，因为每次循环都会移除一个元素
    for (let i = 0; i < array.length-1; i++) {
        // 获取一个随机索引，范围是从0到当前数组长度减1，确保每个元素都有可能被选中
        let index = getRandomInt(0,array.length-1)
        // 将随机选中的元素添加到输出数组中
        outarray.push(array[index])
        // 从原始数组中移除已选中的元素，防止重复选中
        array.splice(index,1)
    }
    // 返回包含随机获取元素的新数组
    return outarray
}