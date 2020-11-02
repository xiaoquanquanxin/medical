//  处方类型下拉
export const prescriptionTypeList = [
	{id: 1, key: 1, name: '口服肠内营养补充'},
	{id: 2, key: 2, name: '肠内营养支持'},
	{id: 3, key: 3, name: '膳食营养计划'}
];
//	能量下拉
export const energyList = [
	{id: '1600kcal', key: 1, name: '1600kcal',},
	{id: '1400kcal', key: 2, name: '1400kcal',},
	{id: '1200kcal', key: 3, name: '1200kcal',},
	{id: '1000kcal', key: 4, name: '1000kcal',},
	{id: '800kcal', key: 5, name: '800kcal',},
	{id: '600kcal', key: 6, name: '600kcal',},
	{id: '400kcal', key: 7, name: '400kcal',},
	{id: '200kcal', key: 8, name: '200kcal',}];
//	流食能量
export const liquidEnergyList = [
	{id: '流食【300kcal】', key: 1, name: '流食【300kcal】',},
	{id: '流食【500kcal】', key: 2, name: '流食【500kcal】',},
]
//	食用方法下拉
export const usageMethodList = [
	{id: 1, key: 1, name: '口服',},
	{id: 2, key: 2, name: '经口',},
	{id: 3, key: 3, name: '管饲',},
	// {id: 4, key: 4, name: '外周静脉',},
	// {id: 5, key: 5, name: '中心静脉',},
	{id: 6, key: 6, name: '鼻胃管',},
	{id: 7, key: 7, name: '肠胃管',}];


//	处方模板类型
export const kqcnOralEditDataTitle = {
	name: '口服肠内营养补充',
	prescriptionType: 1,
};
export const cnyyzcOralEditDataTitle = {
	name: '肠内营养支持',
	prescriptionType: 2,
}

//	单位类型映射
export const unameTypeMap = {
	1: '基本单位',
	2: '标准单位',
	3: '辅助单位',
}
