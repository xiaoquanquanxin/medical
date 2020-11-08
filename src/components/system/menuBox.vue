<template>
    <a-form class="form"
            :form="form"
            v-bind="formItemLayout"
            @submit="handleSubmit"
            autocomplete="off"
    >
        <a-form-item label="上级菜单" required>
            <div v-if="openData.parentName">
                {{openData.parentName}}
            </div>
            <div v-else>
                <a-tree-select
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                        class="add-form-input"
                        v-if="treeData"
                        v-model="treeSelectValue"
                        :disabled="!treeData"
                        :tree-data="treeData"
                        :tree-default-expand-all="false"
                        :show-checked-strategy="SHOW_PARENT"
                        search-placeholder="Please select"
                />
            </div>
        </a-form-item>
        <a-form-item label="菜单名称">
            <a-input class="add-form-input"
                     v-decorator="nameDecorator"
                     placeholder="请输入菜单名称"/>
        </a-form-item>
        <a-form-item label="菜单类型">
            <a-select v-decorator="typeDecorator"
                      class="add-form-input"
                      placeholder="请选择菜单类型"
            >
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option :value="0">左菜单</a-select-option>
                <a-select-option :value="1">按钮</a-select-option>
                <!--                <a-select-option :value="2">顶菜单</a-select-option>-->
            </a-select>
        </a-form-item>
        <a-form-item label="菜单唯一键">
            <a-input class="add-form-input"
                     v-decorator="pathDecorator"
                     placeholder="菜单唯一键"/>
        </a-form-item>
    </a-form>
</template>
<script>
    import { TreeSelect } from 'ant-design-vue';
    import { formItemLayout } from '@/utils/layout.ts';
    import { requestRoleGet, requestRoleSave } from '../../api/system/role';
    import { requestMenuAllTree, requestMenuInsert, requestMenuUpdate } from '../../api/system/menu';

    const SHOW_PARENT = TreeSelect.SHOW_PARENT;

    //  菜单框
    export default {
        beforeCreate(){
            this.form = this.$form.createForm(this);
        },
        props: ['openData'],
        data(){
            return {
                treeSelectValue: [],
                //  树的数据
                treeData: null,
                SHOW_PARENT,
                //  表单大小
                formItemLayout,

                //  菜单名称
                nameDecorator: ['name', {
                    rules: [{
                        required: true,
                        message: '请输入活动小结'
                    },]
                }],
                //  菜单类型
                typeDecorator: ['type', {
                    initialValue: 0,
                    rules: [{
                        required: true,
                        message: '请输菜单类型',
                    },]
                }],
                //  菜单唯一键
                pathDecorator: ['path', {
                    rules: [{
                        required: true,
                        message: '请输入菜单唯一键',
                    },]
                }],
            };
        },
        created(){
            requestMenuAllTree()
                .then(data => {
                    this.treeData = data;
                    this.searchFn();
                });
        },
        methods: {
            searchFn(){
                console.log(JSON.parse(JSON.stringify(this.openData)));
                const {
                    parentName,
                    parentId,
                    operationType,
                    name,
                    path,
                    type,
                } = this.openData;
                //  编辑
                if (operationType === 2) {
                    this.form.setFieldsValue({
                        name,
                        type,
                        path,
                    });
                    console.log(parentId);
                    this.treeSelectValue = [parentId];
                }
            },
            //    表单提交
            handleSubmit(){
                return new Promise((resolve, reject) => {
                    this.form.validateFields((err, values) => {
                        if (err) {
                            reject();
                            return;
                        }
                        const data = Object.assign({}, this.openData, values);
                        let treeSelectValue = this.treeSelectValue;
                        if (this.treeSelectValue && this.treeSelectValue.length === 0) {
                            treeSelectValue = -1;
                        }
                        data.parentId = data.parentId || treeSelectValue || -1;
                        console.log(data);
                        //  return resolve();
                        (() => {
                            //  1 新增、2 编辑
                            switch (this.openData.operationType) {
                                case 1:
                                    //  新增
                                    return requestMenuInsert(data);
                                case 2:
                                    //  编辑
                                    return requestMenuUpdate(data);
                                default :
                                    throw new Error('错误的类型');
                            }
                        })()
                            .then(v => {
                                resolve();
                            })
                            .catch(err => {
                                console.log(err);
                                reject();
                            });
                    });
                });
            },
        }
    };
</script>