//priority:1000

/**@type {$Color_} */
const $Color = Java.loadClass("java.awt.Color");


//将数字转换为
function formatNumber(num) {
    if (num === 0) return '0';
    const units = ['k', 'm', 'b', 'p'];
    let unitIndex = -1;
    while (Math.abs(num) >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }
    num = num.toFixed(num % 1 !== 0 ? 1 : 0);
    return `${num}${unitIndex >= 0 ? units[unitIndex] : ''}`;
}
function rgbaColor( R, G, B, A){ new $Color(R/255,G/255,B/255,A/100).getRGB() }
