<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName"
                     placeholder="请输入角色名称"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="addRoleFn()">
                新建角色
            </a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div
                    slot="permissions"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a @click="toViewRoleFn(sItem)">查看</a>
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="authFn(sItem)">权限</a>
                    <a @click="editRoleFn(sItem)">编辑</a>
                    <a @click="deleteRoleFn(sItem)">删除</a>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-pagination">
            <a-pagination
                    v-if="pagination.total"
                    v-model="pagination.current"
                    :page-size-options="pagination.pageSizeOptions"
                    :total="pagination.total"
                    show-size-changer
                    :page-size="pagination.pageSize"
                    @showSizeChange="onShowSizeChange"
                    @change="pageChange"
            >
                <template slot="buildOptionText" slot-scope="props">
                    <span>{{ props.value }}条/页</span>
                </template>
            </a-pagination>
        </a-row>
        <!--莫泰框新增、编辑-->
        <a-modal v-model="dialogRole.visible"
                 v-if="dialogRole.visible"
                 :confirm-loading="dialogRole.confirmLoading"
                 :title="dialogRole.title"
                 :maskClosable="false"
                 :centered="true"
                 :width="800"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="roleBoxModalCheck('refRoleBox')">
            <RoleBox ref="refRoleBox"/>
        </a-modal>
        <!--权限莫泰框-->
        <a-modal v-model="dialogAuthority.visible"
                 v-if="dialogAuthority.visible"
                 :confirm-loading="dialogAuthority.confirmLoading"
                 :title="dialogAuthority.title"
                 :maskClosable="false"
                 :centered="true"
                 :width="800"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="authBoxModalCheck('refAuthBox')">
            <AuthBox ref="refAuthBox"/>
        </a-modal>
    </div>
</template>
<script>
    import RoleBox from '@/components/system/roleBox.vue';
    import AuthBox from '@/components/system/authBox.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { mapGetters, mapActions } from 'vuex';
    import { requestMenuRoleTree, requestRoleDelete, requestRolePage } from '../../api/system/role';
    import { requestPrescriptionConfigConfirmSave } from '../../api/task/configuration';

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'roleName',
            width: 150,
        },
        {
            title: '角色描述',
            dataIndex: 'roleDesc',
            width: 250,
        },
//        {
//            title: '创建时间',
//            dataIndex: 'createTime',
//            width: 120,
//        },
//        {
//            title: '创建人',
//            dataIndex: 'icon',
//            width: 100,
//        },
        {
            title: '角色',
            width: 100,
            scopedSlots: { customRender: 'permissions' },
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 200,
        },
    ];
    export default {
        components: {
            RoleBox,
            AuthBox,
        },
        data(){
            return {
                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {},

                //  新增、编辑、查看角色
                dialogRole: this.initModal(DIALOG_TYPE.ROLE),
                dialogAuthority: this.initModal(DIALOG_TYPE.ROLE_AUTHORITY),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestRolePage(paginationEncode(this.pagination))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.createTime = item.createTime.substr(0, 10);
                        });
                        this.data = data.records;
                        //  console.log(JSON.parse(JSON.stringify(data.records[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            //  渠道商store
            ...mapActions('system', [
                'setSelectRoleId',
                'setSelectRoleItem',
                'setRoleOperationType',
            ]),

            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                this.pagination.pageSize = pageSize;
                this.pagination.current = 1;
                this.searchFn();
            },
            //  切换分页页码
            pageChange(current){
                this.pagination.current = current;
                this.searchFn();
            },
            //  新增角色
            addRoleFn(){
                this.setSelectRoleId(0);
                this.setRoleOperationType(1);
                this.setDialogTitle(DIALOG_TYPE.ROLE, '新增角色');
                this.showModal(DIALOG_TYPE.ROLE);
            },
            //  编辑角色
            editRoleFn(sItem){
                this.setSelectRoleId(sItem.roleId);
                this.setRoleOperationType(2);
                this.setDialogTitle(DIALOG_TYPE.ROLE, '编辑角色');
                this.showModal(DIALOG_TYPE.ROLE);
            },
            //  查看角色
            toViewRoleFn(sItem){
                this.setSelectRoleId(sItem.roleId);
                this.setRoleOperationType(3);
                this.setDialogTitle(DIALOG_TYPE.ROLE, '查看角色');
                this.showModal(DIALOG_TYPE.ROLE);
            },
            //  检查莫泰框的值
            roleBoxModalCheck(refRoleBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ROLE, true);
                const promise = this.$refs[refRoleBox].handleSubmit();
                promise.then(needUpdate => {
                    this.hideModal(DIALOG_TYPE.ROLE);
                    if (!needUpdate) {
                        return;
                    }
                    this.$message.success('操作成功');
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ROLE, false);
                });
            },
            //  删除角色
            deleteRoleFn(sItem){
                //    console.log(JSON.parse(JSON.stringify(sItem)));
                this.$confirm({
                    title: `确定删除${sItem.roleName}`,
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        return requestRoleDelete(sItem.roleId)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.searchFn();
                            })
                            .catch(err => {
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },

            //  权限
            authFn(sItem){
                requestMenuRoleTree(sItem.roleCode)
                    .then(v => {
                        const data = v.data || [];
                        const RoleItem = Object.assign({}, sItem, { treeSelectValue: data });
                        this.setSelectRoleItem(RoleItem);
                        this.setDialogTitle(DIALOG_TYPE.ROLE_AUTHORITY, '编辑权限');
                        this.showModal(DIALOG_TYPE.ROLE_AUTHORITY);
                    });
            },
            //  权限确认莫泰框
            authBoxModalCheck(refAuthBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ROLE_AUTHORITY, true);
                const promise = this.$refs[refAuthBox].handleSubmit();
                promise.then(needUpdate => {
                    this.hideModal(DIALOG_TYPE.ROLE_AUTHORITY);
                    if (!needUpdate) {
                        return;
                    }
                    this.$message.success('操作成功');
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ROLE_AUTHORITY, false);
                });
            },
        }
    };
</script>