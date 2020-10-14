//	库房管理
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	收计费被选中的id
	selectCostId: number;
}

//	有id，就是编辑了
const state: STATE = {
	selectCostId: 0,
}
const mutations = {
	SET_SELECT_COST_ID: (state: STATE, selectCostId: any) => {
		state.selectCostId = selectCostId;
	},
}

const actions = {
	setSelectCostId: ({commit}: COMMIT_INTERFACE<STATE>, selectCostId: any) => {
		commit('SET_SELECT_COST_ID', selectCostId);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
