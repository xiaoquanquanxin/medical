<template>
    <div class="login-container">
        <div class="login-form">
            <div class="login-inner">
                <div class="for-title"></div>
                <div class="for-img"></div>
                <a-form class="login-wrap"
                        @submit="handleSubmit"
                        :form="form"
                        :style="loginWrapStyle"
                >
                    <a-form-item>
                        <p class="login-title">综合管理平台</p>
                    </a-form-item>
                    <a-form-item v-if="false">
                        <a-select default-value="1"
                                  @change="selectChange"
                        >
                            <a-select-option value="1">医生登录</a-select-option>
                            <a-select-option value="2">平台登录</a-select-option>
                            <a-select-option value="3">渠道商登录</a-select-option>
                            <!--                    <a-select-option value="-1">-->
                            <!--                        医院登录-->
                            <!--                    </a-select-option>-->
                        </a-select>
                    </a-form-item>
                    <br>
                    <br>
                    <div v-show="basicForm" data-msg="常规输入框">
                        <a-form-item>
                            <a-input
                                    placeholder="请输入用户名"
                                    v-decorator="usernameDecorator"
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
                                            v-decorator="usernameDecorator"
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
                    <br>
                </a-form>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { isPhoneNumber } from '@/utils/validate';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //  外框的样式，主要是高度
            loginWrapStyle(){
                const basicForm = this.basicForm;
                return {
                    height: `${basicForm ? 380 : 420}px`,
                    top: `${basicForm ? -60 : 40}px`,
                };
            }
        },
        data(){
            return {
                //  用户类型  1 医生   2 系统管理员  3 渠道商
                //  type: 1,
                //  基础类型
                basicForm: true,

                //  用户名
                usernameDecorator: ['username', {
                    initialValue: 'admin',
                    rules: [{
                        required: true,
                        message: '请输入用户名'
                    },]
                }],
                //  密码
                passwordDecorator: ['password', {
                    initialValue: '123456',
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
                //  fixme   这里，暂时不开发短信的功能
                return;
                //  this.type = e;
                this.basicForm = e > 1;
                this.form.resetFields(['username', 'password', 'phoneNumber', 'verification']);
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
                        this.login(values)
                            .then(v => {
                                const { query } = this.$route;
                                if (!query.redirect) {
                                    this.$router.push('/');
                                    return;
                                }
                                this.$router.push({ path: query.redirect });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
            },
            getOtherQuery(query){
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur];
                    }
                    return acc;
                }, {});
            }
        }
    };
</script>
<style scoped>
    .login-container {
        background-color: white;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    
    .login-form {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-image: url(/login-bg.jpg);
        background-size: cover;
        /*background-size: contain;*/
        background-repeat: no-repeat;
        background-position: center center;
        z-index: +1;
    }
    
    .login-wrap {
        margin-top: 60px;
        width: 360px;
        padding: 50px 60px 40px;
        border-radius: 10px;
        /*position: absolute;*/
        /*top: 0;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: -50%;*/
        /*margin: auto;*/
        /*margin-right: 57%;*/
        float: right;
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
    
    .login-inner {
        width: 980px;
        height: 440px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: +2;
    }
    
    
    .for-title {
        width: 584px;
        height: 274px;
        position: absolute;
        top: -40px;
        left: 0;
        z-index: +2;
        background-image: url(/login-tilte.png);
        background-repeat: no-repeat;
    }
    
    .for-img {
        width: 584px;
        height: 274px;
        position: absolute;
        bottom: 50px;
        left: -94px;
        z-index: +2;
        background-image: url(/login-img01.png);
        background-repeat: no-repeat;
    }
</style>

