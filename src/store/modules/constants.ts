//	常量
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	单位list
	unitTypeList: any;
	unitTypeMap: any;
	//	全部科室	⚠️并不是所有的都用这个，该查询还是查询，这个是用来给就诊信息用的
	deptList: any;
	deptMap: any;
}

const state: STATE = {
	unitTypeList: null,
	unitTypeMap: null,
	deptList: null,
	deptMap: null,
}
const mutations = {
	SET_UNIT_TYPE_LIST: (state: STATE, unitTypeList: []) => {
		state.unitTypeList = unitTypeList;
	},
	SET_UNIT_TYPE_MAP: (state: STATE, unitTypeMap: any) => {
		state.unitTypeMap = unitTypeMap;
	},
	SET_DEPT_LIST: (state: STATE, deptList: []) => {
		state.deptList = deptList;
	},
	SET_DEPT_MAP: (state: STATE, deptMap: any) => {
		state.deptMap = deptMap;
	},
}

const actions = {
	setUnitTypeList: ({commit}: COMMIT_INTERFACE<STATE>, unitTypeList: []) => {
		const unitTypeMap: any = {}
		unitTypeList.forEach((item: any) => {
			unitTypeMap[item.value] = item;
		});
		commit('SET_UNIT_TYPE_LIST', unitTypeList);
		commit('SET_UNIT_TYPE_MAP', unitTypeMap);
	},
	setDeptList: ({commit}: COMMIT_INTERFACE<STATE>, deptList: []) => {
		const deptMap: any = {}
		deptList.forEach((item: any) => {
			deptMap[item.value] = item;
		});
		commit('SET_DEPT_LIST', deptList);
		commit('SET_DEPT_MAP', deptMap);
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
