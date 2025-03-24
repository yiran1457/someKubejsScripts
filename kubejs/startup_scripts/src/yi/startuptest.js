StartupEvents.registry('enchantment',e=>{
    e.create('test')
})
KeyBindEvents.register(event=>{
    event.create('ftb-item','key.ftb-item',GLFW.GLFW_KEY_I,'key.category.common')
})