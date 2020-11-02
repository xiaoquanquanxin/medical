<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item :label="!isRefund?'应缴金额':'应退金额'">
                {{selectCostData.amountPayable}}
            </a-form-item>
            <a-form-item :label="!isRefund?'实际缴费金额':'实际退费金额'">
                <a-input-number
                        class="add-form-input"
                        :placeholder="!isRefund?'请输入实际缴费金额':'请输入实际退费金额'"
                        :min="0.1"
                        :step="0.1"
                        :max="selectCostData.amountPayable"
                        v-decorator="amountPaidDecorator"
                        @pressEnter="preventDefault"
                />
            </a-form-item>
            <a-form-item label="支付方式">
                <a-radio-group v-decorator="payWayDecorator">
                    <!--<a-radio value="1">支付宝支付</a-radio>-->
                    <!--<a-radio value="2">微信支付</a-radio>-->
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
            selectCostData(){
                return this.$store.state.cost.selectCostData;
            },
            //  操作类型	0,缴费，1退款）
            isRefund(){
                return this.$store.state.cost.isRefund;
            },
        },
        created(){
            console.log('支付对象', JSON.parse(JSON.stringify(this.selectCostData)));
            console.log('支付类型', this.isRefund);
        },
        data(){
            return {
                formItemLayout,
                //  金额
                amountPaidDecorator: ['amountPaid', {
                    initialValue: 0.1,
                    rules: [{
                        required: true,
                        message: '请输入金额',
                    },]
                }],
                //  支付方式(1支付宝，2微信,3现金缴费)
                payWayDecorator: ['payWay', {
                    initialValue: '3',
                    rules: [{
                        required: true,
                        message: '请输入金额',
                    },]
                }]
            };
        },
        methods: {
            preventDefault,
            //  表单提交 保存
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        //  console.table(values);
                        const data = {
                            id: this.selectCostData.id,
                            amountPaid: values.amountPaid,
                            isRefund: this.isRefund,
                            payWay: values.payWay,
                        };
                        (() => {
                            switch (this.isRefund) {
                                case 0:
                                    //  如果是缴费
                                    return requestBillingsPayment(data);
                                case 1:
                                    //  如果是退费
                                    return requestBillingsRefund(data);
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
