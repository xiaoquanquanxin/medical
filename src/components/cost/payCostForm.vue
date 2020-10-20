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
                <a-radio-group name="radioGroup" :default-value="1">
                    <a-radio :value="1">现金支付</a-radio>
                    <a-radio :value="2">微信支付</a-radio>
                    <a-radio :value="3">支付宝支付</a-radio>
                </a-radio-group>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { preventDefault } from '@/utils/common';

    import { formItemLayout } from '@/utils/layout.ts';

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
            preventDefault,
            //  表单提交 保存
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.form);
                    this.form.validateFields((err, values) => {
                        console.table(values);
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
