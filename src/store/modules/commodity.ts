//	商品管理
import {COMMIT_INTERFACE} from "@/store"

//	分类管理
interface STATE {
	//	分类管理id
	classificationId: number,
	// 	品牌id
	brandId: number,
	//	品牌管理 - 生产厂家id
	manufacturerId: number,
}

const state: STATE = {
	//	分类管理 - 分类id
	classificationId: 0,
	//	品牌管理 - 品牌id
	brandId: 0,
	//	品牌管理 - 生产厂家id
	manufacturerId: 0,
};

const mutations = {
	SET_CLASSIFICATION_ID: (state: STATE, classificationId: number) => {
		state.classificationId = classificationId;
	},
	SET_BRAND_ID: (state: STATE, brandId: number) => {
		state.brandId = brandId;
	},
	SET_MANUFACTURER_ID: (state: STATE, manufacturerId: number) => {
		state.manufacturerId = manufacturerId;
	},
}

const actions = {
	setClassificationId: ({commit}: COMMIT_INTERFACE<STATE>, classificationId: number) => {
		commit('SET_CLASSIFICATION_ID', classificationId);
	},
	setBrandId: ({commit}: COMMIT_INTERFACE<STATE>, brandId: number) => {
		commit('SET_BRAND_ID', brandId);
	},
	setManufacturerId: ({commit}: COMMIT_INTERFACE<STATE>, manufacturerId: number) => {
		commit('SET_MANUFACTURER_ID', manufacturerId);
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

