//	患者用户
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	patientsUserId: number;
}

//	有id，就是编辑了
const state: STATE = {
	patientsUserId: 0,
}
const mutations = {
	SET_PATIENTS_USER_ID: (state: STATE, patientsUserId: number) => {
		state.patientsUserId = patientsUserId;
	},
}

const actions = {
	setPatientsUserId: ({commit}: COMMIT_INTERFACE<STATE>, patientsUserId: number) => {
		commit('SET_PATIENTS_USER_ID', patientsUserId);
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
