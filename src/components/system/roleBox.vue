<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="角色名称">
            <a-input v-decorator="roleNameDecorator" placeholder="请输入角色名称"/>
        </a-form-item>
        <a-form-item label="角色描述">
            <a-input v-decorator="roleDescriptionDecorator" placeholder="请输入角色描述"/>
        </a-form-item>
        <a-form-item label="权限">
            <a-tree-select
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
                    initialValue: '角色名称',
                    rules: [{
                        required: true,
                        message: '请输角色名称',
                    },]
                }],
                //  角色描述
                roleDescriptionDecorator: ['roleDescription', {
                    initialValue: '角色描述',
                    rules: [{
                        required: true,
                        message: '请输角色描述',
                    },]
                }],
            };
        },
        mounted(){
            console.log(this.roleOperationType);
            console.log(this.selectRoleId);
            setTimeout(() => {
                this.treeData = treeData;
            }, 333);
        },
        methods: {
            //    表单提交
            handleSubmit(){
                console.log(this.treeSelectValue)
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
//            //  选择树变换
//            selectTreeChange(value, label, extra){
//                console.log(value);
//                //  传给store
//                this.setPermissions(value);
//            }
        }
    };
</script>