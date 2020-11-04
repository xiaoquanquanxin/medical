import {getStorage, setStorage} from "@/utils/common"

const TOKEN = 'Authorization'
const USER_INFO = 'USER_INFO'

export function getJwt(): string {
	return getStorage(TOKEN) || '1';
}

export function setJwt(token: string) {
	setStorage(TOKEN, token);
}

export function getLoginInfo(): object | null {
	const userInfoStr = getStorage(USER_INFO);
	if (!userInfoStr) {
		return null
	}
	return JSON.parse(userInfoStr);
}

export function setLoginInfo(loginInfo: string) {
	setStorage(USER_INFO, JSON.stringify(loginInfo))
}


//	转换路由格式
export const convertRouting = (list: [any]) => {
	console.log(JSON.parse(JSON.stringify(list)));
	//	路由
	const routeMap: any = {};
	//	按钮
	const buttonMap: any = {};

	_convertRouting(list, routeMap, buttonMap);
	return {routeMap, buttonMap};
};

function _convertRouting(list: [any], routeMap: any, buttonMap: any) {
	list.forEach(item => {
		const {path, type} = item;
		switch (type) {
			case 0:
				//	菜单
				routeMap[path] = true;
				break
			case 1:
				//	按钮
				buttonMap[path] = true;
				break;
			default:
				throw new Error('错误的菜单类型');
		}
		if (!item.children || !item.children.length) {
			return
		}
		_convertRouting(item.children, routeMap, buttonMap)
	});
}