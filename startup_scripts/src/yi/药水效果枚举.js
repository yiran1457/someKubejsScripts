//priority:1000

let getRandomInt = (min,max) =>Math.floor(Math.random()*(max-min+1)+min)
function getRandomPotionList(){
	//初始化返回药水列表
	let effects$return = []
	//获取药水效果数量
	let effects$count = getRandomInt(5,7)
	for(let i=0;i<effects$count;i++){
		let effects$type = ''
		let count = getRandomInt(0,100)
		//判断药水效果类型
		count<40 ? effects$type="BENEFICIAL" : count<60 ? effects$type="NEUTRAL" : effects$type="HARMFUL"
		//从枚举药水效果中获取对应类型的药水效果列表
		let effects$list = potionlist[effects$type]
		//在对应列表中获取随机药水效果
		let effects$potion = effects$list[getRandomInt(0,effects$list.length-1)]
		effects$return.push({      
			//等级，1即对应1级
			level: getRandomInt(0,10),
			potion: effects$potion,
			//药水效果时长，1对应1秒
			time: getRandomInt(20,600)
		})
	}
	return effects$return
}

//药水效果列表
const potionlist = 
{
	"BENEFICIAL": [
		"minecraft:speed",
		"minecraft:haste",
		"minecraft:strength",
		"minecraft:instant_health",
		"minecraft:jump_boost",
		"minecraft:regeneration",
		"minecraft:resistance",
		"minecraft:fire_resistance",
		"minecraft:water_breathing",
		"minecraft:invisibility",
		"minecraft:night_vision",
		"minecraft:health_boost",
		"minecraft:absorption",
		"minecraft:saturation",
		"minecraft:luck",
		"minecraft:slow_falling",
		"minecraft:conduit_power",
		"minecraft:dolphins_grace",
		"minecraft:hero_of_the_village",
		"tetra:howling",
		"tetra:steeled",
		"tetra:small_strength",
		"tetra:unwavering",
		"tetra:small_health",
		"tetra:small_absorb",
		"tetra:suspended",
		"tetra:mining_speed",
		"alexsmobs:knockback_resistance",
		"alexsmobs:lava_vision",
		"alexsmobs:sunbird_blessing",
		"alexsmobs:poison_resistance",
		"alexsmobs:oiled",
		"alexsmobs:orcas_might",
		"alexsmobs:bug_pheromones",
		"alexsmobs:soulsteal",
		"alexsmobs:clinging",
		"alexsmobs:tigers_blessing",
		"alexsmobs:fleet_footed",
		"alexsmobs:mosquito_repellent",
		"relics:vanishing",
		"farmersdelight:nourishment",
		"farmersdelight:comfort",
		"born_in_chaos_v1:light_rampage",
		"born_in_chaos_v1:medium_rampage",
		"born_in_chaos_v1:strong_rampage",
		"born_in_chaos_v1:furious_rampage",
		"born_in_chaos_v1:rampant_rampage",
		"modulargolems:atomic_boost",
		"born_in_chaos_v1:bone_barrier",
		"born_in_chaos_v1:stimulation",
		"born_in_chaos_v1:vampiric_touch",
		"cataclysm:monstrous",
		"cataclysm:blessing_of_amethyst",
		"cataclysm:ghost_form",
		"mowziesmobs:suns_blessing",
		"mowziesmobs:geomancy",
		"mowziesmobs:poison_resist",
		"mowziesmobs:sunblock",
		"ars_nouveau:mana_regen",
		"ars_nouveau:scrying",
		"ars_nouveau:glide",
		"ars_nouveau:flight",
		"ars_nouveau:spell_damage",
		"ars_nouveau:immolate",
		"ars_nouveau:bounce",
		"ars_nouveau:magic_find",
		"ars_nouveau:recovery",
		"ars_nouveau:shielding",
		"sons_of_sins:instinct",
		"sons_of_sins:boiling",
		"sons_of_sins:acid_bloodstream",
		"sons_of_sins:arctic_cells",
		"sons_of_sins:hercules_fury",
		"sons_of_sins:stretchy_tendons",
		"alexscaves:deepsight",
		"alexscaves:darkness_incarnate",
		"modulargolems:mechanical_mobility",
		"modulargolems:mechanical_force",
		"mna:repair",
		"mna:eldrin_sight",
		"mna:wellspring_sight",
		"mna:chrono_anchor",
		"mna:mana_boost",
		"mna:mana_regen",
		"mna:instant_mana",
		"mna:mana_stunt",
		"mna:mana_shield",
		"mna:briarthorn_barrier",
		"mna:flame_cloak",
		"mna:greater_invisibility",
		"mna:divination",
		"mna:mist_form",
		"mna:mind_vision",
		"mna:choosing_wellspring",
		"mna:eldrin_flight",
		"mna:circle_of_power",
		"mna:wind_wall",
		"mna:levitation",
		"mna:fossilize",
		"mna:bind_wounds",
		"mna:telekinesis",
		"mna:water_walking",
		"mna:spider_climbing",
		"mna:soar",
		"mna:aura_of_frost",
		"mna:burning_rage",
		"mna:camouflage",
		"mna:bulwark",
		"mna:sense_life",
		"mna:pilgrim",
		"quark:resilience",
		"fruitsdelight:shrinking",
		"fruitsdelight:lozenge",
		"fruitsdelight:appetizing",
		"fruitsdelight:heal_aura",
		"fruitsdelight:refreshing",
		"fruitsdelight:sweetening",
		"fruitsdelight:brightening",
		"fruitsdelight:recovering",
		"fruitsdelight:digesting",
		"fruitsdelight:leaf_piercing",
		"fruitsdelight:cycling",
		"fruitsdelight:alienating",
		"fruitsdelight:suspicious_smell",
		"born_in_chaos_v1:wither_resistance",
		"born_in_chaos_v1:insect_protection",
		"born_in_chaos_v1:dark_ward",
		"alexscaves:sugar_rush"
	],
	"HARMFUL": [
		"minecraft:slowness",
		"minecraft:mining_fatigue",
		"minecraft:instant_damage",
		"minecraft:nausea",
		"minecraft:blindness",
		"minecraft:hunger",
		"minecraft:weakness",
		"minecraft:poison",
		"minecraft:wither",
		"minecraft:levitation",
		"minecraft:unluck",
		"minecraft:darkness",
		"tetra:earthbound",
		"tetra:stun",
		"tetra:severed",
		"tetra:punctured",
		"tetra:pried",
		"tetra:exhausted",
		"alexsmobs:sunbird_curse",
		"alexsmobs:ender_flu",
		"alexsmobs:exsanguination",
		"alexsmobs:earthquake",
		"relics:stun",
		"relics:confusion",
		"relics:paralysis",
		"relics:anti_heal",
		"relics:bleeding",
		"born_in_chaos_v1:magic_depletion",
		"born_in_chaos_v1:stun",
		"born_in_chaos_v1:block_break",
		"born_in_chaos_v1:cursed_mark",
		"born_in_chaos_v1:soul_stratification",
		"born_in_chaos_v1:intoxication",
		"born_in_chaos_v1:gaze_of_terror",
		"born_in_chaos_v1:detonation",
		"born_in_chaos_v1:sacrifice",
		"born_in_chaos_v1:bone_fracture",
		"born_in_chaos_v1:rotten_smell",
		"born_in_chaos_v1:myiasis",
		"born_in_chaos_v1:infernal_flame",
		"born_in_chaos_v1:living_bomb",
		"born_in_chaos_v1:jawattack",
		"born_in_chaos_v1:lifesteal",
		"born_in_chaos_v1:stranglehold",
		"cataclysm:blazing_brand",
		"cataclysm:stun",
		"cataclysm:abyssal_burn",
		"cataclysm:bone_fracture",
		"cataclysm:abyssal_fear",
		"cataclysm:abyssal_curse",
		"cataclysm:curse_of_desert",
		"cataclysm:ghost_sickness",
		"mowziesmobs:frozen",
		"champions:paralysis",
		"champions:wound",
		"ars_nouveau:shocked",
		"ars_nouveau:summoning_sickness",
		"ars_nouveau:hex",
		"ars_nouveau:snared",
		"ars_nouveau:gravity",
		"ars_nouveau:blasting",
		"ars_nouveau:freezing",
		"sons_of_sins:allure",
		"sons_of_sins:last_breath",
		"sons_of_sins:insanity",
		"sons_of_sins:greed",
		"sons_of_sins:hydrophobia",
		"sons_of_sins:cell_division",
		"alexscaves:stunned",
		"alexscaves:irradiated",
		"alexscaves:bubbled",
		"art_of_forging:evoking_maw",
		"art_of_forging:defuse_creeper",
		"art_of_forging:devouring",
		"art_of_forging:mortal_wounds",
		"art_of_forging:targeted",
		"mna:watery_grave",
		"mna:gravity_well",
		"mna:entangle",
		"mna:silence",
		"mna:asphyxiate",
		"mna:mana_burn",
		"mna:life_tap",
		"mna:confusion",
		"mna:mind_control",
		"mna:living_bomb",
		"mna:death",
		"mna:possession",
		"mna:soul_vulnerability",
		"mna:snowblind",
		"mna:earthquake",
		"mna:sunder",
		"mna:frailty",
		"mna:disjunction",
		"mna:lacerate",
		"mna:writhing_brambles",
		"mna:curse_of_agony",
		"mna:soul_trap",
		"mna:shackles_of_pain",
		"mna:heatwave",
		"mna:chill",
		"mna:icarian_flight",
		"fruitsdelight:disgusted",
		"born_in_chaos_v1:living_cocoon",
		"born_in_chaos_v1:curseofthe_boat",
		"born_in_chaos_v1:bad_feeling"
	],
	"NEUTRAL": [
		"minecraft:glowing",
		"minecraft:bad_omen",
		"alexsmobs:fear",
		"alexsmobs:debilitating_sting",
		"alexsmobs:power_down",
		"born_in_chaos_v1:dogtruce",
		"born_in_chaos_v1:barbedattack",
		"born_in_chaos_v1:infestationof_flies",
		"born_in_chaos_v1:fish_breath",
		"born_in_chaos_v1:unity_with_darkness",
		"born_in_chaos_v1:undead_summonun",
		"born_in_chaos_v1:stimulatingsurge",
		"born_in_chaos_v1:obsession",
		"born_in_chaos_v1:dark_splash",
		"alexscaves:magnetizing",
		"alexscaves:rage",
		"mna:chrono_exhaustion",
		"mna:dispel_exhaustion",
		"mna:cold_dark",
		"mna:insight",
		"mna:amplify_magic",
		"mna:dampen_magic",
		"mna:soaked",
		"mna:reduced",
		"mna:enlarged",
		"mna:lift",
		"fruitsdelight:astringent",
		"fruitsdelight:sliding",
		"fruitsdelight:rage_aura",
		"fruitsdelight:chorus",
		"born_in_chaos_v1:living_cocoon_player_side",
		"born_in_chaos_v1:stunning_strike",
		"born_in_chaos_v1:terrifying_presence",
		"born_in_chaos_v1:sweet_madness"
	]
}