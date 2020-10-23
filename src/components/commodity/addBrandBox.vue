<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="品牌名称">
            <a-input class="add-form-input"
                     v-decorator="brandNameDecorator"
                     placeholder="请输入品牌名称"
            />
        </a-form-item>
        <a-form-item label="品牌编码">
            <p>后台自动生成</p>
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
    import { requestBrandGet, requestBrandInsert, requestBrandUpdate } from '../../api/commodity/brand';

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
                brandNameDecorator: ['brandName', {
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
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                //  如果是新增
                if (!this.brandId) {
                    return;
                }
                //  如果是编辑
                requestBrandGet(this.brandId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const { brandName } = data;
                        this.form.setFieldsValue({
                            brandName,
                        });
                    });
            },
            //    表单提交
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.table(values);
                        (() => {
                            //  如果是新增
                            if (!this.brandId) {
                                return requestBrandInsert(values);
                            }
                            //  如果是编辑
                            return requestBrandUpdate(Object.assign(
                                { id: this.brandId },
                                values)
                            );
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