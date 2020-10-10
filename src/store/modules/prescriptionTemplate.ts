//	处方模板管理
import {COMMIT_INTERFACE} from "@/store"

//	分类管理
interface STATE {
	//	肠内营养支持 - 选择的能量
	// selectedEnergyId: number;
	//	肠内营养支持 - 商品源的数据，⚠️⚠️⚠️⚠️⚠️⚠️️这个总是新的【纯的】，其他数据修改要做JSON.parse(JSON.stringify())
	originCommodityList: [];
	//	肠内营养支持 - 被选中的数据
	// selectedCommodityList: [];

	//	备注
	remark: string,
}

const state: STATE = {
	//	肠内营养支持 - 选择的能量
	// selectedEnergyId: 0,
	//	肠内营养支持 - 商品源的数据
	originCommodityList: [],
	//	肠内营养支持 - 被选中的数据
	// selectedCommodityList: [],

	//	备注
	remark: '',
}

const mutations = {
	// SET_SELECTED_ENERGY_ID: (state: STATE, selectedEnergyId: number) => {
	// 	state.selectedEnergyId = selectedEnergyId;
	// },
	SET_ORIGIN_COMMODITY_LIST: (state: STATE, originCommodityList: []) => {
		state.originCommodityList = originCommodityList;
	},
	// SET_SELECTED_COMMODITY_LIST: (state: STATE, selectedCommodityList: []) => {
	// 	state.selectedCommodityList = selectedCommodityList;
	// },

	SET_REMARK: (state: STATE, remark: string) => {
		state.remark = remark;
	},

}

const actions = {
	// setSelectedEnergyId: ({commit}: COMMIT_INTERFACE<STATE>, selectedEnergyId: number) => {
	// 	commit('SET_SELECTED_ENERGY_ID', selectedEnergyId);
	// },
	setOriginCommodityList: ({commit}: COMMIT_INTERFACE<STATE>, originCommodityList: number) => {
		commit('SET_ORIGIN_COMMODITY_LIST', originCommodityList);
	},
	// setSelectedCommodityList: ({commit}: COMMIT_INTERFACE<STATE>, selectedCommodityList: number) => {
	// 	commit('SET_SELECTED_COMMODITY_LIST', selectedCommodityList);
	// },

	setRemark: ({commit}: COMMIT_INTERFACE<STATE>, remark: number) => {
		commit('SET_REMARK', remark);
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

