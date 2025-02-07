
let createSkillTree = {}
function addCommonSkill(skillName, pos, requireSkillLise, Tooltip) {
    Tooltip = Tooltip || []
    requireSkillLise = requireSkillLise || []
    createSkillTree[skillName] = { pos: pos, require: requireSkillLise, finish: false, tooltip: Tooltip }
}
function addRelativeSkill(skillName, relativeSkillName, pos, requireSkillLise, Tooltip) {
    pos = { x: pos.x + createSkillTree[relativeSkillName].pos.x, y: pos.y + createSkillTree[relativeSkillName].pos.y }
    addCommonSkill(skillName, pos, requireSkillLise, Tooltip)
}
function skillTreeBuild() {
    JsonIO.write('./kubejs/yi/newSkillTree.json', createSkillTree)
}

addCommonSkill('init', { x: 0, y: 0 }, [], [Component.of('§4始§r'), Component.of('一切能力的元始')])
addCommonSkill('index1', { x: 60, y: 60 }, ['init'], [Component.of('力量'), Component.of('第一层')])
addCommonSkill('index2', { x: 80, y: -80 }, ['init'], [Component.of('敏捷'), Component.of('第一层')])
addCommonSkill('index3', { x: -80, y: 80 }, ['init'], [Component.of('耐力'), Component.of('第一层')])
addCommonSkill('index4', { x: -80, y: -80 }, ['init'], [Component.of('智慧'), Component.of('第一层')])
addRelativeSkill('index11', 'index1', { x: 80, y: 20 }, ['index1'])
addRelativeSkill('index12', 'index1', { x: 20, y: 80 }, ['index1'])
addCommonSkill('index41', { x: -80 - 60, y: -80 }, ['index4'])
addCommonSkill('index42', { x: -80, y: -80 - 60 }, ['index4'])
addCommonSkill('index1-1', { x: 160, y: 160 }, ['index12', 'index11'])


//skillTreeBuild()
/*
// 基础技能（核心技能）
addCommonSkill('Core', { x: 0, y: 0 }, [], [
    Component.of('§6核心技能'),
    Component.of('这是所有技能的基础。')
]);

// 第一层技能（从核心技能延伸）
addCommonSkill('Strength', { x: 100, y: 0 }, ['Core'], [
    Component.of('§4力量'),
    Component.of('提升角色的力量属性。')
]);
addCommonSkill('Agility', { x: -100, y: 0 }, ['Core'], [
    Component.of('§2敏捷'),
    Component.of('提升角色的敏捷属性。')
]);
addCommonSkill('Intelligence', { x: 0, y: 100 }, ['Core'], [
    Component.of('§b智力'),
    Component.of('提升角色的智力属性。')
]);
addCommonSkill('Stamina', { x: 0, y: -100 }, ['Core'], [
    Component.of('§c耐力'),
    Component.of('提升角色的耐力属性。')
]);

// 第二层技能（从第一层技能延伸）
addCommonSkill('PhysicalPower', { x: 150, y: 0 }, ['Strength'], [
    Component.of('§4物理力量'),
    Component.of('增强物理攻击的威力。')
]);
addCommonSkill('Endurance', { x: 100, y: -50 }, ['Strength'], [
    Component.of('§4耐力强化'),
    Component.of('减少体力消耗。')
]);
addCommonSkill('Dexterity', { x: -150, y: 0 }, ['Agility'], [
    Component.of('§2身手敏捷'),
    Component.of('提高闪避和攻击速度。')
]);
addCommonSkill('Precision', { x: -100, y: 50 }, ['Agility'], [
    Component.of('§2精准打击'),
    Component.of('提高暴击几率。')
]);
addCommonSkill('ArcaneKnowledge', { x: 0, y: 150 }, ['Intelligence'], [
    Component.of('§b奥术知识'),
    Component.of('增强魔法攻击力。')
]);
addCommonSkill('ManaRegeneration', { x: 50, y: 100 }, ['Intelligence'], [
    Component.of('§b法力恢复'),
    Component.of('提高法力恢复速度。')
]);
addCommonSkill('Vitality', { x: 0, y: -150 }, ['Stamina'], [
    Component.of('§c活力'),
    Component.of('提高生命值上限。')
]);
addCommonSkill('Resistance', { x: -50, y: -100 }, ['Stamina'], [
    Component.of('§c抗性'),
    Component.of('减少受到的伤害。')
]);

// 第三层技能（从第二层技能延伸）
addCommonSkill('TitanicStrength', { x: 200, y: 0 }, ['PhysicalPower'], [
    Component.of('§4泰坦之力'),
    Component.of('极大增强物理攻击力。')
]);
addCommonSkill('UnyieldingWill', { x: 150, y: -50 }, ['Endurance'], [
    Component.of('§4坚毅意志'),
    Component.of('在低生命值时提高防御力。')
]);
addCommonSkill('LightningReflexes', { x: -200, y: 0 }, ['Dexterity'], [
    Component.of('§2闪电反射'),
    Component.of('极大提高闪避率。')
]);
addCommonSkill('CriticalStrike', { x: -150, y: 50 }, ['Precision'], [
    Component.of('§2致命一击'),
    Component.of('极大提高暴击伤害。')
]);
addCommonSkill('ArcaneMastery', { x: 0, y: 200 }, ['ArcaneKnowledge'], [
    Component.of('§b奥术精通'),
    Component.of('极大增强魔法攻击力。')
]);
addCommonSkill('SoulHarvest', { x: 50, y: 150 }, ['ManaRegeneration'], [
    Component.of('§b灵魂收割'),
    Component.of('击败敌人时恢复法力值。')
]);
addCommonSkill('Ironhide', { x: 0, y: -200 }, ['Vitality'], [
    Component.of('§c铁皮'),
    Component.of('极大提高生命值上限。')
]);
addCommonSkill('DamageReduction', { x: -50, y: -150 }, ['Resistance'], [
    Component.of('§c伤害减免'),
    Component.of('减少受到的魔法和物理伤害。')
]);

// 第四层技能（终极技能）
addCommonSkill('GodlikePower', { x: 250, y: 0 }, ['TitanicStrength'], [
    Component.of('§4神力'),
    Component.of('解锁超越凡人的力量。')
]);
addCommonSkill('DivineAgility', { x: -250, y: 0 }, ['LightningReflexes'], [
    Component.of('§2神圣敏捷'),
    Component.of('达到极限的闪避和速度。')
]);
addCommonSkill('ArchmageAscension', { x: 0, y: 250 }, ['ArcaneMastery'], [
    Component.of('§b大法师晋升'),
    Component.of('解锁强大的奥术魔法。')
]);
addCommonSkill('ImmortalGuard', { x: 0, y: -250 }, ['Ironhide'], [
    Component.of('§c不朽守护'),
    Component.of('极大提高生存能力。')
]);*/


/*= {
    init:{pos:{x:0,y:0},require:[],finish:false, tooltip: [Component.of('始'),Component.of('一切能力的元始')] ,action:()=>{Client.tell('汝路无止')}},
    index1: { pos: { x: 60, y: 60 }, require: ['init'], finish: false},
    index11: { pos: { x: 80 + 60, y: 80 }, require: ['index1'], finish: false },
    index12: { pos: { x: 80, y: 80 + 60 }, require: ['index1'], finish: false },
    index101: { pos: { x: 80 + 80, y: 80 + 80 }, require: ['index11', 'index12'], finish: false },
    index2: { pos: { x: -80, y: 80 }, require: ['init'], finish: false },
    index3: { pos: { x: 80, y: -80 }, require: ['init'], finish: false },
    index4: { pos: { x: -80, y: -80 }, require: ['init'], finish: false },
    index41: { pos: { x: -80 - 60, y: -80 }, require: ['index4'], finish: false },
    index42: { pos: { x: -80, y: -80 - 60 }, require: ['index4'], finish: false },
}*/