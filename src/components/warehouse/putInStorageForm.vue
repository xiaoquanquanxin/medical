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
            <a-form-item label="批次">
                <a-input
                        v-decorator="batchDecorator"
                        placeholder="请输入批次"
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
                    <a-input type="hidden" v-decorator="expirationTimeDecorator"/>
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
                        v-decorator="putInStoreQuantityDecorator"
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
            return {
                formItemLayout,
                //  采购单号
                purchaseOrderNoDecorator: ['purchaseOrderNo', {
                    rules: [{
                        required: true,
                        message: '请选择采购单号'
                    },]
                }],
                //  批次
                batchDecorator: ['batch', {
                    rules: [{
                        required: true,
                        message: '请输入批次'
                    },]
                }],
                //  过期日期
                expirationTimeDecorator: ['expirationTime', {
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
                putInStoreQuantityDecorator: ['putInStoreQuantity', {
                    rules: [{
                        required: true,
                        message: '请输入入库数量'
                    },]
                }],
            };
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                        this.data = data.order;
//                        this.pagination = paginationDecode(this.pagination, data);
//                        console.log(JSON.parse(JSON.stringify(this.pagination)));
//                    });
            },
            //  时间选择器的方法
            moment,
            //  选择过期日期
            onDateChange(value, selectDateValue){
                //  console.log(value.months());
                this.form.setFieldsValue({
                    expirationTime: selectDateValue,
                });
            },
            //  表单提交 保存
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.form);
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