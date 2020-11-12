<template>
    <div class="table-in-box">
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span v-if="isRefund === 0">缴费人信息</span>
            <span v-else>退费人信息</span>
        </a-row>
        <div class="item-3">
            <a-descriptions
                    :title="null"
                    bordered
                    :column="3"
                    size="small"
            >
                <a-descriptions-item label="姓名">
                    {{costData.name}}
                </a-descriptions-item>
                <a-descriptions-item label="科室">
                    {{costData.deptName}}
                </a-descriptions-item>
                <a-descriptions-item label="身份证">
                    {{costData.idCard}}
                </a-descriptions-item>
            </a-descriptions>
        </div>
        <br>
        <a-row type="flex" justify="space-between" align="middle" class="table-group-title no-border-bottom">
            <span v-if="isRefund === 0">缴费信息</span>
            <span v-else>退费信息</span>
        </a-row>
        <ul class="pay-cost-form-content">
            <li>
                <a-row type="flex" justify="start" align="middle">
                    <a-col class="label" type="flex" justify="space-between">处方号</a-col>
                    <a-col class="colon">:</a-col>
                    <a-col>处方号{{costData.aaaa}}</a-col>
                </a-row>
            </li>
            <li>
                <a-row type="flex" justify="start" align="middle">
                    <a-col class="label" type="flex" justify="space-between">
                        <span v-if="isRefund === 0">缴费金额</span>
                        <span v-else>退费金额</span>
                    </a-col>
                    <a-col class="colon">:</a-col>
                    <a-col>{{costData.amountPaid}}</a-col>
                </a-row>
            </li>
            <li v-if="isRefund === 1">
                <a-row type="flex" justify="start" align="middle">
                    <a-col class="label" type="flex" justify="space-between">
                        对账单号
                    </a-col>
                    <a-col class="colon">:</a-col>
                    <a-col>对账单号{{costData.amountPayable}}</a-col>
                </a-row>
            </li>
            <li v-if="isRefund === 1">
                <a-row type="flex" justify="start" align="middle">
                    <a-col class="label" type="flex" justify="space-between">
                        收款人
                    </a-col>
                    <a-col class="colon">:</a-col>
                    <a-col>收款人{{costData.amountPayable}}</a-col>
                </a-row>
            </li>
        </ul>
        <br>
        <ul class="pay-cost-form-content" v-if="isRefund === 1">
            <li>
                <a-row type="flex" justify="start" align="middle">
                    <a-col class="label" type="flex" justify="space-between">退费原因</a-col>
                    <a-col class="colon">:</a-col>
                    <a-col>
                        <a-input v-model="reason" placeholder="请输入退费原因"/>
                    </a-col>
                </a-row>
            </li>
        </ul>
    </div>
</template>
<script>
    import {
        requestBillingsBillingDetails,
        requestBillingsPayment,
        requestBillingsRefund
    } from '../../api/cost/costList';
    import { requestPrescriptionDetail } from '../../api/userList/intervention';

    export default {
        computed: {
            //  支付id
            selectCostId(){
                return this.$store.state.cost.selectCostId;
            },
            //  操作类型	0,缴费，1退款）
            isRefund(){
                return this.$store.state.cost.isRefund;
            },
        },
        data(){
            return {
                //  数据对象
                costData: {},
                //  退费原因
                reason: '',
            };
        },
        created(){
            console.log('支付类型', this.isRefund);
            this.searchFn();
        },
        methods: {
            searchFn(){
                requestBillingsBillingDetails(this.selectCostId)
                    .then(v => {
                        console.log(v.data);
                        this.costData = v.data;
                    });
            },
            //  表单提交 保存
            handleSubmit(){
                const { amountPayable: amountPaid, } = this.costData;
                const data = {
                    id: this.selectCostId,
                    amountPaid,
                    isRefund: this.isRefund,
                    payWay: 3,
                };
                console.log(data);
                switch (this.isRefund) {
                    case 0:
                        //  如果是缴费
                        return requestBillingsPayment(data);
                    case 1:
                        //  退费原因
                        data.reason = this.reason;
                        //  如果是退费
                        return requestBillingsRefund(data);
                    default:
                        throw new Error('错误的类型');
                }
            },
        }
    };
</script>
<style scoped>
    .pay-cost-form-content {
        padding: 16px;
        border: 1px solid var(--basic-border-color);
    }
    
    .pay-cost-form-content li + li {
        margin-top: 16px;
    }
    
    /*需要被对齐对文字*/
    .label {
        height: 21px;
        overflow: hidden;
        text-align: justify;
        width: 72px;
        margin-right: 0.3em;
        position: relative;
    }
    
    .label::after {
        content: '';
        display: inline-block;
        width: 100px;
        line-height: 0;
        height: 0;
    }
    
    /*冒号*/
    .colon {
        margin-right: .7em;
    }
</style>
