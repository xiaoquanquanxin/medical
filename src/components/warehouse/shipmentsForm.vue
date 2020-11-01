<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="采购数量">xxxx</a-form-item>
            <a-form-item label="发货数量">
                <a-row>
                    <a-input
                            v-decorator="deliveryNumDecorator"
                            placeholder="请输入发货数量"
                            suffix="箱"
                    />
                </a-row>
            </a-form-item>
            <a-form-item label="物流公司">
                <a-input
                        v-decorator="logisticsCompanyDecorator"
                        placeholder="请输入物流公司"
                />
            </a-form-item>
            <a-form-item label="生成快递单号">
                <a-input
                        v-decorator="orderCodeDecorator"
                        placeholder="请输入快递单号"
                />
            </a-form-item>
            <a-form-item label="备注">
                <a-input
                        v-decorator="remarkDecorator"
                        placeholder="请输入备注"
                />
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestGoodsGoodsDelivery } from '../../api/warehouse/purchaseOrder';
    //  入库操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        props: ['operationData'],
        data(){
            return {
                formItemLayout,
                //  发货数量
                deliveryNumDecorator: ['deliveryNum', {
                    rules: [{
                        required: true,
                        message: '请输入发货数量'
                    },]
                }],
                //  物流公司
                logisticsCompanyDecorator: ['logisticsCompany', {
                    rules: [{
                        required: true,
                        message: '请输入物流公司'
                    },]
                }],
                //  生成快递单号
                orderCodeDecorator: ['orderCode', {
                    rules: [{
                        required: true,
                        message: '请输入快递单号'
                    },]
                }],
                //  备注
                remarkDecorator: ['remark', {
                    initialValue: '备注2',
                    rules: [{
                        required: false,
                        message: '备注'
                    },]
                }],
            };
        },

        created(){
            console.log(JSON.parse(JSON.stringify(this.operationData)));
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
            //  表单提交 保存
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (err) {
                            reject();
                        }
                        const data = Object.assign({
                            purchaseOrderId: this.operationData.id,
                        }, values);
                        console.log(data);
                        alert('purchaseOrderId？？？');
                        requestGoodsGoodsDelivery(data)
                            .then(v => {
                                //  todo
                                console.log(v);
                                resolve();
                            });
                    });
                }));
            },
        }
    };
</script>