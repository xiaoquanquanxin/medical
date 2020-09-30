<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="文章名称">
                <a-input placeholder="请输入文章名称"
                         v-decorator="articleNameDecorator"
                />
            </a-form-item>
            <a-form-item label="文章类型" has-feedback>
                <a-select placeholder="请选择文章类型"
                          v-decorator="articleTypeDecorator"
                >
                    <a-select-option v-for="(item,index) in articleTypeList"
                                     :value="index"
                                     :key="index"
                    >
                        {{item}}--{{index}}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="商品关键字">
                <a-input placeholder="请输入商品关键字"
                         v-decorator="articleNameDecorator"
                />
            </a-form-item>
            
            <a-form-item :wrapper-col="{ span: 4, offset: 7 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                formItemLayout,

                articleNameDecorator: ['articleName', {
                    initialValue: '经纬医院',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入医院名称'
                    },]
                }],
                articleTypeDecorator: ['articleType', {
                    initialValue: '经纬医院',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入医院名称'
                    },]
                }],

                //  文章类型列表
                articleTypeList: [],
            };
        },
        mounted(){
            setTimeout(() => {
                this.articleTypeList = ['1111', '333'];
            }, 1111);
        },
        methods: {
            //    表单提交
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(err);
                    console.table(values);
                    console.log(values.hospitalIcon);
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
    };
</script>