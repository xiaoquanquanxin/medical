import moment from 'moment';
import {requestGoodsListByHospital} from "@/api/commodity/commodityList"

//  使用量的计算
export function dosageChangeFn(scope: any, item: any) {
	//	console.log(this);
	//	console.log(this.prescriptionType);
	//	@ts-ignore
	if (this.prescriptionType === 2) {
		return;
	}
	//  console.log(JSON.parse(JSON.stringify(item)).goodsId);
	//    被编辑的商品id
	const {goodsId} = item;
	//	@ts-ignore
	const commodityItem = this.commodityTableData.filter((commodityItem: any) => {
		const {id} = commodityItem;
		if (goodsId === id) {
			return commodityItem;
		}
	})[0];
	if (!commodityItem) {
		alert('数据组织问题');
	}
	let quantity = 0;
	//	console.log(JSON.parse(JSON.stringify(commodityItem)));
	let unitRelations: string = '';
	//  找单位关系
	commodityItem.uintListVos.forEach((item: any) => {
		if (item.isRadioChecked) {
			unitRelations = item.unitRelations;
		}
	});
	console.log('单位关系');
	//	console.log(unitRelations);
	//	@ts-ignore
	this.timeTableData.forEach((timeItem: any) => {
		//  被编辑的商品id
		const {list} = timeItem;
		//  console.log(item.basicUnitItem.unitRelations);
		list.forEach((_item: any) => {
			//  console.log(_item);
			if (goodsId === _item.goodsId) {
				//  console.log(item.unitRelations);
				//  console.log(_item.unitRelations);
				quantity += (_item.dosage || 0) / +unitRelations;
			}
		});
	});
	//  console.log(quantity);
	commodityItem.quantity = quantity.toFixed(2);
	//	@ts-ignore
	this.$forceUpdate();
}

/**
 * 单位切换
 * 我要更新的数据
 * checked_uname           ✅   自动更新
 * purchaseUnitCheckId     ✅   手动组织
 * uintListVos里面的数据     ✅   手动遍历
 * */
export function unameChangeFn(sItem: any, checked_uname: string) {
	let purchaseUnitCheckId = null;
	sItem.uintListVos.forEach((item: any) => {
		//  console.log(item);
		item.isRadioChecked = false;
		if (item.uname === checked_uname) {
			item.isRadioChecked = true;
			purchaseUnitCheckId = item.id;
		}
	});
	sItem.purchaseUnitCheckId = purchaseUnitCheckId;
	//  console.log(JSON.parse(JSON.stringify(sItem)));
	//	@ts-ignore
	this.$forceUpdate();
}

//  计算时间框的总行数
export function rowCount() {
	//	@ts-ignore
	if (!this.timeTableData || !this.timeTableData.length) {
		return 0;
	}
	//	@ts-ignore
	const rowCount = this.timeTableData.reduce((a, b) => {
		return a + b.list.length;
	}, 0);
	//	@ts-ignore
	this.setRowForRemark(rowCount);
}

//  清洗时间表格数据
export function clearTimeTableData() {
	//	@ts-ignore
	for (let i = 0; i < this.timeTableData.length; i++) {
		//	@ts-ignore
		const item = this.timeTableData[i];
		//  在时间列表里删除这个项，这是被删除完了
		if (!item.list.length) {
			//	@ts-ignore
			this.timeTableData.splice(i, 1);
			//  ⚠️可能删除多行
			i--;
		}
	}
	//  console.table(JSON.parse(JSON.stringify(this.timeTableData)));
	//  计算时间框的总行数
	//	@ts-ignore
	this.rowCount();
}

//  删除时间表格的一行
export function deleteTimeTable(scope: any, index: number) {
	//  操作的是 timeTableData，只删除一行
	scope.list.splice(index, 1);
	//  如果删除了某个时间下的所有数据，需要删除这一行
	if (!scope.list.length) {
		//	@ts-ignore
		this.clearTimeTableData();
	}
	//	@ts-ignore
	this.rowCount();
}

//  选择时间的变换
export function selectTimeChange(value: any, selectTimeValue: string) {
	//	@ts-ignore
	this.selectTimeValue = selectTimeValue;
}

//  选择时间
export function chooseTime() {
	//  如果没有选择商品数据，先添加选择商品数据
	//	@ts-ignore
	if (!this.commodityTableData.length) {
		//	@ts-ignore
		this.$message.error('请先选择商品');
		return;
	}
	console.log('实际是新增一条时间');
	//	@ts-ignore
	this.selectTimeValue = '00:00';
	//  初始化时间
	//	@ts-ignore
	this.selectTimeMoment = moment(this.selectTimeValue, 'HH:mm');
	//	@ts-ignore
	this.timeSelectModal = true;
}

//  确定选择的时间
export function selectTimeModalCheck() {
	//	@ts-ignore
	const commodityTableData = JSON.parse(JSON.stringify(this.commodityTableData));
	//  子列表数据
	const list = commodityTableData.map((item: any) => {
		const {basicUnitItem} = item;
		const child = item.uintListVos.filter((_item: any) => {
			//  console.log(_item.isRadioChecked);
			return _item.isRadioChecked;
		});
		//  console.log(child);
		return Object.assign(child[0], {goodsName: item.goodsName, basicUnitItem});
	});
	//  console.log(list);

	//  console.log(JSON.parse(JSON.stringify(this.timeTableData)));
	//  时间的最后一条数据
	//	@ts-ignore
	const timeTableDataLastItem = this.timeTableData[this.timeTableData.length - 1] || {key: 0};
	console.log(JSON.parse(JSON.stringify(timeTableDataLastItem)));
	//  一条数据
	const data = {
		//  key
		key: timeTableDataLastItem.key + 1,
		//  时间
		//	@ts-ignore
		time: this.selectTimeValue,
		//  温水
		warmWater: null,
		//  子列表
		list,
		//
	};
	//  新增一条数据
	//	@ts-ignore
	this.timeTableData.push(data);
	//  关闭时间选择
	//	@ts-ignore
	this.timeSelectModal = false;
	//	@ts-ignore
	this.rowCount();
}

//  删除选择商品表格的一行
export function deleteTypeTable(sItem: any, sIndex: number) {
	//  内部的id，单选id，    id === 商品id
	const {id} = sItem;
	//	console.log(JSON.parse(JSON.stringify(sItem)));
	//  debugger;
	//  洗主数据
	delete sItem.purchaseUnitCheckId;
	delete sItem.isCheckboxChecked;
	sItem.uintListVos.forEach((item: any) => {
		if (item.isRadioChecked) {
			delete item.isRadioChecked;
		}
	});
	//  清洗时间表格数据，只删除一行
	//	@ts-ignore
	this.timeTableData.forEach((item: any) => {
		//  debugger
		for (let i = 0; i < item.list.length; i++) {
			//  要被删除的商品类型
			if (item.list[i].goodsId === id) {
				item.list.splice(i, 1);
				break;
			}
		}
	});
	//	@ts-ignore
	this.clearTimeTableData();
	//  清除选择商品表格的该行，只删除一行
	//	@ts-ignore
	this.commodityTableData.splice(sIndex, 1);
}

//  获取该医院下的商品
export function getGoodsListByHospital(hospitalId: string, isMainButton: boolean, addCommodityTimeList: any) {
	requestGoodsListByHospital(hospitalId)
		.then(goodsListByHospital => {
			goodsListByHospital.forEach((item: any) => {
				item.uintListVos = item.uintListVos.filter((_item: any) => {
					//	@ts-ignore
					return _item.type === this.prescriptionType;
				});
				//  如果是主按钮
				if (isMainButton) {
					//	@ts-ignore
					this.commodityTableData.forEach((_item: any) => {
						//  复制辅助数据【选择状态，数量等】
						if (item.id === _item.id) {
							Object.assign(item, _item);
						}
					});
				} else {
					addCommodityTimeList.forEach((_item: any) => {
						//  如果http数据的商品id === 时间列表的商品id
						//  那么他是被选择的，且被选中的id是 _item.id【在时间数据里组织的数据是按uintListVos的】
						if (item.id === _item.goodsId) {
							item.purchaseUnitCheckId = _item.id;
							item.isCheckboxChecked = true;
							item.uintListVos.forEach((__item: any) => {
								//  console.log(JSON.parse(JSON.stringify(__item)));
								if (_item.id === __item.id) {
									__item.isRadioChecked = true;
								}
							});
						}
					});
//                                console.log(JSON.parse(JSON.stringify(addCommodityTimeList)));
//                                console.log(JSON.parse(JSON.stringify(goodsListByHospital)));
				}
			});
			const httpData = goodsListByHospital;
			console.log(JSON.parse(JSON.stringify(httpData)));
			//  如果是主按钮
			if (isMainButton) {
				//	@ts-ignore
				this.timeOriginList = null;
				//	@ts-ignore
				this.originCommodityList = httpData;
				//	@ts-ignore
				this.commoditySelectModal = true;
			} else {
				//  如果时间按钮
				//	@ts-ignore
				this.timeOriginList = httpData;
				//	@ts-ignore
				this.commoditySelectModal = true;
			}
		});
}


//  确认选择商品莫泰框
export function selectCommodityModalCheck(refSelectCommodity: any) {
	//	@ts-ignore
	const promise = this.$refs[refSelectCommodity].handleSubmit();
	promise.then((originCommodityList: any) => {
		//  console.log(JSON.parse(JSON.stringify(originCommodityList)));
		//  console.log((JSON.stringify(originCommodityList)));
		//  只展示被选中的
		const commodityTableData = originCommodityList.filter((item: any) => item.isCheckboxChecked);
		//  JSON.parse(JSON.stringify(this.commodityTableData));
		//  区分，如果是，院内，就是有3条数据的，需要计算出来基本单位
		//	@ts-ignore
		if (this.prescriptionType === 1) {
			commodityTableData.forEach((item: any) => {
				//  console.log(item);
				//  被选中的对象
				const checkedList = item.uintListVos.filter((_item: any) => _item.isRadioChecked);
				if (!checkedList.length) {
					alert('检查数据组织，不可能没有 isRadioChecked === 1的');
				}
				if (checkedList.length > 1) {
					alert('检查数据组织，不可能有多个 isRadioChecked === 1的');
				}
				const {uname} = checkedList[0];
				console.log(`被选中的类型是${uname}`);
				item.checked_uname = uname;
				//  基础数据
				const basicUnitItem = item.uintListVos.filter((_item: any) => +_item.unameType === 1)[0];
				if (!basicUnitItem) {
					alert('检查脏数据，没有unameType===1的，这是不可能的');
				}
				//  console.log(JSON.parse(JSON.stringify(basicUnitItem)));
				item.basicUnitItem = basicUnitItem;
			});
		}
		//  如果是主要按钮
		//	@ts-ignore
		if (this.isMainButton) {
			//	@ts-ignore
			this.commodityTableData = commodityTableData;
			//	@ts-ignore
			console.log('输出数据', JSON.parse(JSON.stringify(this.commodityTableData)));
		} else {
			//  如果是时间按钮
			//  被选中的
			console.log(JSON.parse(JSON.stringify(commodityTableData)));
			//  已有的数据
			//	@ts-ignore
			console.log(JSON.parse(JSON.stringify(this.commodityTableData)));
			//  对比，如果新时间选择了已有数据，那么，要更新this.commodityTableData
			const updateMap = {};
			//	@ts-ignore
			this.commodityTableData.forEach((item: any) => {
				//	@ts-ignore
				updateMap[item.id] = item;
			});
			//  重写这个完事了
			//	@ts-ignore
			const addCommodityTimeList = [];
			console.log(commodityTableData.length);
//                        this.addCommodityTimeList.length = 0;
			commodityTableData.forEach((item: any) => {
				//  这是新增的
				//	@ts-ignore
				if (!updateMap[item.id]) {
					//  装到this.commodityTableData
					//	@ts-ignore
					this.commodityTableData.push(item);
				}
				const {uintListVos, purchaseUnitCheckId} = item;
				let timeItem = null;
				uintListVos.forEach((_item: any) => {
					if (purchaseUnitCheckId === _item.id) {
						const {basicUnitItem, goodsName} = item;
						timeItem = Object.assign({}, _item, {goodsName, basicUnitItem});
					}
				});
				addCommodityTimeList.push(timeItem);
			});
//                        this.addCommodityTimeList = addCommodityTimeList
			//	@ts-ignore
			console.log(JSON.parse(JSON.stringify(addCommodityTimeList)));
			const addCommodityTimeMap = {};
			//	@ts-ignore
			this.addCommodityTimeList.forEach((item: any) => {
				//	@ts-ignore
				addCommodityTimeMap[item.id] = item;
			});
			//	@ts-ignore
			addCommodityTimeList.forEach(item => {
				//  如果最新的数据里是和以前的数据有重的，那么merge一下 使用量、温水、备注
				//	@ts-ignore
				const _item = addCommodityTimeMap[item.id];
				if (_item) {
					const {dosage, warmWater, unitRelations} = _item;
					item.dosage = dosage;
					item.warmWater = warmWater;
//                                console.log(item.unitRelations);
//                                console.log(unitRelations);
				}
			});
			//  查询一下this.addCommodityTimeList在时间数据里是第几个
			let timeListIndex = -1;
			//	@ts-ignore
			for (let i = 0; i < this.timeTableData.length; i++) {
				//	@ts-ignore
				const item = this.timeTableData[i];
				//	@ts-ignore
				if (item.list === this.addCommodityTimeList) {
					timeListIndex = i;
					break;
				}
			}
			if (timeListIndex === -1) {
				alert('组织错误');
			}
			//	@ts-ignore
			this.timeTableData[timeListIndex].list = addCommodityTimeList;
			//	@ts-ignore
			console.log(JSON.parse(JSON.stringify(this.timeTableData)));
		}
		//  临时map用于筛查时间表格的多余数据
		const _tempMap = {};
		//	@ts-ignore
		this.commodityTableData.forEach((item: any) => {
			//	@ts-ignore
			_tempMap[item.id] = true;
		});
		//	@ts-ignore
		const timeTableData = [];
		console.log('筛查时间表格数据');
		//	@ts-ignore
		console.log('时间源数据', JSON.parse(JSON.stringify(this.timeTableData)));
		//    重置时间表格数据，完全重新组织时间数据
		//	@ts-ignore
		this.timeTableData.forEach((item: any) => {
			const {
				key,
				time,
				warmWater,
				list,
			} = item;
			const data = {
				key,
				time,
				warmWater,
			};

			const newList: Array<any> = [];
			list.forEach((_item: any) => {
				//  时间map里有的才留下，
				//	@ts-ignore
				if (_tempMap[_item.goodsId]) {
					newList.push(_item);
				}
			});
			//	@ts-ignore
			data.list = newList;
			timeTableData.push(data);
		});
		console.log('最新的时间数据');
		//	@ts-ignore
		console.log(timeTableData);
		//	@ts-ignore
		this.timeTableData = timeTableData;
		//	@ts-ignore
		this.commoditySelectModal = false;
		//	@ts-ignore
		this.$nextTick(() => {
			//	@ts-ignore
			this.rowCount();
		});
	}).catch((error: Error) => {
		console.log(error);
		console.log('有错');
	});
}

