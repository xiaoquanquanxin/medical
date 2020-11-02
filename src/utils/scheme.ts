//	删除处方模板
import {requestPrescriptionTemplateDelete, requestPrescriptionTemplatePage} from "@/api/scheme/scheme"
import {paginationDecode, paginationEncode} from "@/utils/pagination"

//	删除某个处方
export function deleteSchemeFn(sItem: { id: string, prescriptionName: string }) {
	//	@ts-ignore
	this.$confirm({
		title: `确定删除${sItem.prescriptionName}`,
		okText: '确认',
		okType: 'danger',
		cancelText: '取消',
		onOk: () => {
			return requestPrescriptionTemplateDelete(sItem.id)
				.then(v => {
					//	@ts-ignore
					this.$message.success('操作成功');
					//	@ts-ignore
					this.searchFn();
				})
				.catch(v => {
					//	@ts-ignore
					this.$message.error('操作失败');
				});
		},
		onCancel() {
			console.log('取消');
		},
	});
}

//	获取处方列表数据
export function getSchemeListFn() {
	const searchDta = Object.assign({},
		//	@ts-ignore
		this.searchData,
		//	@ts-ignore
		paginationEncode(this.pagination));
	console.log(JSON.parse(JSON.stringify(searchDta)));
	requestPrescriptionTemplatePage(searchDta)
		.then(v => {
			const {data} = v;
			data.records.forEach((item: any, index: number) => {
				item.key = index;
			});
			//	@ts-ignore
			this.data = data.records;
			//	@ts-ignore
			this.pagination = paginationDecode(this.pagination, data);
		});
}

