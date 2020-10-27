//	库房管理
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	口服肠内营养补充 dataTitle
	// kqcnOralEditDataTitle: any;
	// cnyyzcOralEditDataTitle: any;
	//	被选中的营养干预方案
	chooseInterventionData: any
	//	新增处方、编辑处方选择的头部数据
	basicInfoEditData: any;
}

const state: STATE = {
	// kqcnOralEditDataTitle: {
	// 	name: '口服肠内营养补充',
	// 	prescriptionType: 1,
	// },
	// cnyyzcOralEditDataTitle:{
	// 	name: '肠内营养支持',
	// 	prescriptionType: 2,
	// },
	chooseInterventionData: null,

	//	新增处方、编辑处方选择的处方类型
	basicInfoEditData: null,
}
const mutations = {
	SET_CHOOSE_INTERVENTION_DATA: (state: STATE, chooseInterventionData: any) => {
		state.chooseInterventionData = chooseInterventionData
	},
	SET_BASIC_INFO_EDIT_TABLE: (state: STATE, basicInfoEditData: any) => {
		state.basicInfoEditData = basicInfoEditData
	},
}

const actions = {
	//	设置被选中的营养干预方案
	setChooseInterventionData: ({commit}: COMMIT_INTERFACE<STATE>, chooseInterventionData: any) => {
		commit('SET_CHOOSE_INTERVENTION_DATA', chooseInterventionData);
	},
	setBasicInfoEditData: ({commit}: COMMIT_INTERFACE<STATE>, basicInfoEditData: any) => {
		commit('SET_BASIC_INFO_EDIT_TABLE', basicInfoEditData);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
