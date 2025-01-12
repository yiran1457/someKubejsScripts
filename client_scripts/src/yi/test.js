
let face = 0
let facemax = 60


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

function ToDrawSixstar(x,y,z,r,step){
    let hsvcolor = generateGradientColor([0,0,0.75],[180,1,1],step)
    let rgbcolor = []
    for (let i0 = 0; i0 < hsvcolor.length; i0++) {
    rgbcolor.push(HsvToRgb(hsvcolor[i0][0],hsvcolor[i0][1],hsvcolor[i0][2]))
    }
    //console.info(hsvcolor)
    let Π = 3.14159
    let spark =2*Π/step/8
    for (let i = 0; i < 8; i++){
    for (let j = 0; j < step; j++) {

    let outz1 = z + Math.sin(spark*j+i*step*spark+face/facemax*2*Π)*r
    let outx1 = x+Math.cos(spark*j+i*step*spark+face/facemax*2*Π)*r
    let lizi1 = Client.particleEngine.createParticle('minecraft:electric_spark', outx1, y, outz1, 0, 0, 0)
    lizi1.setColor(54,0,150)
    lizi1.setColor(rgbcolor[step-j-1][0]/255,rgbcolor[step-j-1][1]/255,rgbcolor[step-j-1][2]/255)
    lizi1.setLifetime(-1)

    let outz2 = z+(Math.sin(i*step*spark+face/facemax*2*Π)-Math.sin((i+3)*step*spark+face/facemax*2*Π))*j*r/step-Math.sin(i*step*spark+face/facemax*2*Π)*r
    let outx2 = x+(Math.cos(i*step*spark+face/facemax*2*Π)-Math.cos((i+3)*step*spark+face/facemax*2*Π))*j*r/step-Math.cos(i*step*spark+face/facemax*2*Π)*r
    let lizi2 = Client.particleEngine.createParticle('minecraft:electric_spark', outx2, y, outz2, 0, 0, 0)
    lizi2.setColor(rgbcolor[j][0]/255,rgbcolor[j][1]/255,rgbcolor[j][2]/255)
    lizi2.setLifetime(-1)

    /*let outz3 = z+(Math.sin(i*step*spark+face/facemax*2*Π)-Math.sin((i+2)*step*spark+face/facemax*2*Π))*j*r/step-Math.sin(i*step*spark+face/facemax*2*Π)*r
    let outx3 = x+(Math.cos(i*step*spark+face/facemax*2*Π)-Math.cos((i+2)*step*spark+face/facemax*2*Π))*j*r/step-Math.cos(i*step*spark+face/facemax*2*Π)*r
    let lizi3 = Client.particleEngine.createParticle('minecraft:electric_spark', outx3, y, outz3, 0, 0, 0)
    lizi3.setColor(rgbcolor[j][0]/255,rgbcolor[j][1]/255,rgbcolor[j][2]/255)
    lizi3.setLifetime(-1)*/

}}
}
function ToChangeInt(int){
    if (int<1000){
    }else if (int<1000000){
        int = Math.floor(int/10)/100+'K'
    }else if (int<1000000000){
        int = Math.floor(int/10000)/100 +'M'
    }else if (int<1000000000000){
        int = Math.floor(int/10000000)/100 +'B'
    }
    return int
}


ClientEvents.tick(event=>{
    if (face<facemax)face++
    else face=0
    let{player,level}=event
    let{x,y,z,facing}=player
    //let currentParticle = 'minecraft:electric_spark'
    //let p = Client.particleEngine.createParticle(currentParticle, x, y, z, 0, 0, 0)
    //p.lifetime = 60
    //ToDrawSixstar(x,y+0.1,z,Math.abs(facemax/2-face)/facemax+3-0.25,16)
})