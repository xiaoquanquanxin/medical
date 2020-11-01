<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="选择角色">
            <a-select class="add-form-input"
                      v-decorator="roleDecorator"
                      placeholder="请选择角色">
                <a-select-option :value="item.roleId"
                                 v-for="item in roleList"
                >{{item.roleName}}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="账号名称">
            <a-input class="add-form-input"
                     v-decorator="usernameDecorator"
                     placeholder="请输入账号名称"/>
        </a-form-item>
        <a-form-item label="账号类型">
            <a-select class="add-form-input"
                      v-decorator="typeDecorator"
                      placeholder="请选择账号类型">
                <a-select-option :value="2">系统管理员</a-select-option>
                <a-select-option :value="3">渠道商</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="账号密码">
            <a-input class="add-form-input"
                     v-decorator="accountPasswordDecorator"
                     placeholder="请输入账号密码"/>
        </a-form-item>
        <a-form-item label="确认密码">
            <a-input class="add-form-input"
                     v-decorator="confirmPasswordDecorator"
                     placeholder="请输入账确认密码"/>
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { compareToFirstPassword } from '@/utils/validate';
    import { requestUserGet, requestUserInsert, requestUserUpdate } from '../../api/system/account';
    import { requestRoleRoleAll } from '../../api/system';

    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            selectAccountId(){
                return this.$store.state.system.selectAccountId;
            },
            accountOperationType(){
                return this.$store.state.system.accountOperationType;
            }
        },
        data(){
            return {
                roleList: [],
                //  表单大小
                formItemLayout,
                //  选择角色
                roleDecorator: ['roleId', {
                    rules: [{
                        required: true,
                        message: '请选择角色'
                    },]
                }],
                //  账号名称
                usernameDecorator: ['username', {
                    rules: [{
                        required: true,
                        message: '请输入账号名称'
                    },]
                }],
                //  账号密码
                accountPasswordDecorator: ['password', {
                    rules: [{
                        required: true,
                        message: '请输入疾病名称'
                    },]
                }],
                //  账号类型
                typeDecorator: ['type', {
                    rules: [{
                        required: true,
                        message: '请选择账号类型'
                    },]
                }],
                //  确认密码
                confirmPasswordDecorator: ['confirmPassword', {
                    rules: [
                        {
                            validator: this.compareToFirstPassword('password'),
                        }
                    ]
                }],
            };
        },
        created(){
            this.handleSubmit.bind(this);
            console.log('是编辑？', this.selectAccountId);
            console.log('类型', this.accountOperationType);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestRoleRoleAll()
                    .then(v => {
                        v.data = v.data || [];
                        v.data.forEach((item, index) => {
                            item.key = index;
                        });
                        console.log(v.data);
                        this.roleList = v.data;
                    });
                //  如果是新增
                if (!this.selectAccountId) {
                    return;
                }
                requestUserGet(this.selectAccountId)
                    .then(v => {
                        const data = v.data || {};
                        const { username, roleId, type } = data;
                        this.form.setFieldsValue({
                            username,
                            roleId,
                            type,
                        });
                    });
            },
            //    表单提交
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.table(values);
                        delete values.confirmPassword;
//                        return Promise.reject();
                        (() => {
                            //  如果是新增账号
                            if (!this.selectAccountId) {
                                return requestUserInsert(values);
                            } else {
                                //  编辑账号
                                return requestUserUpdate(Object.assign({ userId: this.selectAccountId }, values));
                            }
                        })()
                            .then(v => {
                                resolve(v);
                            })
                            .error(err => {
                                reject(err);
                            });
                    });
                }));
            },
            //  与第一密码比较，用于确认密码
            compareToFirstPassword,
        }
    };
</script>