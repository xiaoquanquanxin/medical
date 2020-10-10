<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="输入新密码">
                <a-input placeholder="输入新密码"
                         v-decorator="passwordDecorator"
                />
            </a-form-item>
            <a-form-item label="确认新密码">
                <a-input placeholder="确认新密码"
                         v-decorator="checkPasswordDecorator"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 4, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    保存
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { compareToFirstPassword } from '../../utils/validate';

    export default {
        name: 'changePassword',
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  表单大小
                formItemLayout,
                //  输入新密码的校验
                passwordDecorator: ['password', {
                    rules: [{
                        required: true,
                        message: '请输入新密码'
                    },]
                }],
                //  输入新密码的校验
                checkPasswordDecorator: ['checkPassword', {
                    rules: [
                        {
                            required: true,
                            message: '请输入新密码'
                        },
                        {
                            validator: this.compareToFirstPassword('password'),
                        },
                    ],
                }],
            };
        },
        methods: {
            //  与第一密码比较，用于确认密码
            compareToFirstPassword,
            //    表单提交
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(err);
                    console.table(values);
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
    };
</script>
<style scoped lang="stylus">
</style>
