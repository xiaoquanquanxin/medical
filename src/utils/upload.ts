// 上传图片通用方法
export function uploadHandleChange({file}: { file: any }, key: string, thumbUrl: string) {
	const {response} = file;
	console.log(response);
	if (response && response.status === 'done') {
		//  console.log(this);
		//  console.log('封面', response.thumbUrl);
		//  console.log('图片', response.url);
		//	@ts-ignore
		this.form.setFieldsValue({
			[key]: response.url,
		});
		//	@ts-ignore
		this[thumbUrl] = response.thumbUrl;
	}
}
