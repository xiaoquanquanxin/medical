// 	控制slider
const state = {
	//	导航是否展开折叠
	collapsed: false,
};

const mutations = {
	SET_SELECT_ROUTE_KEY: (state: any, selectRouteKey: number) => {
		state.selectRouteKey = selectRouteKey || '-1';
	},
};

const actions = {
	setSelectRouteKey({commit}: { commit: Function }, selectRouteKey: number) {
		commit('SET_SELECT_ROUTE_KEY', selectRouteKey);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
