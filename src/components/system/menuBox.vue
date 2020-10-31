<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="上级菜单">
            <p>111</p>
        </a-form-item>
        <a-form-item label="菜单名称">
            <a-input class="add-form-input"
                     v-decorator="menuNameDecorator"
                     placeholder="请输入菜单名称"/>
        </a-form-item>
        <a-form-item label="菜单类型">
            <a-select v-decorator="menuTypeDecorator"
                      class="add-form-input"
                      placeholder="请选择菜单类型"
            >
                <a-select-option value="1">左菜单</a-select-option>
                <a-select-option value="2">按钮</a-select-option>
                <a-select-option value="3">顶菜单</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="菜单key">
            <a-input class="add-form-input"
                     v-decorator="keyDecorator"
                     placeholder="菜单key"/>
        </a-form-item>
    </a-form>
</template>
<script>
    
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestRoleGet, requestRoleSave } from '../../api/system/role';
    
    //  菜单框
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //	菜单操作类型 , 1 新增、2 编辑、3 查看
            roleOperationType(){
                return this.$store.state.system.roleOperationType;
            },
            //  被选中的菜单的id
            selectRoleId(){
                return this.$store.state.system.selectRoleId;
            }
        },
        data(){
            return {
                //  表单大小
                formItemLayout,
                //  菜单类型
                menuTypeDecorator: ['menuType', {
                    rules: [{
                        required: true,
                        message: '请输菜单类型',
                    },]
                }],
                //  菜单名称
                menuNameDecorator: ['menuName', {
                    rules: [{
                        required: true,
                        message: '请输菜单名称',
                    },]
                }],
                //  菜单key
                keyDecorator: ['key', {
                    rules: [{
                        required: true,
                        message: '请输入菜单key',
                    },]
                }],
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            searchFn(){
                //  如果是新增
                if (!this.selectRoleId) {
                    return;
                }
                //  如果是编辑
                requestRoleGet(this.selectRoleId)
                    .then(v => {
                        console.log(v);
                    });
            },
            //    表单提交
            handleSubmit(){
                console.log(this.treeSelectValue);
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        console.table(values);
                        (() => {
                            //  1 新增、2 编辑、3 查看
                            switch (this.roleOperationType) {
                                case 1:
                                    return requestRoleSave(values);
                                case 2:
                                    return requestRoleSave(values);
                                case 3:
                                    return requestRoleSave(values);
                                default :
                                    throw new Error('错误的类型');
                            }
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