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


//  上传之前
export function beforeUploadFn(file: any) {
	beforeUploadData.type = file.type;
	beforeUploadData.name = file.name;
}

//	上传文件的数据，这样的对象只需要一个
export const beforeUploadData: { type: string, name: string } = {type: '', name: ''}