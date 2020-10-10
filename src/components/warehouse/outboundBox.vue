<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="出库商品">
            <a-select placeholder="请选择出库商品"
                      v-decorator="outboundGoodsDecorator"
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
        <a-form-item label="单位">xxxx</a-form-item>
        <a-form-item label="生产时间">xxxx</a-form-item>
        <a-form-item label="过期时间">xxxx</a-form-item>
        <a-form-item label="出库数量">
            <a-input
                    v-decorator="outboundQuantityDecorator"
                    placeholder="请输入采购数量"
            />
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    //  出库操作
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  出库的id
            outboundId(){
                return this.$store.state.warehouse.outboundId;
            }
        },
        data(){
            return {
                formItemLayout,
                //  出库商品
                outboundGoodsDecorator: ['outboundGoods', {
                    rules: [{
                        required: true,
                        message: '请选择出库商品'
                    },]
                }],
                //  出库数量
                outboundQuantityDecorator: ['outboundQuantity', {
                    rules: [{
                        required: true,
                        message: '请输入采购数量'
                    },]
                }],
            };
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