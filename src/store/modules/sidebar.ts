// 	控制slider
const state = {
	//	选择的路由
	selectRouteKey: '',
	//	导航是否展开折叠
	collapsed: false,
};

const mutations = {
	SET_ACTIVE_INDEX: (state: any, selectRouteKey: number) => {
		state.selectRouteKey = selectRouteKey;
	},
	SET_COLLAPSED: (state: any, collapsed: boolean) => {
		state.collapsed = collapsed;
	}
};

const actions = {
	setSelectRouteKey({commit}: { commit: Function }, selectRouteKey: number) {
		commit('SET_ACTIVE_INDEX', selectRouteKey);
	},
	setCollapsed({commit}: { commit: Function }, collapsed: number) {
		commit('SET_COLLAPSED', collapsed);
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
