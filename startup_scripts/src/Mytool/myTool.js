//priority:4000
function weakNBT(target, origin){
    for (let key in origin) {
        if (typeof origin[key] != typeof target[key]) return false
        switch (true) {
            case origin[key] instanceof Array:
                if (!target[key] instanceof Array)
                    return false
                /**@type {Array} */
                let originlist = origin[key].sort()
                /**@type {Array} */
                let targetlist = target[key].sort()
                if (targetlist.length == 0 && originlist.length != 0) return false
                for (let originindex = 0; originindex < originlist.length; originindex++) {
                    let originvalue = originlist[originindex]
                    for (let targetindex = 0; targetindex < targetlist.length; targetindex++) {
                        let targetvalue = targetlist[targetindex]
                        let pass = false
                        switch (true) {
                            case originvalue instanceof Object:
                                if (weakNBT(targetvalue, originvalue))
                                    pass = true
                                break
                            case originvalue == targetvalue:
                                pass = true
                        }
                        if (targetlist.length - targetindex < originlist.length - originindex) {
                            return false
                        }
                        if (pass) {
                            targetlist.slice(0, targetindex + 1)
                            break
                        }
                        if(targetlist.length - targetindex==1)
                            return false
                    }
                }
                break
            case origin[key] instanceof Object:
                if (!weakNBT(target[key], origin[key]))
                    return false
                break
            default:
                if (origin[key] != target[key]) return false
        }
    }
    return true
}