<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="分类名称">
            <a-input class="add-form-input"
                     v-decorator="categoryNameDecorator"
                     placeholder="请输入分类名称"
            />
        </a-form-item>
        <a-form-item label="分类编码">
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
    import {
        requestCategoryGet,
        requestCategoryInsert,
        requestCategoryUpdate
    } from '../../api/commodity/commodityClassification';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  分类id
            classificationId(){
                return this.$store.state.commodity.classificationId;
            },
        },
        data(){
            return {
                formItemLayout,
                //  分类名称
                categoryNameDecorator: ['categoryName', {
                    rules: [{
                        required: true,
                        message: '请输入分类名称'
                    },]
                }],
                //  是否展示
                whetherShow: false,
            };
        },
        created(){
            console.log('是编辑？', !!this.classificationId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                //  如果是新增
                if (!this.classificationId) {
                    return;
                }
                //  如果是编辑
                requestCategoryGet(this.classificationId)
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const { categoryName } = data;
                        this.form.setFieldsValue({
                            categoryName,
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
                            if (!this.classificationId) {
                                return requestCategoryInsert(values);
                            }
                            //  如果是编辑
                            return requestCategoryUpdate(Object.assign(
                                { id: this.classificationId },
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