//	穿梭框
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	modalTargetKeys: Array<any>
}

const state = {
	//	莫泰框的数据
	modalTargetKeys: [],
}

const mutations = {
	SET_MODAL_TARGET_KEY: (state: STATE, modalTargetKeys: Array<any>) => {
		state.modalTargetKeys = modalTargetKeys;
	}
}
//	'shuttleBox/setModalTargetKey'
const actions = {
	setModalTargetKey({commit}: COMMIT_INTERFACE<STATE>, modalTargetKeys: Array<any>) {
		commit('SET_MODAL_TARGET_KEY', modalTargetKeys)
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
};
