//	用户信息

import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	//	是局域网
	isLocalAreaNetwork: boolean
}

const state: STATE = {
	isLocalAreaNetwork: true,
}


const mutations = {
	SET_NETWORK_ENVIRONMENT: (state: STATE, isLocalAreaNetwork: boolean) => {
		state.isLocalAreaNetwork = isLocalAreaNetwork;
	},
}

const actions = {
	setNetworkEnvironment({commit}: COMMIT_INTERFACE<STATE>, isLocalAreaNetwork: boolean) {
		commit('SET_NETWORK_ENVIRONMENT', isLocalAreaNetwork)
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
};