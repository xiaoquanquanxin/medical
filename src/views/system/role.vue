<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName"
                     placeholder="请输入角色名称"/>
            <a-button type="primary">
                搜索
            </a-button>
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
                    <a @click="editRoleFn(sItem)">编辑</a>
                    <a @click="deleteRoleFn(sItem)">删除</a>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-pagination">
            <a-pagination
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
        <!--莫泰框-->
        <a-modal v-model="dialogDataRole.visible"
                 v-if="dialogDataRole.visible"
                 :confirm-loading="dialogDataRole.confirmLoading"
                 :title="dialogDataRole.title"
                 :maskClosable="false"
                 :centered="true"
                 :width="800"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="roleBoxModalCheck('refRoleBox')">
            <RoleBox ref="refRoleBox"/>
        </a-modal>
    </div>
</template>
<script>
    import RoleBox from '@/components/system/roleBox.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '@/utils/tableScroll';
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'hospital',
            width: 100,
        },
        {
            title: '角色描述',
            dataIndex: 'city',
            width: 100,
        },
        {
            title: '创建时间',
            dataIndex: 'status',
            width: 100,
        },
        {
            title: '创建人',
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: '角色',
            dataIndex: 'icon1',
            width: 100,
            scopedSlots: { customRender: 'permissions' },
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            hospital: `xx医院`,
            city: '上海',
            status: String(i % 2),
            icon: '医院图标',

        });
    }
    export default {
        components: {
            RoleBox,
        },
        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,
                //  分页信息
                pagination,
                //  搜索数据
                searchData: {},

                //  新增、编辑、查看角色
                dialogDataRole: this.initModal(DIALOG_TYPE.ROLE),
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
            //  渠道商store
            ...mapActions('system', [
                'setSelectRoleId',
                'setRoleOperationType',
            ]),

            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
                this.pagination.pageSize = pageSize;
            },
            //  切换分页页码
            pageChange(current, pageSize){
                console.log(current);
                console.log(pageSize);
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
                this.setSelectRoleId(2323);
                this.setRoleOperationType(2);
                this.setDialogTitle(DIALOG_TYPE.ROLE, '编辑角色');
                this.showModal(DIALOG_TYPE.ROLE);
            },
            //  查看角色
            toViewRoleFn(sItem){
                this.setSelectRoleId(444);
                this.setRoleOperationType(3);
                this.setDialogTitle(DIALOG_TYPE.ROLE, '查看角色');
                this.showModal(DIALOG_TYPE.ROLE);
            },
            //  检查莫泰框的值
            roleBoxModalCheck(refRoleBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ROLE, true);
                const promise = this.$refs[refRoleBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ROLE);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ROLE, false);
                });
            },
            //  删除角色
            deleteRoleFn(sItem){
                this.$confirm({
                    title: `确定删除${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },

        }
    };
</script>