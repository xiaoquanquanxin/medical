<template>
    <div class="layout-content-inner-main">
        <p>编辑用户</p>
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="用户名称">
                <a-input
                        v-decorator="userNameDecorator"
                />
            </a-form-item>
            <a-form-item label="性别">
                <a-select placeholder="请选择地址" default-value="1">
                    <a-select-option value="1">男</a-select-option>
                    <a-select-option value="2">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="年龄">
                <a-input placeholder="请输入年龄"/>
            </a-form-item>
            <a-form-item label="身高">
                <a-input placeholder="请输入身高"/>
            </a-form-item>
            <a-form-item label="体重">
                <a-input placeholder="请输入体重"/>
            </a-form-item>
            <a-form-item label="手机号">
                <a-input placeholder="请输入手机号"/>
            </a-form-item>
            <a-form-item label="身份证号">
                <a-input placeholder="请输入身份证号"/>
            </a-form-item>
            <a-form-item label="医院">
                <a-select placeholder="请选择医院">
                    <a-select-option value="1">男</a-select-option>
                    <a-select-option value="2">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="科室">
                <a-select placeholder="请选择科室">
                    <a-select-option value="1">男</a-select-option>
                    <a-select-option value="2">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="主治医生">
                <a-select placeholder="请选择主治医生">
                    <a-select-option value="1">男</a-select-option>
                    <a-select-option value="2">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="营养师">
                <a-select placeholder="请选择营养师">
                    <a-select-option value="1">男</a-select-option>
                    <a-select-option value="2">女</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="家庭组">
                <a-input placeholder="请输入家庭组"/>
            </a-form-item>
            <a-form-item label="小程序ID">
                <a-input placeholder="请输入小程序ID"/>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 4, offset: 7 }">
                <a-button type="primary" html-type="submit">保存</a-button>
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
                userId: this.$route.params.userId,
                //  表单大小
                formItemLayout,

                //  用户名称规则
                userNameDecorator: ['userName', {
                    initialValue: '么脑仁儿',
                    rules: [{
                        max: 11,
                        message: '最多11位',
                    }, {
                        required: true,
                        message: '请输入医院名称'
                    },]
                }],
            };
        },
        methods: {
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
<style lang="stylus">
</style>