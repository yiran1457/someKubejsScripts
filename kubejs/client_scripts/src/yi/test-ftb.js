
//用于找出所有的id
console.log(Client.resourceManager.getNamespaces())

//写出未翻译语言文件在指定文件夹
writeLang("art_of_forging", 'kubejs/lang/')
/**
 * @param {string} modid 
 * @param {string} path
 */
function writeLang(modid, path) {
  let en_us = readLang(modid, 'en_us')
  if (en_us == null) return
  let zh_cn = readLang(modid, 'zh_cn')
  let returnLang = {}
  if (zh_cn != null) {
    en_us.forEach((k, v) => {
      if (zh_cn.get(k)) return
      returnLang[k] = v
    })
  } else (
    returnLang = en_us
  )
  JsonIO.write(path + modid + '.json', returnLang)
}
/**
 * @param {string} modid 
 * @param {string} lang 
 * @returns {$HashMap_<string,string>||null}
 */
function readLang(modid, lang) {
  let langFile = Client.resourceManager.getResource(modid + ':lang/' + lang + '.json').orElse(null)
  if (langFile != null) {
    let t = ''
    langFile.openAsReader().lines().toList().forEach(v => {
      t += v
    })
    langFile = JsonIO.parse(t)
  }
  return langFile
}


// Ingredient.all.itemIds.forEach(v=>{
//   if(/台阶/.test(Item.of(v).displayName.getString()))
//     console.log(v+'/'+'/'+Item.of(v).displayName.getString())
// })