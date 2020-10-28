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