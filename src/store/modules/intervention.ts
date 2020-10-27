//	库房管理
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	口服肠内营养补充 dataTitle
	kqcnOralEditDataTitle: any;
	cnyyzcOralEditDataTitle: any;
	//	被选中的营养干预方案
	chooseInterventionData: any
}

const state: STATE = {
	kqcnOralEditDataTitle: {
		name: '口服肠内营养补充',
		prescriptionType: 1,
	},
	cnyyzcOralEditDataTitle:{
		name: '肠内营养支持',
		prescriptionType: 2,
	},
	chooseInterventionData: null,
}
const mutations = {
	SET_CHOOSE_INTERVENTION_DATA: (state: STATE, chooseInterventionData: any) => {
		state.chooseInterventionData = chooseInterventionData
	},
}

const actions = {
	//	设置被选中的营养干预方案
	setChooseInterventionData: ({commit}: COMMIT_INTERFACE<STATE>, chooseInterventionData: any) => {
		commit('SET_CHOOSE_INTERVENTION_DATA', chooseInterventionData);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
