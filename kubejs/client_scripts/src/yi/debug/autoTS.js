if (true) {
  let readFileList = [
    "kubejs/client_scripts/src/yi/init/ClassLoadHandler.js"
  ]
  let importList = []
  let constList = []
  let customClass = [
    "$Long"
  ]
  let customClassText = [
    `class My$Long {
static parseLong(数字: string, 进制: number): My$Long
}`
  ]
  readFileList.forEach(path => {
    JSIO.read(path).forEach(/**@param {string} v*/v => {
      if (v == '' || v.startsWith("//priority")) return
      if (v.startsWith("//")) {
        importList.push(v)
      }
      else {
        let className = v.substring(v.indexOf('{') + 2, v.indexOf('}') - 1)
        let classPath = v.substring(v.indexOf('(') + 1, v.indexOf(')'))
        let Import = `import { ${className} as My${className} } from ${classPath}`
        let Const = `const ${className}: typeof My${className}`
        if (customClass.indexOf(className) == -1)
          importList.push(Import)
        constList.push(Const)
      }
    })
  })

  let writefile = [].concat(importList).concat(["declare global {"]).concat(constList).concat(["}"]).concat(customClassText)
  JSIO.write("kubejs/client_scripts/src/yi/init/ClassLoadHandler.d.ts", writefile)
}
