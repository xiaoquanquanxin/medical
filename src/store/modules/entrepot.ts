//	仓库管理
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	entrepotId: number;
}

//	有id，就是编辑了
const state: STATE = {
	entrepotId: 0,
}
const mutations = {
	SET_ENTREPOT_ID: (state: STATE, entrepotId: number) => {
		state.entrepotId = entrepotId;
	},
}

const actions = {
	setEntrepotId: ({commit}: COMMIT_INTERFACE<STATE>, entrepotId: number) => {
		commit('SET_ENTREPOT_ID', entrepotId);
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
