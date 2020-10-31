<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="角色名称">
            <a-input class="add-form-input" v-decorator="roleNameDecorator" placeholder="请输入角色名称"/>
        </a-form-item>
        <a-form-item label="角色描述">
            <a-input class="add-form-input" v-decorator="roleDescDecorator" placeholder="请输入角色描述"/>
        </a-form-item>
        <a-form-item label="角色编码">
            <a-input class="add-form-input"
                     v-decorator="roleCodeDecorator"
                     placeholder="请输入角色编码"/>
        </a-form-item>
        <a-form-item label="权限" v-if="false">
            <a-tree-select
                    class="add-form-input"
                    v-if="treeData"
                    v-model="treeSelectValue"
                    style="width: 100%"
                    :disabled="!treeData"
                    :tree-data="treeData"
                    :treeDefaultExpandAll="true"
                    tree-checkable
                    :show-checked-strategy="SHOW_PARENT"
                    search-placeholder="Please select"
            />
            <!--            @change="selectTreeChange"-->
        </a-form-item>
        <br><br><br><br><br>
    </a-form>
</template>
<script>
    import { TreeSelect } from 'ant-design-vue';
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestRoleGet, requestRoleSave, requestRoleUpdate } from '../../api/system/role';

    const SHOW_PARENT = TreeSelect.SHOW_PARENT;

    const treeData = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                    disabled: true,
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ];
    //  角色框
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        computed: {
            //	角色操作类型 , 1 新增、2 编辑、3 查看
            roleOperationType(){
                return this.$store.state.system.roleOperationType;
            },
            //  被选中的角色的id
            selectRoleId(){
                return this.$store.state.system.selectRoleId;
            }
        },
        data(){
            return {
                treeSelectValue: ['0-0-0'],
                //  树的数据
                treeData: null,

                SHOW_PARENT,
                //  表单大小
                formItemLayout,
                //  角色名称
                roleNameDecorator: ['roleName', {
                    rules: [{
                        required: true,
                        message: '请输角色名称',
                    },]
                }],
                //  角色描述
                roleDescDecorator: ['roleDesc', {
                    rules: [{
                        required: true,
                        message: '请输角色描述',
                    },]
                }],
                //  角色描述
                roleCodeDecorator: ['roleCode', {
                    rules: [{
                        required: true,
                        message: '请输角色编码',
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
                //  如果是编辑、查看
                requestRoleGet(this.selectRoleId)
                    .then(v => {
                        const { data } = v;
                        const {
                            roleCode,
                            roleDesc,
                            roleName,
                        } = data;
                        this.form.setFieldsValue({
                            roleCode,
                            roleDesc,
                            roleName,
                        });
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
                        console.log(this.roleOperationType);
                        console.table(values);
                        (() => {
                            //	roleCode	角色编码
                            //	roleDesc	角色描述
                            //	roleName	角色名称
                            //  1 新增、2 编辑、3 查看
                            switch (this.roleOperationType) {
                                case 1:
                                    return requestRoleSave(values);
                                case 2:
                                    const data = Object.assign({ roleId: this.selectRoleId }, values);
                                    return requestRoleUpdate(data);
                                case 3:
                                    return Promise.resolve(false);
                                default :
                                    throw new Error('错误的类型');
                            }
                        })()
                            .then(v => {
                                resolve(v);
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
                });
            },
//            //  选择树变换
//            selectTreeChange(value, label, extra){
//                console.log(value);
//                //  传给store
//                this.setPermissions(value);
//            }
        }
    };
</script>