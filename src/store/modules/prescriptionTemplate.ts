//	处方模板管理
import {COMMIT_INTERFACE} from "@/store"
//	分类管理
interface STATE {
	//	备注
	remark: string,
	//	备注的高度，实际是textarea的行数
	rowForRemark: number,
}

const state: STATE = {
	//	备注
	remark: '',
	rowForRemark: 0,
}

const mutations = {
	SET_REMARK: (state: STATE, remark: string) => {
		state.remark = remark;
	},
	SET_ROW_FOR_REMARK: (state: STATE, rowForRemark: number) => {
		state.rowForRemark = rowForRemark;
	},
}

const actions = {
	setRemark: ({commit}: COMMIT_INTERFACE<STATE>, remark: number) => {
		commit('SET_REMARK', remark || '');
	},
	setRowForRemark: ({commit}: COMMIT_INTERFACE<STATE>, rowForRemark: number) => {
		commit('SET_ROW_FOR_REMARK', rowForRemark);
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

