<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="账号名称">
            <a-input v-decorator="accountNameDecorator" placeholder="请输入账号名称"/>
        </a-form-item>
        <a-form-item label="角色">
            <a-input v-decorator="roleDecorator" placeholder="请输入角色"/>
        </a-form-item>
        <a-form-item label="账号密码">
            <a-input v-decorator="accountPasswordDecorator" placeholder="请输入账号密码"/>
        </a-form-item>
        <a-form-item label="确认密码">
            <a-input v-decorator="checkPasswordDecorator" placeholder="请输入账确认密码"/>
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  表单大小
                formItemLayout,
                
                accountNameDecorator: ['accountName', {
                    initialValue: '普通疾病',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入疾病名称'
                    },]
                }],
                roleDecorator: ['role', {
                    initialValue: '普通疾病',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入疾病名称'
                    },]
                }],
                accountPasswordDecorator: ['password', {
                    initialValue: '普通疾病',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入疾病名称'
                    },]
                }],
                checkPasswordDecorator: ['checkPassword', {
                    initialValue: '普通疾病',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入疾病名称'
                    },]
                }],
            };
        },
        created(){
            this.handleSubmit.bind(this);
        },
        methods:{
            //    表单提交
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    console.log(this.value);
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