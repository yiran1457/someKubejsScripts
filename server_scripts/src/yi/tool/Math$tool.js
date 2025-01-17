yi$tool.Math$tool={
    RGBtoHEX:(R,G,B)=>`${R.toString(16)}${G.toString(16)}${B.toString(16)}`
    ,HEXtoRGB:(HEX)=>({R:parseInt(HEX.slice(0, 2), 16),G:parseInt(HEX.slice(2, 4), 16),B:parseInt(HEX.slice(4, 6), 16)})
    ,HSVtoRGB:(H,S,V)=>{
        let [ c, x, m ]=[ V*S, V*S*(1-Math.abs((H/60)%2-1)), V-V*S]
        let [r,g,b]=[0,0,0]
        if      (H<60 ){r=c;g=x;b=0}
        else if (H<120){r=x;g=c;b=0}
        else if (H<180){r=0;g=c;b=x}
        else if (H<240){r=0;g=x;b=c}
        else if (H<300){r=x;g=0;b=c}
        else           {r=c;g=0;b=x}
        return {R:(r+m)*255,G:(g+m)*255,B:(b+m)*255}
    }
    ,RGBtoHSV:(R,G,B)=>{
        R/=255,G/=255,B/=255
        let max = Math.max(R, G, B), min = Math.min(R, G, B);
        let h, s, v = max;
        let d = max - min;
        s = (max === 0) ? 0 : d / max;
        if (max === min) {
            h = 0; 
        } else {
            switch (max) {
                case R: h = (G - B) / d + (G < B ? 6 : 0); break;
                case G: h = (B - R) / d + 2; break;
                case B: h = (R - G) / d + 4; break;
            }
            h /= 6;
        }
        return {H:h, S:s, V:v};
    }
    ,RandomIntFrom:(Min,Max)=>{
        Min = Math.ceil(Min);
        Max = Math.floor(Max);
        return Math.floor(Math.random() * (Max - Min + 1)) + Min;
    }
    ,RandomNumberFrom:(Min,Max)=>Math.random()*(Max-Min)+Min
}
