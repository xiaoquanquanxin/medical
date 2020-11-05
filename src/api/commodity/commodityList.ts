import request, {unifiedHandlingList} from '@/utils/request';

//	商品分页列表	✅
export function requestGoodsPage(data: any) {
	return request({
		url: '/api/goods/page',
		method: 'post',
		data,
	});
}

//	商品授权渠道商
export function requestGoodsAuthorize(data: any) {
	return request({
		url: '/api/goods/authorize',
		method: 'post',
		data,
	});
}

//	删除商品		⚠️原型无
export function requestGoodsDelete(id: string | number) {
	return request({
		url: `/api/goods/delete/${id}`,
		method: 'get',
	});
}

//	根据医院获取商品
export function requestGoodsListByHospital(hospitalId: string | number) {
	return request({
		url: `/api/goods/list/${hospitalId}`,
		method: 'get',
	})
		.then(unifiedHandlingList)
		.then(goodsListByHospital => {
			goodsListByHospital.forEach((item: any) => {
				//  fixme   开发阶段把这些没用的删了
				delete item.goodsImg;
				delete item.delFlag;
				delete item.goodsBarCode;
				delete item.goodsBrandId;
				delete item.goodsCategoryId;
				delete item.goodsDetails;
				delete item.goodsKeyWord;
				delete item.goodsProductCode;
				delete item.goodsSpecifications;
				delete item.goodsTradeName;
				delete item.manufactorId;
				delete item.preservationMethod;
				delete item.status;
				delete item.supplierId;
			});
			return goodsListByHospital;
		})
}

//	缺少：市场价

//	根据商品id获取已有渠道商
export function requestChannelBusinessListGoodsId(id: string | number) {
	return request({
		url: `/api/channelBusiness/listGoodsId/${id}`,
		method: 'get',
	});
}

//	获取商品已经授权的医院
export function requestGoodsGetGoodsRelationHospital(id: string | number) {
	return request({
		url: `/api/goods/getGoodsRelationHospital/${id}`,
		method: 'get',
	});
}

//	商品授权医院
export function requestGoodsGoodsRelationHospital(data: any) {
	return request({
		url: '/api/goods/goodsRelationHospital',
		method: 'post',
		data,
	});
}



