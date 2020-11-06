//	库房管理
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
		commit('SET_ENERGY_DATA', energyData);
	},

}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
