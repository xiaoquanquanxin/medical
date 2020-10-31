<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
            style="min-height: 500px;"
    >
        <a-form-item label="权限">
            <a-tree :checkedKeys="treeSelectValue"
                    v-model="treeSelectValue"
                    :checkable="true"
                    :tree-data="treeData"
                    :autoExpandParent="true"
                    @check="checkFn"
            />
            <!--            <a-tree-select-->
            <!--                    class="add-form-input"-->
            <!--                    v-if="treeData"-->
            <!--                    v-model="treeSelectValue"-->
            <!--                    style="width: 100%"-->
            <!--                    :disabled="!treeData"-->
            <!--                    :tree-data="treeData"-->
            <!--                    :treeDefaultExpandAll="true"-->
            <!--                    tree-checkable-->
            <!--                    :show-checked-strategy="SHOW_PARENT"-->
            <!--                    search-placeholder="Please select"-->
            <!--            />-->
            <!--            @change="selectTreeChange"-->
        </a-form-item>
    </a-form>
</template>
<script>
    import { TreeSelect } from 'ant-design-vue';
    import { formItemLayout } from '@/utils/layout.ts';
    import {
        requestRoleRoleMenuUpdate,
    } from '../../api/system/role';
    import { requestMenuAllTree } from '../../api/system/menu';

    const SHOW_PARENT = TreeSelect.SHOW_PARENT;

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
            selectRoleItem(){
                return this.$store.state.system.selectRoleItem;
            }
        },
        data(){
            return {
                //  勾选的
                treeSelectValue: [],
                //  展开的
                expandedKeys: [],
                //  树的数据
                treeData: null,

                SHOW_PARENT,
                //  表单大小
                formItemLayout,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            searchFn(){
                console.log(JSON.parse(JSON.stringify(this.selectRoleItem)));
                //  todo    报错
//                requestRoleFindMenuByRole(this.selectRoleItem.roleId)
//                    .then(v => {
//                        console.log(v);
//                    });
                requestMenuAllTree()
                    .then(data => {
                        this.treeData = data;
                        console.log(JSON.parse(JSON.stringify(data)));
                        this.$nextTick(() => {
                            this.treeSelectValue = [...this.selectRoleItem.treeSelectValue].map(String);
                            console.log(this.treeSelectValue);
                        });
                    });
            },
            //    表单提交
            handleSubmit(){
                console.log(this.treeSelectValue);
                const data = {
                    menuIds: [...this.treeSelectValue.map(Number), 232],
                    roleId: this.selectRoleItem.roleId
                };
                //  console.log(data);
//                return Promise.reject();
                return requestRoleRoleMenuUpdate(data)
                    .then(v => {
                        console.log(v);
                    });
            },
            checkFn(e){
                console.log(e);
            }
        }
    };
</script>