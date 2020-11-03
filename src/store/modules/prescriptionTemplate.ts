//	处方模板管理
import {COMMIT_INTERFACE} from "@/store"

//	分类管理
interface STATE {
	//	肠内营养支持 - 选择的能量
	// selectedEnergyId: number;
	//	肠内营养支持 - 商品源的数据，⚠️⚠️⚠️⚠️⚠️⚠️️这个总是新的【纯的】，其他数据修改要做JSON.parse(JSON.stringify())
	originCommodityList: [];
	//	勾选的时间数据，用于选择时间按钮传
	timeOriginList: [],
	//	肠内营养支持 - 被选中的数据
	// selectedCommodityList: [];

	//	备注
	remark: string,
	//	备注的高度，实际是textarea的行数
	rowForRemark: number,
}

const state: STATE = {
	//	肠内营养支持 - 选择的能量
	// selectedEnergyId: 0,
	//	肠内营养支持 - 商品源的数据
	originCommodityList: [],
	//	肠内营养支持 - 被选中的数据
	// selectedCommodityList: [],
	//	勾选的时间数据
	timeOriginList: [],

	//	备注
	remark: '',
	rowForRemark: 0,
}

const mutations = {
	// SET_SELECTED_ENERGY_ID: (state: STATE, selectedEnergyId: number) => {
	// 	state.selectedEnergyId = selectedEnergyId;
	// },
	SET_ORIGIN_COMMODITY_LIST: (state: STATE, originCommodityList: []) => {
		state.originCommodityList = originCommodityList;
	},
	SET_TIME_ORIGIN_LIST: (state: STATE, timeOriginList: []) => {
		state.timeOriginList = timeOriginList;
	},
	// SET_SELECTED_COMMODITY_LIST: (state: STATE, selectedCommodityList: []) => {
	// 	state.selectedCommodityList = selectedCommodityList;
	// },

	SET_REMARK: (state: STATE, remark: string) => {
		state.remark = remark;
	},
	SET_ROW_FOR_REMARK: (state: STATE, rowForRemark: number) => {
		state.rowForRemark = rowForRemark;
	},

}

const actions = {
	// setSelectedEnergyId: ({commit}: COMMIT_INTERFACE<STATE>, selectedEnergyId: number) => {
	// 	commit('SET_SELECTED_ENERGY_ID', selectedEnergyId);
	// },
	setOriginCommodityList: ({commit}: COMMIT_INTERFACE<STATE>, originCommodityList: number) => {
		commit('SET_ORIGIN_COMMODITY_LIST', originCommodityList);
	},
	setTimeOriginList: ({commit}: COMMIT_INTERFACE<STATE>, timeOriginList: number) => {
		commit('SET_TIME_ORIGIN_LIST', timeOriginList);
	},
	// setSelectedCommodityList: ({commit}: COMMIT_INTERFACE<STATE>, selectedCommodityList: number) => {
	// 	commit('SET_SELECTED_COMMODITY_LIST', selectedCommodityList);
	// },

	setRemark: ({commit}: COMMIT_INTERFACE<STATE>, remark: number) => {
		commit('SET_REMARK', remark);
	},
	setRowForRemark: ({commit}: COMMIT_INTERFACE<STATE>, rowForRemark: number) => {
		commit('SET_ROW_FOR_REMARK', rowForRemark);
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

