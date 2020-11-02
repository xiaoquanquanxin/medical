//	常量
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	单位list
	unitTypeList: any;
	unitTypeMap: any;
}

const state: STATE = {
	unitTypeList: null,
	unitTypeMap: null,
}
const mutations = {
	SET_UNIT_TYPE_LIST: (state: STATE, unitTypeList: []) => {
		state.unitTypeList = unitTypeList;
	},
	SET_UNIT_TYPE_MAP: (state: STATE, unitTypeMap: any) => {
		state.unitTypeMap = unitTypeMap;
	},
}

const actions = {
	setUnitTypeList: ({commit}: COMMIT_INTERFACE<STATE>, unitTypeList: []) => {
		commit('SET_UNIT_TYPE_LIST', unitTypeList);
		const unitTypeMap: any = {}
		unitTypeList.forEach((item: any) => {
			unitTypeMap[item.value] = item;
		})
		commit('SET_UNIT_TYPE_MAP', unitTypeMap);
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
