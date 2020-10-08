//	穿梭框
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	modalTargetKeys: Array<any>;
	modalType: string;
}

const state: STATE = {
	//	穿梭框的类型	🔥🔥🔥 类型非常重要，用于决定拉什么数据
	modalType: '',
	//	穿梭框的数据
	modalTargetKeys: [],
}

const mutations = {
	SET_MODAL_TYPE: (state: STATE, modalType: string) => {
		state.modalType = modalType;
	},
	SET_MODAL_TARGET_KEY: (state: STATE, modalTargetKeys: Array<any>) => {
		state.modalTargetKeys = modalTargetKeys;
	},

}
//	'shuttleBox/setModalTargetKey'
const actions = {
	setModalType({commit}: COMMIT_INTERFACE<STATE>, modalType: string) {
		commit('SET_MODAL_TYPE', modalType)
	},
	setModalTargetKey({commit}: COMMIT_INTERFACE<STATE>, modalTargetKeys: Array<any>) {
		commit('SET_MODAL_TARGET_KEY', modalTargetKeys)
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
};
