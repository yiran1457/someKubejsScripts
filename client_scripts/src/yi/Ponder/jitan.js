Ponder.registry((event) => {
	event.create(["ars_nouveau:arcane_pedestal","ars_nouveau:arcane_platform"]) // 填入需要添加 Ponder 的 Item/Tag, 填入多个时要用 [ ] 包裹
		.scene(
			"ars_nouveau:arcane_pedestal", // Ponder ID
			"祭坛 ", // 侧边显示的标题
            "kubejs:an_xun_si",
			(scene, utils) => {
				// 在 { } 内的即是此场景的内容
                
scene.showBasePlate()
scene.idle(20)
scene.world.setBlocks([4, 1, 4], "ars_nouveau:arcane_pedestal")
scene.world.showSection([4, 1, 4], Direction.DOWN)
scene.idle(20)
scene.world.setBlocks([4, 1, 7], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([4, 1, 7], (state) => state.with("facing", "up"), false)
scene.world.showSection([4, 1, 7], Direction.DOWN)
scene.idle(2)
scene.world.setBlocks([6, 1, 6], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([6, 1, 6], (state) => state.with("facing", "up"), false)
scene.world.showSection([6, 1, 6], Direction.DOWN)
scene.idle(2)
scene.world.setBlocks([7, 1, 4], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([7, 1, 4], (state) => state.with("facing", "up"), false)
scene.world.showSection([7, 1, 4], Direction.DOWN)
scene.idle(2)
scene.world.setBlocks([6, 1, 2], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([6, 1, 2], (state) => state.with("facing", "up"), false)
scene.world.showSection([6, 1, 2], Direction.DOWN)
scene.idle(2)
scene.world.setBlocks([4, 1, 1], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([4, 1, 1], (state) => state.with("facing", "up"), false)
scene.world.showSection([4, 1, 1], Direction.DOWN)
scene.idle(2)
scene.world.setBlocks([2, 1, 2], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([2, 1, 2], (state) => state.with("facing", "up"), false)
scene.world.showSection([2, 1, 2], Direction.DOWN)
scene.idle(2)
scene.world.setBlocks([1, 1, 4], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([1, 1, 4], (state) => state.with("facing", "up"), false)
scene.world.showSection([1, 1, 4], Direction.DOWN)
scene.idle(2)
scene.world.setBlocks([2, 1, 6], "ars_nouveau:arcane_platform")
scene.world.modifyBlock([2, 1, 6], (state) => state.with("facing", "up"), false)
scene.world.showSection([2, 1, 6], Direction.DOWN)
scene.idle(5)
scene.overlay.showOutline("green", {}, [4, 1, 4], 30)
scene.overlay.showOutline("green", {}, [4, 1, 7], 30)
scene.overlay.showOutline("green", {}, [6, 1, 6], 30)
scene.overlay.showOutline("green", {}, [7, 1, 4], 30)
scene.overlay.showOutline("green", {}, [6, 1, 2], 30)
scene.overlay.showOutline("green", {}, [4, 1, 1], 30)
scene.overlay.showOutline("green", {}, [2, 1, 2], 30)
scene.overlay.showOutline("green", {}, [1, 1, 4], 30)
scene.overlay.showOutline("green", {}, [2, 1, 6], 30)
scene.text(30, '至此祭坛搭建完成,在上面放入祭品准备开始仪式' , [4.5, 2, 4.85])
scene.idle(40)
scene.addKeyframe()
scene.showControls(30, [4, 2, 4], "left") // 在 [3, 1, 5] 的右方创建一个向左指的框, 时长为 30 Tick
.rightClick() // 在框内显示 鼠标右键 的图示
.withItem("ars_nouveau:dowsing_rod") // 在框内显示 "immersiveengineering:hammer" 的图示
scene.text(30, '右键开始仪式' , [4.5, 2, 4.85])
scene.idle(20)
			}
		)
})
