//	库房管理
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	收计费被选中的id
	selectCostId: number;
	//	操作类型	缴费1 、退费-1
	costType: 1 | -1;
}

//	有id，就是编辑了
const state: STATE = {
	selectCostId: 0,
	costType: 1,
}
const mutations = {
	SET_SELECT_COST_ID: (state: STATE, selectCostId: number) => {
		state.selectCostId = selectCostId;
	},
	SET_COST_TYPE: (state: STATE, costType: 1 | -1) => {
		state.costType = costType;
	},
}

const actions = {
	setSelectCostId: ({commit}: COMMIT_INTERFACE<STATE>, selectCostId: number) => {
		commit('SET_SELECT_COST_ID', selectCostId);
	},
	setCostType: ({commit}: COMMIT_INTERFACE<STATE>, costType: 1 | -1) => {
		commit('SET_COST_TYPE', costType);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
