//requires:create
//requires:kubejs_create
//priority:100

const create$tool = {
    /**注册搅拌配方 */
    mixing:{
        create:null,
        input:[],
        output:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.mixing
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            mixing:null
            this.input=[]
            this.output=[]
            this.time=15
            this.heat=null
            return this
        }
        
    },
    /**注册动力合成器配方 */
    mechanical_crafting:{
        create:null,
        input:{},
        output:null,
        shape:null,
        /**获取event */
        getEvent:function(/**@type {$RecipesEventJS_} */e){
            this.create=e.recipes.create.mechanical_crafting
            return this
        },
        /**添加输入物品 */ 
        addInput:function(key,input){
            this.input[key]=input
            return this
        },
        /**添加输出物品 */
        addOutput:function(output){
            this.output = output
            return this
        },
        setShape:function(shape){
            this.shape = shape
            return this
        },
        /**完成配方构建 */
        over:function(){
            this.create(this.output , this.shape , this.input)
            this.input={}
            this.output=null
            this.shape=null
            return this
        }
    },
    /**注册压块塑型配方 */
    compacting:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.compacting
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册压片配方 */
    pressing:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.pressing
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册洗涤配方 */
    splashing:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.splashing
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册缠魂配方 */
    haunting:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.haunting
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册石磨配方 */
    milling:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.milling
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册粉碎轮配方 */
    crushing:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.crushing
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册注液器配方*/
    filling:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.filling
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册分液池配方 */
    emptying:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.emptying
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册动力锯配方 */
    cutting:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.cutting
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册砂纸打磨配方 */
    sandpaper_polishing:{
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.sandpaper_polishing
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time)}
            else{this.create(this.output , this.input , this.time , this.heat)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            return this
        }
    },
    /**注册机械手配方 */
    deploying:{
        keep:'false',
        create:null,
        output:[],
        input:[],
        time:15,
        heat:null,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create.deploying
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.input.push(input)
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置加工时间 */
        setTime:function(time){
            this.time = time
            return this
        },
        /**设置加热等级 */
        setHeat:function(heat){
            if(heat==0)heat=null
            if(heat==1)heat="heated"
            if(heat==2)heat="superheated"
            this.heat = heat
            return this
        },
        /**设置是否保留物品 */
        setKeep:function(){
            this.keep='true'
            return this
        },
        /**完成配方构建 */
        over:function(){
            if (this.heat == null){this.create(this.output , this.input , this.time , this.keep)}
            else{this.create(this.output , this.input , this.time , this.heat , this.keep)}
            this.create=null
            this.output=[]
            this.input=[]
            this.time=15
            this.heat=null
            this.keep='flase'
            return this
        }
    },
    /**注册序列装配配方 */
    sequenced_assembly:{
        step:[],
        loops:1,
        /**获取event */
        getEvent:function(e){
            this.create=e.recipes.create
            return this
        },
        /**添加输入物品 */ 
        addInput:function(input){
            this.transitional=input
            this.input=input
            return this
        },
        /**添加输出物品 */
        addOutput:function(output,chance){
            this.output=this.output||[]
            if(chance==null)chance=1
            this.output.push(output.withChance(chance))
            return this
        },
        /**设置半成品 */
        setTransitional:function(transitional){
            this.transitional=transitional
            return this
        },
        /**设置装配次数 */
        setLoops:function(loops){
            this.loops=loops
            return this
        },
        /**设置是否保留物品 */
        setKeep:function(){
            this.keep='true'
            return this
        },
        /**添加机械手工序 */
        addDeployingStep:function(item,keep){
            if(keep==null){this.step.push(this.create.deploying(this.transitional,[this.transitional,item]))}
            else{this.step.push(this.create.deploying(this.transitional,[this.transitional,item]).keepHeldItem())}
            return this
        },
        /**添加动力锯工序 */
        addCuttingStep:function(){
            this.step.push(this.create.cutting(this.transitional,this.transitional))
            return this
        },
        /**添加注液器工序 */
        addFillingStep:function(fluid){
            this.step.push(this.create.filling(this.transitional,[this.transitional,fluid]))
            return this
        },
        /**添加辊压工序 */
        addPressingStep:function(){
            this.step.push(this.create.pressing(this.transitional,this.transitional))
            return this
        },
        /**完成配方构建 */
        over:function(){
            this.create.sequenced_assembly(this.output , this.input , this.step , this.transitional , this.loops)
            this.create=null
            this.output=[]
            this.input=[]
            this.keep='flase'
            return this
        }

    }
}





