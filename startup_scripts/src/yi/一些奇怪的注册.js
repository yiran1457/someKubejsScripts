//priority:100







$Rarity.create('test',"dark_red")
$Rarity.create('yi',"aqua")
$Rarity.create('evil',"dark_red")
$Rarity.create('holy',"gold")







CapabilityAttachEvents.entity(e=>{
    e.register('test',c=>{
        c.serialize(()=>{
            let tag = c.newTag()
            tag.put('test',c.dataTag)
            return tag
        })

        c.deserialize((tag)=>{
            c.setData(tag.getCompound('test'))
        })
    })
})
