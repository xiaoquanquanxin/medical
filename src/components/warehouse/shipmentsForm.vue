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
                            v-decorator="deliveryNumberDecorator"
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
                        v-decorator="courierNumberDecorator"
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
    //  入库操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  发货id
            procurementId(){
                return this.$store.state.warehouse.procurementId;
            }
        },
        data(){
            return {
                formItemLayout,
                //  发货数量
                deliveryNumberDecorator: ['deliveryNumber', {
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
                courierNumberDecorator: ['courierNumber', {
                    rules: [{
                        required: true,
                        message: '请输入快递单号'
                    },]
                }],
                //  备注
                remarkDecorator: ['remark', {
                    rules: [{
                        required: false,
                        message: '备注'
                    },]
                }],
            };
        },
        created(){
            console.log(this.procurementId);
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
            //  表单提交 保存
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.form);
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        console.log(values.expirationTime);
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