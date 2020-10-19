<template>
    <div class="login-form">
        背景图可+
        <a-form class="login-wrap"
                @submit="handleSubmit"
                :form="form"
                :style="loginWrapStyle"
        >
            <a-form-item>
                <p class="login-title">综合管理平台</p>
            </a-form-item>
            <a-form-item>
                <a-select default-value="1"
                          @change="selectChange"
                >
                    <a-select-option value="1">
                        平台登录
                    </a-select-option>
                    <a-select-option value="2">
                        供应商登录
                    </a-select-option>
                    <a-select-option value="3">
                        渠道登录
                    </a-select-option>
                    <a-select-option value="-1">
                        医院登录
                    </a-select-option>
                </a-select>
            </a-form-item>
            <div v-show="basicForm" data-msg="常规输入框">
                <a-form-item>
                    <a-input
                            placeholder="请输入用户名"
                            v-decorator="userNameDecorator"
                    >
                        <a-icon slot="prefix" type="user" class="icon-color"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                            type="password"
                            placeholder="请输入密码"
                            v-decorator="passwordDecorator"
                    >
                        <a-icon slot="prefix" type="lock" class="icon-color"/>
                    </a-input>
                </a-form-item>
            </div>
            <div v-show="!basicForm" data-msg="医院登录输入框">
                <a-tabs default-active-key="1" tabPosition="top" style="margin-top:-20px;">
                    <a-tab-pane key="1" tab="账号登录">
                        <a-form-item>
                            <a-input
                                    placeholder="请输入用户名"
                                    v-decorator="userNameDecorator"
                            >
                                <a-icon slot="prefix" type="user" class="icon-color"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input
                                    type="password"
                                    placeholder="请输入密码"
                                    v-decorator="passwordDecorator"
                            >
                                <a-icon slot="prefix" type="lock" class="icon-color"/>
                            </a-input>
                        </a-form-item>
                    </a-tab-pane>
                    <a-tab-pane key="-1" tab="验证码登录">
                        <a-form-item>
                            <a-input-group compact>
                                <a-input
                                        style="width:179px;"
                                        placeholder="请输入手机号"
                                        v-decorator="phoneNumberDecorator"
                                >
                                    <a-icon slot="prefix" type="user" class="icon-color"/>
                                </a-input>
                                <a-button type="primary" @click="getMessage">获取验证码</a-button>
                            </a-input-group>
                        </a-form-item>
                        <a-form-item>
                            <a-input
                                    placeholder="请输入验证码"
                                    v-decorator="verificationDecorator"
                            >
                                <a-icon slot="prefix" type="lock" class="icon-color"/>
                            </a-input>
                        </a-form-item>
                    </a-tab-pane>
                </a-tabs>
            </div>
            <a-form-item>
                <a-button type="primary"
                          block
                          @click="handleSubmit"
                >登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { isPhoneNumber } from '@/utils/validate';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        data(){
            return {
                //  基础类型
                basicForm: true,
                //  外框的样式，主要是高度
                loginWrapStyle: {
                    height: '380px',
                },

                //  用户名
                userNameDecorator: ['userName', {
                    rules: [{
                        required: true,
                        message: '请输入用户名'
                    },]
                }],
                //  密码
                passwordDecorator: ['password', {
                    rules: [{
                        required: true,
                        message: '请输入密码'
                    },]
                }],
                //  手机号
                phoneNumberDecorator: ['phoneNumber', {
                    rules: [{
                        validator: isPhoneNumber,
                    }]
                }],
                //  验证码
                verificationDecorator: ['verification', {
                    rules: [{
                        required: true,
                        message: '请输入验证码'
                    },]
                }],
            };
        },
        methods: {
            //  登录方法
            ...mapActions('login', [
                'login',
            ]),
            //  选择登录变化
            selectChange(e){
                this.basicForm = e > 0;
                this.loginWrapStyle.height = `${(e > 0) ? 380 : 420}px`;
                this.loginWrapStyle.top = `${(e > 0) ? 0 : 40}px`;
                this.form.resetFields(['userName', 'password', 'phoneNumber', 'verification']);
            },
            //  获取短信验证码
            getMessage(){
                this.form.validateFields(['phoneNumber'], { force: true });
                const phoneNumberError = this.form.getFieldError('phoneNumber');
                //  如果验证通过
                if (!phoneNumberError || !phoneNumberError.length) {
                    console.log('发请求');
                }
            },
            //    登录
            handleSubmit(){
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('发请求吧');
                        this.login()
                            .then(v => {
                                console.log('登录成功');
                                this.$router.push('/');
                            });
                    }
                });
            },
        }
    };
</script>
<style scoped>
    .login-form {
        /*max-width: 300px;*/
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        /*background-image: url(http://172.16.1.236/IotBg.jpg);*/
        background-color: lightgrey;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        z-index: +1;
    }
    
    .login-wrap {
        width: 400px;
        padding: 50px 60px 40px;
        border-radius: 10px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: +1;
        background: white;
    }
    
    .login-title {
        text-align: center;
        font-size: 30px;
    }
    
    
    .icon-color {
        color: rgba(0, 0, 0, .25);
    }
</style>
