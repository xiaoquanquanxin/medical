//	增加口服肠内补充方案
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	//	商品列表数据
	shoppingList: []
	//	被选中的商品列表
	chooseShoppingList: any[]
	//	被选中的时间
	chooseTime: string
}

const state: STATE = {
	shoppingList: [],
	chooseShoppingList: [],
	chooseTime: ''
}

const mutations = {
	SET_SHOPPING_LIST: (state: STATE, shoppingList: []) => {
		state.shoppingList = shoppingList;
	},
	SET_CHOOSE_SHOPPING_LIST: (state: STATE, chooseShoppingList: []) => {
		state.chooseShoppingList = chooseShoppingList;
	},
	SET_CHOOSE_TIME: (state: STATE, chooseTime: string) => {
		state.chooseTime = chooseTime;
	}
}
const actions = {
	setShoppingList: ({commit}: COMMIT_INTERFACE<STATE>, shoppingList: []) => {
		commit('SET_SHOPPING_LIST', shoppingList);
	},
	setChooseShoppingList: ({commit}: COMMIT_INTERFACE<STATE>, chooseShoppingList: []) => {
		commit('SET_CHOOSE_SHOPPING_LIST', chooseShoppingList);
	},
	setChooseTime: ({commit}: COMMIT_INTERFACE<STATE>, chooseTime: string) => {
		commit('SET_CHOOSE_TIME', chooseTime);
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
