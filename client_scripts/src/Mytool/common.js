//priority:1000


//将数字转换
function formatNumber(num) {
    if (num === 0) return '0';
    const units = ['K', 'M', 'B', 'P'];
    let unitIndex = -1;
    while (Math.abs(num) >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }
    num = num.toFixed(num % 1 !== 0 ? 1 : 0);
    return `${num}${unitIndex >= 0 ? units[unitIndex] : ''}`;
}
function rgbaColor(R, G, B, A) {return new $Color(R / 255, G / 255, B / 255, A / 100).getRGB() }





/**
 * 
 * @param {'Q'|'W'|'E'|'R'|'T'|'Y'|'U'|'I'|'O'|'P'|
 * 'A'|'S'|'D'|'F'|'G'|'H'|'J'|'K'|'L'|
 * 'Z'|'X'|'C'|'V'|'B'|'N'|'M'|
 * '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|
 * 'SPACE'|'LEFT_SHIFT'|'LEFT_CONTROL'|'LEFT_ALT'
 * } keyname 
 * @returns 
 */
const keydown = (keyname)=>Client.isKeyDown($GLFW[`GLFW_KEY_${keyname}`]

)
/*
PlayerEvents.tick(e=>{
    Client.tell( keydown("8"))
})
*/