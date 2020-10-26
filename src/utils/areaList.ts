import {requestCityByProvince, requestProvince} from "@/api/areaList"

//	地址对象
export const areaList = {
	provinceList: [],
	cityList: [],
	countyList: [],
}

//	获取省份
export const getProvinceList = (_this: any) => {
	requestProvince()
		.then(v => {
			v.data.forEach((item: any) => {
				item.key = item.id;
			});
			//	@ts-ignore
			_this.areaList.provinceList = v.data;
		});

}

//	省份变化
export const provinceChange = (_this: any, id: string | number) => {
	requestCityByProvince(id)
		.then(v => {
			v.data.forEach((item: any) => {
				item.key = item.id;
			});
			//	@ts-ignore
			_this.areaList.cityList = v.data;
		})
}

//	市区变化
export const cityChange = (_this: any, id: string | number) => {
	requestCityByProvince(id)
		.then(v => {
			v.data.forEach((item: any) => {
				item.key = item.id;
			});
			//	@ts-ignore
			_this.areaList.countyList = v.data;
		})
}