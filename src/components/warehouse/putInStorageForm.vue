<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="采购单号">
                <a-select placeholder="请选择采购单号"
                          v-decorator="purchaseOrderNoDecorator"
                >
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option value="1">
                        xxx
                    </a-select-option>
                    <a-select-option value="2">
                        xxx
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商品货号">xxxx</a-form-item>
            <a-form-item label="供应商">xxxx</a-form-item>
            <a-form-item label="商品品牌">xxxx</a-form-item>
            <a-form-item label="厂家">xxxx</a-form-item>
            <a-form-item label="批次号">
                <a-input class="add-form-input"
                        v-decorator="batchNumberDecorator"
                        placeholder="请输入批次号"
                />
            </a-form-item>
            <a-form-item label="单位">xxxx</a-form-item>
            <a-form-item label="生产时间">xxxx</a-form-item>
            <a-form-item label="过期日期">
                <a-row style="width:400px" type="flex" align="middle">
                    <a-date-picker
                            class="lengthen-select-width"
                            placeholder="请选择过期日期"
                            @change="onDateChange"
                    />
                    <a-input type="hidden" v-decorator="expirationDateDecorator"/>
                    <span>剩余{{2323}}天</span>
                </a-row>
            </a-form-item>
            <a-form-item label="过期剩余天数">
                <a-row style="width:400px">
                    <a-input
                            class="longer-input-width"
                            v-decorator="overdueReminderDaysDecorator"
                            placeholder="请输入过期剩余天数"
                    />&emsp;
                    <span>天后过期，提醒平台退货</span>
                </a-row>
            </a-form-item>
            <a-form-item label="入库数量">
                <a-input
                        v-decorator="numDecorator"
                        placeholder="请输入入库数量"
                />
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import moment from 'moment';
    import { formItemLayout } from '@/utils/layout.ts';
    //  入库操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){

//	amountPrice	总金额		false
//	goodsId	商品id		false
//	goodsName	商品名称		false
//	goodsSpecifications	商品规格		false
//	goodsUnit	商品单位		false
//	goodsUnitId	商品单位id		false
//	price	单价		false
//	supplierId	渠道商id		false
//	supplierName	渠道商名称		false
//	warehouseReceiptCode	入库单号
            
            
            return {
                formItemLayout,
                //  采购单号
                purchaseOrderNoDecorator: ['purchaseOrderNo', {
                    rules: [{
                        required: true,
                        message: '请选择采购单号'
                    },]
                }],
                //  批次号
                batchNumberDecorator: ['batchNumber', {
                    rules: [{
                        required: true,
                        message: '请输入批次号'
                    },]
                }],
                //  过期日期
                expirationDateDecorator: ['expirationDate', {
                    rules: [{
                        required: true,
                        message: '请选择过期日期'
                    },]
                }],
                //  过期剩余天数
                overdueReminderDaysDecorator: ['overdueReminder', {
                    rules: [{
                        required: true,
                        message: '请输入过期剩余天数'
                    },]
                }],
                //  入库数量
                numDecorator: ['num', {
                    rules: [{
                        required: true,
                        message: '请输入入库数量'
                    },]
                }],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
            //  时间选择器的方法
            moment,
            //  选择过期日期
            onDateChange(value, selectDateValue){
                //  console.log(value.months());
                this.form.setFieldsValue({
                    expirationDate: selectDateValue,
                });
            },
            //  表单提交 保存
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        console.log(err);
                        if (!err) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                }))
                    .then(v => {
                        return new Promise(((resolve, reject) => {
                            console.log('发请求吧');
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }));
                    });
            },
        }
    };
</script>