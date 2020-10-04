//	增加口服肠内补充方案
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	//	选择时间的列表数据
	timeListData: []
	//	选择时间的被选中数据
	chooseTimeListData: any[]
	//	选择时间的列表数据
	shoppingListData: []
	//	选择时间的被选中数据
	chooseShoppingListData: any[]
}

const state: STATE = {
	timeListData: [],
	chooseTimeListData: [],
	shoppingListData: [],
	chooseShoppingListData: []
}

const mutations = {
	SET_TIME_LIST_DATA: (state: STATE, timeListData: []) => {
		state.timeListData = timeListData;
	},
	SET_CHOOSE_TIME_LIST_DATA: (state: STATE, chooseTimeListData: []) => {
		state.chooseTimeListData = chooseTimeListData;
	},
	SET_SHOPPING_LIST_DATA: (state: STATE, shoppingListData: []) => {
		state.shoppingListData = shoppingListData;
	},
	SET_CHOOSE_SHOPPING_LIST_DATA: (state: STATE, chooseShoppingListData: []) => {
		state.chooseShoppingListData = chooseShoppingListData;
	}
}
const actions = {
	setTimeListData: ({commit}: COMMIT_INTERFACE<STATE>, timeListData: []) => {
		commit('SET_TIME_LIST_DATA', timeListData);
	},
	setChooseTimeListData: ({commit}: COMMIT_INTERFACE<STATE>, chooseTimeListData: []) => {
		commit('SET_CHOOSE_TIME_LIST_DATA', chooseTimeListData);
	},
	setShoppingListData: ({commit}: COMMIT_INTERFACE<STATE>, shoppingListData: []) => {
		commit('SET_SHOPPING_LIST_DATA', shoppingListData);
	},
	setChooseShoppingListData: ({commit}: COMMIT_INTERFACE<STATE>, chooseShoppingListData: []) => {
		commit('SET_CHOOSE_SHOPPING_LIST_DATA', chooseShoppingListData);
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
