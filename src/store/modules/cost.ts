//	库房管理
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	收计费被选中的对象
	selectCostData: any;
	//	收计费被选中的对象的id
	selectCostId: number;
	//	操作类型	0,缴费，1退款）
	isRefund: 0 | 1,
}

//	有id，就是编辑了
const state: STATE = {
	selectCostData: null,
	selectCostId: 0,
	isRefund: 1,
}
const mutations = {
	SET_SELECT_COST_DATA: (state: STATE, selectCostData: any) => {
		state.selectCostData = selectCostData;
	},
	SET_SELECT_COST_ID: (state: STATE, selectCostId: number) => {
		state.selectCostId = selectCostId;
	},
	SET_COST_TYPE: (state: STATE, isRefund: 0 | 1) => {
		state.isRefund = isRefund;
	},
}

const actions = {
	setSelectCostData: ({commit}: COMMIT_INTERFACE<STATE>, selectCostData: number) => {
		commit('SET_SELECT_COST_DATA', selectCostData);
	},
	setSelectCostId: ({commit}: COMMIT_INTERFACE<STATE>, selectCostId: number) => {
		commit('SET_SELECT_COST_ID', selectCostId);
	},
	setCostType: ({commit}: COMMIT_INTERFACE<STATE>, isRefund: 0 | 1) => {
		commit('SET_COST_TYPE', isRefund);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
