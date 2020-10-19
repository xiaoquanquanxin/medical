import {getStorage, setStorage} from "@/utils/common"

const TOKEN = 'TOKEN'
const USER_INFO = 'USER_INFO'

export function getToken() {
	getStorage('TOKEN')
}

export function setToken(token: any) {
	setStorage(TOKEN, token)
}

export function getUserInfo() {
	getStorage(USER_INFO)
}

export function setUserInfo(userInfo: any) {
	setStorage(USER_INFO, userInfo)
}