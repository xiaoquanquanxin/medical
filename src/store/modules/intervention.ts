//	营养干预，intervention
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	被选中的营养干预方案
	chooseInterventionData: any
	//	新增处方、编辑处方选择的头部数据
	basicInfoEditData: any;

	kqcnData: any,
	//	肠内营养支持数据
	cnyyzcData: any;
	//	膳食营养计划
	mealData: any;

	prescriptionType: number,

	//	能量表格数据
	energyData: any,

	//	根据templateType区分的能量数据
	energyDataByTemplateType: any,

	//	肠内备注	templateType:2
	intestinalRemark: string,
	//	口腔备注	templateType:1
	oralRemark: string,
}

const state: STATE = {
	chooseInterventionData: null,

	//	新增处方、编辑处方选择的处方类型
	basicInfoEditData: null,

	//  被选中的处方-口服肠内营养补充数据
	kqcnData: null,
	//  被选中的处方-肠内营养支持数据
	cnyyzcData: null,
	//	膳食营养计划
	mealData: null,
	//	处方类型
	prescriptionType: 1,
	//	能量表格数据
	energyData: null,
	//	根据templateType区分的能量数据
	energyDataByTemplateType: {1: {}, 2: {}},

	//	肠内备注
	intestinalRemark: '',
	//	口腔备注
	oralRemark: '',
}
const mutations = {
	SET_CHOOSE_INTERVENTION_DATA: (state: STATE, chooseInterventionData: any) => {
		state.chooseInterventionData = chooseInterventionData
	},
	SET_BASIC_INFO_EDIT_TABLE: (state: STATE, basicInfoEditData: any) => {
		state.basicInfoEditData = basicInfoEditData
	},
	SET_KQCN_DATA: (state: STATE, kqcnData: any) => {
		state.kqcnData = kqcnData
	},
	SET_CNYYZC_DATA: (state: STATE, cnyyzcData: any) => {
		state.cnyyzcData = cnyyzcData
	},
	SET_MEAL_DATA: (state: STATE, mealData: any) => {
		state.mealData = mealData
	},
	SET_PRESCRIPTION_TYPE: (state: STATE, prescriptionType: number) => {
		state.prescriptionType = prescriptionType
	},
	SET_ENERGY_DATA: (state: STATE, energyData: number) => {
		state.energyData = energyData
	},
	SET_INTESTINAL_REMARK: (state: STATE, intestinalRemark: string) => {
		state.intestinalRemark = intestinalRemark
	},
	SET_ORAL_REMARK: (state: STATE, oralRemark: string) => {
		state.oralRemark = oralRemark
	},
}
const actions = {
	//	设置被选中的营养干预方案
	setChooseInterventionData: ({commit}: COMMIT_INTERFACE<STATE>, chooseInterventionData: any) => {
		commit('SET_CHOOSE_INTERVENTION_DATA', chooseInterventionData);
	},
	setBasicInfoEditData: ({commit}: COMMIT_INTERFACE<STATE>, basicInfoEditData: [any]) => {
		if (!Array.prototype.isPrototypeOf(basicInfoEditData)) {
			throw new Error(`录入错误的类型:basicInfoEditData`)
		}
		commit('SET_BASIC_INFO_EDIT_TABLE', basicInfoEditData);
	},
	setKqcnData: ({commit}: COMMIT_INTERFACE<STATE>, kqcnData: any) => {
		commit('SET_KQCN_DATA', kqcnData);
	},
	setCnyyzcData: ({commit}: COMMIT_INTERFACE<STATE>, cnyyzcData: any) => {
		commit('SET_CNYYZC_DATA', cnyyzcData);
	},
	setMealData: ({commit}: COMMIT_INTERFACE<STATE>, mealData: any) => {
		commit('SET_MEAL_DATA', mealData);
	},
	setPrescriptionType: ({commit}: COMMIT_INTERFACE<STATE>, prescriptionType: number) => {
		commit('SET_PRESCRIPTION_TYPE', prescriptionType);
	},
	setEnergyData: ({commit}: COMMIT_INTERFACE<STATE>, energyData: any) => {
		commit('SET_ENERGY_DATA', [Object.assign({
			key: 1,
			energy: 0,
			protein: 0,
			fat: 0,
			carbohydrates: 0,
		}, energyData,)]);
	},
	//	根据templateType，分别设置肠内、口腔的数据
	setEnergyDataByTemplateType: ({commit}: COMMIT_INTERFACE<STATE>, data: any) => {
		console.log('store🍎')
		console.log(data);
		const {templateType} = data;
		const {energyDataByTemplateType} = state
		energyDataByTemplateType[templateType] = data;
		//  碳水化合物
		let carbohydrates = 0;
		//  能量
		let energy = 0;
		//  脂肪
		let fat = 0;
		//  蛋白质
		let protein = 0;
		//	@ts-ignore
		const calc = ({unitCarbohydrate, unitEnergy, unitFat, unitProtein}) => {
			carbohydrates += +unitCarbohydrate || 0;
			energy += +unitEnergy || 0;
			fat += +unitFat || 0;
			protein += +unitProtein || 0;
		}
		//	console.log(JSON.parse(JSON.stringify(energyDataByTemplateType[1])))
		//	console.log(JSON.parse(JSON.stringify(energyDataByTemplateType[2])))
		calc(energyDataByTemplateType[1])
		calc(energyDataByTemplateType[2])
		//	console.log(carbohydrates);
		//	console.log(energy);
		//	console.log(fat);
		//	console.log(protein);
		commit('SET_ENERGY_DATA', [Object.assign({
			key: 1,
			energy,
			protein,
			fat,
			carbohydrates,
		})]);
	},
	//	肠内备注
	setIntestinalRemark: ({commit}: COMMIT_INTERFACE<STATE>, intestinalRemark: any) => {
		commit('SET_INTESTINAL_REMARK', intestinalRemark);
	},
	//	口腔备注
	setOralRemark: ({commit}: COMMIT_INTERFACE<STATE>, oralRemark: any) => {
		commit('SET_ORAL_REMARK', oralRemark);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
//	intervention