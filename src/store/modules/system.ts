import {COMMIT_INTERFACE} from "@/store"

//  系统管理
interface STATE {
	//	被选中的角色的id，角色列表、弹框用
	selectRoleId: number;
	//	角色操作类型 , 1 新增、2 编辑、3 查看
	roleOperationType: 1 | 2 | 3;
}

const state: STATE = {
	selectRoleId: 0,
	roleOperationType: 1,
}

const mutations = {
	SET_SELECT_ROLE_ID: (state: STATE, selectRoleId: number) => {
		state.selectRoleId = selectRoleId
	},
	SET_ROLE_OPERATION_TYPE: (state: STATE, roleOperationType: 1 | 2 | 3) => {
		state.roleOperationType = roleOperationType
	},
}

const actions = {
	setSelectRoleId: ({commit}: COMMIT_INTERFACE<STATE>, selectRoleId: number) => {
		commit('SET_SELECT_ROLE_ID', selectRoleId)
	},
	setRoleOperationType: ({commit}: COMMIT_INTERFACE<STATE>, roleOperationType: 1 | 2 | 3) => {
		commit('SET_ROLE_OPERATION_TYPE', roleOperationType)
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
