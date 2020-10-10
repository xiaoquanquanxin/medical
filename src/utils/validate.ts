//	验证相关

/**
 * 与第一密码比较，用于确认密码
 * @param:passwordKey:string 密码的验证的key
 * */
export function compareToFirstPassword(passwordKey: string) {
	return (rule: any, value: string, callback: Function) => {
		//	@ts-ignore
		const form = this.form;
		if (value && value !== form.getFieldValue(passwordKey)) {
			callback('确认密码不对');
		} else {
			callback();
		}
	}
}