//	新建、编辑账号弹框
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	id: string | null,
}

//	有id，就是编辑了
const state: STATE = {
	id: null,
}
const mutations = {
	SET_ACCOUNT_BOX_ID: (state: STATE, id: string | null) => {
		state.id = id;
	},
}

const actions = {
	setAccountBoxId: ({commit}: COMMIT_INTERFACE<STATE>, id: string | null) => {
		id = id || null;
		commit('SET_ACCOUNT_BOX_ID', id);
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
