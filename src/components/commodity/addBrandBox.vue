<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="仓库名称">
            <a-input
                    v-decorator="categoryNameDecorator"
                    placeholder="请输入品牌名称"
            />
        </a-form-item>
        <a-form-item label="品牌编码">
            <p>js</p>
        </a-form-item>
        <a-form-item label="是否展示">
            <a-switch checked-children="开" un-checked-children="关"
                      v-model="whetherShow"
            />
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  品牌id
            brandId(){
                return this.$store.state.commodity.brandId;
            },
        },
        data(){
            return {
                formItemLayout,
                //  品牌名称
                categoryNameDecorator: ['categoryName', {
                    rules: [{
                        required: true,
                        message: '请输入品牌名称'
                    },]
                }],
                //  是否展示
                whetherShow: false,
            };
        },
        created(){
            console.log('是编辑？', !!this.brandId);
        },
        methods: {
            //    表单提交
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