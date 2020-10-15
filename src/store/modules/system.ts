import {COMMIT_INTERFACE} from "@/store"

//  系统管理
interface STATE {
	//	被选中的角色的id，角色列表、弹框用
	selectRoleId: number;
	//	角色操作类型 , 1 新增、2 编辑、3 查看
	roleOperationType: 1 | 2 | 3;

	//	同上，账号管理用
	selectAccountId: number;
	//	账号的操作类型，1 新增 、2 编辑
	accountOperationType: 1 | 2;
}

const state: STATE = {
	selectRoleId: 0,
	roleOperationType: 1,
	selectAccountId: 0,
	accountOperationType: 1,
}

const mutations = {

	SET_SELECT_ROLE_ID: (state: STATE, selectRoleId: number) => {
		state.selectRoleId = selectRoleId
	},
	SET_ROLE_OPERATION_TYPE: (state: STATE, roleOperationType: 1 | 2 | 3) => {
		state.roleOperationType = roleOperationType
	},
	SET_SELECT_ACCOUNT_ID: (state: STATE, selectAccountId: number) => {
		state.selectAccountId = selectAccountId;
	},
	SET_ACCOUNT_OPERATION_TYPE: (state: STATE, accountOperationType: 1 | 2) => {
		state.accountOperationType = accountOperationType;
	},
}

const actions = {
	setSelectRoleId: ({commit}: COMMIT_INTERFACE<STATE>, selectRoleId: number) => {
		commit('SET_SELECT_ROLE_ID', selectRoleId)
	},
	setRoleOperationType: ({commit}: COMMIT_INTERFACE<STATE>, roleOperationType: 1 | 2 | 3) => {
		commit('SET_ROLE_OPERATION_TYPE', roleOperationType)
	},
	setSelectAccountId: ({commit}: COMMIT_INTERFACE<STATE>, selectAccountId: number) => {
		commit('SET_SELECT_ACCOUNT_ID', selectAccountId);
	},
	setAccountOperationType: ({commit}: COMMIT_INTERFACE<STATE>, accountOperationType: 1 | 2) => {
		commit('SET_ACCOUNT_OPERATION_TYPE', accountOperationType);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
