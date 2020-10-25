import {requestCityByProvince, requestProvince} from "@/api/areaList"

//	地址对象
export const areaList = {
	provinceList: [],
	cityList: [],
}
//	获取省份
export const getProvinceList = () => {
	requestProvince()
		.then(v => {
			//	@ts-ignore
			this.areaList.provinceList = v;
		});

}

//	省份变化
export const provinceChange = (id: string | number) => {
	requestCityByProvince(id)
		.then(v => {
			//	@ts-ignore
			this.areaList.cityList = v;
		})
}