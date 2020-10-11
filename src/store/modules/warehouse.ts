//	库房管理
import {COMMIT_INTERFACE} from "@/store"

interface STATE {
	//	被选中的库存的id
	warehouseId: number;
	//	被选中的采购订单id
	procurementId: number;
	//	被选中的采购单的id
	purchaseId: number;
}

//	有id，就是编辑了
const state: STATE = {
	warehouseId: 0,
	procurementId: 0,
	purchaseId: 0,
}
const mutations = {
	SET_WAREHOUSE_ID: (state: STATE, warehouseId: number) => {
		state.warehouseId = warehouseId;
	},
	SET_PROCUREMENT_ID: (state: STATE, procurementId: number) => {
		state.procurementId = procurementId;
	},
	SET_PURCHASE__ID: (state: STATE, purchaseId: number) => {
		state.purchaseId = purchaseId;
	},
}

const actions = {
	setWarehouseId: ({commit}: COMMIT_INTERFACE<STATE>, warehouseId: number) => {
		commit('SET_WAREHOUSE_ID', warehouseId);
	},
	setProcurementId: ({commit}: COMMIT_INTERFACE<STATE>, procurementId: number) => {
		commit('SET_PROCUREMENT_ID', procurementId);
	},
	setPurchaseId: ({commit}: COMMIT_INTERFACE<STATE>, purchaseId: number) => {
		commit('SET_PURCHASE__ID', purchaseId);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
