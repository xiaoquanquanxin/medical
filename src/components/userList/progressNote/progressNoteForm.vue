<template>
    <div class="table-in-box">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="是否能够按照方案执行">
                <a-radio-group name="radioGroup">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input
                        placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="是否能够耐受">
                <a-radio-group name="radioGroup">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="有无大便">
                <a-radio-group name="radioGroup">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input placeholder="请输入具体原因"/>
            </a-form-item>
            <a-form-item label="有无饥饿感">
                <a-radio-group name="radioGroup">
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="2">否</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="具体原因">
                <a-input placeholder="请输入具体原因"/>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    //  病程记录操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            progressNoteId(){
                return this.$store.state.userList.progressNoteId;
            }
        },
        data(){
            return {
                formItemLayout,
//                //  病程记录商品
//                reportedLossGoodsDecorator: ['reportedLossGoods', {
//                    rules: [{
//                        required: true,
//                        message: '请选择病程记录商品'
//                    },]
//                }],
//                //  病程记录数量
//                reportedLossQuantityDecorator: ['reportedLossQuantity', {
//                    rules: [{
//                        required: true,
//                        message: '请输入采购数量'
//                    },]
//                }],
//                //  病程记录原因
//                reportedLossReasonDecorator: ['reportedLossReason', {
//                    rules: [{
//                        required: true,
//                        message: '请输入病程记录原因'
//                    },]
//                }],
            };
        },
        created(){
            console.log('是编辑？', !!this.progressNoteId);
        },
        methods: {
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