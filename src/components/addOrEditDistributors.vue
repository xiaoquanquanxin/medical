<template>
    <div class="layout-content-inner-main">
        <a-form class="form"
                :form="form"
                v-bind="formItemLayout"
                @submit="handleSubmit"
                autocomplete="off"
        >
            <a-form-item label="渠道商名称">
                <a-input
                        v-decorator="distributorsNameDecorator"
                        placeholder="请输入渠道商名称"
                />
            </a-form-item>
            <a-form-item label="渠道商编码">
                <a-input
                        v-decorator="distributorsCodeDecorator"
                        placeholder="请输入渠道商编码"
                />
            </a-form-item>
            <a-form-item label="渠道商地区-省份">
                <a-select
                        v-decorator="provinceDecorator"
                >
                    <a-select-option value="">
                        渠道商地区-省份
                    </a-select-option>
                    <a-select-option value="1">
                        山西
                    </a-select-option>
                    <a-select-option value="2">
                        陕西
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="渠道商地区-市区">
                <a-select
                        v-decorator="cityDecorator"
                >
                    <a-select-option value="">
                        渠道商地区-市区
                    </a-select-option>
                    <a-select-option value="1">
                        晋中
                    </a-select-option>
                    <a-select-option value="2">
                        大同
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="选择仓库">
                <a-select
                        v-decorator="warehouseDecorator"
                >
                    <a-select-option value="">
                        请选择仓库
                    </a-select-option>
                    <a-select-option value="1">
                        aaa
                    </a-select-option>
                    <a-select-option value="2">
                        bbb
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="登录账户">
                <a-input
                        v-decorator="loginAccountDecorator"
                        placeholder="请输入登录账户"
                />
            </a-form-item>
            <a-form-item label="登录密码">
                <a-input
                        v-decorator="passwordDecorator"
                        placeholder="请输入登录密码"
                />
            </a-form-item>
            <a-form-item label="确认密码">
                <a-input
                        v-decorator="confirmPasswordDecorator"
                        placeholder="请输入登录密码"
                />
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { formItemLayout } from '@/utils/layout.ts';

    //  新增或编辑渠道商
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        components: {},
        computed: {
            ...mapGetters([
                'distributors',
            ]),
            //	渠道商id
            channelId(){
                return this.$store.state.distributors.channelId;
            },
        },
        data(){
            return {
                formItemLayout,
                //  渠道商名称
                distributorsNameDecorator: ['hospitalName', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入渠道商名称'
                    },]
                }],
                //  渠道商编码
                distributorsCodeDecorator: ['distributorsCode', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入渠道商编码'
                    },]
                }],
                //  渠道商地区-省份
                provinceDecorator: ['province', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请选择渠道商地区-省份'
                    },]
                }],
                //  渠道商地区-市区
                cityDecorator: ['city', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请选择渠道商地区-市区'
                    },]
                }],
                //  选择仓库
                warehouseDecorator: ['warehouse', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请选择仓库'
                    },]
                }],
                //  登陆账户
                loginAccountDecorator: ['loginAccount', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入登陆账户'
                    },]
                }],
                //  登陆账户
                passwordDecorator: ['password', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入登陆密码'
                    },]
                }],
                //  登陆账户
                confirmPasswordDecorator: ['confirmPassword', {
                    initialValue: '',
                    rules: [{
                        required: true,
                        message: '请输入登陆密码'
                    },]
                }],
            };
        },
        created(){
            this.handleSubmit.bind(this);
            console.log('是编辑？', !!this.channelId);
        },
        mounted(){
            //  如果是编辑
            //  发完请求以后
            if (!!this.channelId) {
                this.form.setFieldsValue({
                    password: 1
                });
            }
        },
        methods: {
            //  渠道商store
            ...mapActions('distributors', [
                'setChannelId',
            ]),
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
        },
    };
</script>
<style scoped lang="stylus">
</style>


