<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="缴费金额">
                xxx
            </a-form-item>
            <a-form-item label="缴费金额">
                <a-input-number
                        placeholder="请输入"
                        :min="0"
                        :max="10"
                        v-decorator="costDecorator"
                        @pressEnter="preventDefault"
                />
            </a-form-item>
            <a-form-item label="支付方式">
                <a-radio-group v-decorator="payWayDecorator">
                    <a-radio value="1">支付宝支付</a-radio>
                    <a-radio value="2">微信支付</a-radio>
                    <a-radio value="3">现金支付</a-radio>
                </a-radio-group>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { preventDefault } from '@/utils/common';

    import { formItemLayout } from '@/utils/layout.ts';
    import { requestBillingsPayment, requestBillingsRefund } from '../../api/cost/costList';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  支付id
            selectCostId(){
                return this.$store.state.cost.selectCostId;
            },
            //	操作类型	缴费1 、退费-1
            costType(){
                return this.$store.state.cost.costType;
            },
        },
        created(){
            console.log('支付id', this.selectCostId);
            console.log('支付类型', this.costType);
            this.searchFn();
        },
        data(){
            return {
                formItemLayout,
                //  金额
                costDecorator: ['cost', {
                    rules: [{
                        required: true,
                        message: '请输入金额',
                    },]
                }],
                //  支付方式(1支付宝，2微信,3现金缴费)
                payWayDecorator: ['payWay', {
                    initialValue: '1',
                    rules: [{
                        required: true,
                        message: '请输入金额',
                    },]
                }]
            };
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
            preventDefault,
            //  表单提交 保存
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.table(values);
                        (() => {
                            switch (this.costType) {
                                case 1:
                                    //  如果是缴费
                                    return requestBillingsPayment(values);
                                case 2:
                                    //  如果是退费
                                    return requestBillingsRefund(Object.assign(values));
                                default:
                                    throw new Error('错误的类型');
                            }
                        })()
                            .then(v => {
                                console.log(v);
                                resolve();
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
                });
            },
        }
    };
</script>
