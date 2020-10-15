//	验证相关

/**
 * 与第一密码比较，用于确认密码
 * @param:passwordKey:string 密码的验证的key
 * */
export function compareToFirstPassword(passwordKey: string) {
	return (rule: any, value: string, callback: Function) => {
		//	@ts-ignore
		const form = this.form;
		if (!value || value !== form.getFieldValue(passwordKey)) {
			callback('确认密码不符');
		} else {
			callback();
		}
	}
}

/**
 * 验证手机号
 * */
export function isPhoneNumber(rule: any, value: string, callback: Function) {
	const reg = /^1[3456789]\d{9}$/;
	if (!value || !reg.test(value)) {
		callback('请输入正确手机号');
	} else {
		callback();
	}
}