//	穿梭框
import {COMMIT_INTERFACE} from "@/store"

//	穿梭框数据，用于区分类型
export const SHUTTLE_BOX = {
	//	查看市场价
	CHECK_MARKET_PRICES: 'CHECK_MARKET_PRICES',
}

interface STATE {
	modalTargetKeys: Array<any>;
	shuttleBoxType: string;
}

const state: STATE = {
	//	穿梭框的类型	🔥🔥🔥 类型非常重要，用于决定拉什么数据
	shuttleBoxType: '',
	//	穿梭框的数据
	modalTargetKeys: [],
}

const mutations = {
	SET_SHUTTLE_BOX_TYPE: (state: STATE, shuttleBoxType: string) => {
		state.shuttleBoxType = shuttleBoxType;
	},
	SET_MODAL_TARGET_KEY: (state: STATE, modalTargetKeys: Array<any>) => {
		state.modalTargetKeys = modalTargetKeys;
	},

}
//	'shuttleBox/setModalTargetKey'
const actions = {
	setShuttleBoxType({commit}: COMMIT_INTERFACE<STATE>, shuttleBoxType: string) {
		commit('SET_SHUTTLE_BOX_TYPE', shuttleBoxType)
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
