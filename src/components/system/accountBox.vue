<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="选择角色">
            <a-select v-decorator="roleDecorator"
                      placeholder="请选择角色">
                <a-select-option value="">
                    状态
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="账号名称">
            <a-input v-decorator="usernameDecorator" placeholder="请输入账号名称"/>
        </a-form-item>
        <a-form-item label="账号密码">
            <a-input v-decorator="accountPasswordDecorator" placeholder="请输入账号密码"/>
        </a-form-item>
        <a-form-item label="确认密码">
            <a-input v-decorator="confirmPasswordDecorator" placeholder="请输入账确认密码"/>
        </a-form-item>
    </a-form>
</template>
<script>
    import { formItemLayout } from '@/utils/layout.ts';
    import { compareToFirstPassword } from '@/utils/validate';
    import { requestUserInsert, requestUserUpdate } from '../../api/system';

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
                //  表单大小
                formItemLayout,
                //  选择角色
                roleDecorator: ['role', {
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
                //  确认密码
                confirmPasswordDecorator: ['confirmPassword', {
                    rules: [
                        {
                            required: true,
                            message: '请输入确认密码'
                        },
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
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
            //  与第一密码比较，用于确认密码
            compareToFirstPassword,
            //    表单提交
            handleSubmit(){
                return new Promise(((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        console.table(values);
                        if (!err) {
                            const { username, password } = values;
                            const data = { username, password };
                            (() => {
                                //  如果是新增账号
                                if (!this.selectAccountId) {
                                    return requestUserInsert(data);
                                } else {
                                    //  编辑账号
                                    return requestUserUpdate(data);
                                }
                            })()
                                .then(v => {
                                    resolve(v);
                                })
                                .error(err => {
                                    reject(err);
                                });

                        } else {
                            reject();
                        }
                    });
                }));
            },
        }
    };
</script>