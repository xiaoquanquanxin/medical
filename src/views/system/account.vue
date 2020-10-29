<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName"
                     placeholder="请输入账号名称"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="addAccountFn()">新建账号</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editAccountFn(sItem)">编辑</a>
                    <a @click="deleteAccountFn(sItem)">删除</a>
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
        <!--新增账号莫泰框-->
        <a-modal v-model="dialogAccount.visible"
                 v-if="dialogAccount.visible"
                 :confirm-loading="dialogAccount.confirmLoading"
                 :title="dialogAccount.title"
                 :maskClosable="false"
                 :centered="true"
                 :width="800"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="accountBoxModalCheck('AccountBox')">
            <AccountBox ref="AccountBox"/>
        </a-modal>
    </div>
</template>
<script>
    import AccountBox from '@/components/system/accountBox.vue';
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
    import { requestUserPage } from '../../api/system/account';

    const columns = [
        {
            title: '账号名称',
            dataIndex: 'hospital',
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
            dataIndex: 'role',
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];

    export default {
        components: {
            AccountBox,
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

                //  新增、编辑、查看账号
                dialogAccount: this.initModal(DIALOG_TYPE.ACCOUNT),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestUserPage(paginationEncode(this.pagination))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            //  渠道商store
            ...mapActions('system', [
                'setSelectAccountId',
                'setAccountOperationType',
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
            //  新增账号
            addAccountFn(){
                this.setSelectAccountId(0);
                this.setAccountOperationType(1);
                this.setDialogTitle(DIALOG_TYPE.ACCOUNT, '新增账号');
                this.showModal(DIALOG_TYPE.ACCOUNT);
            },
            //  编辑账号
            editAccountFn(sItem){
                this.setSelectAccountId(sItem.id);
                this.setAccountOperationType(2);
                this.setDialogTitle(DIALOG_TYPE.ACCOUNT, '编辑账号');
                this.showModal(DIALOG_TYPE.ACCOUNT);
            },
            //  检查莫泰框的值
            accountBoxModalCheck(refAccountBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.ACCOUNT, true);
                const promise = this.$refs[refAccountBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.ACCOUNT);
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.ACCOUNT, false);
                });
            },
            //  删除账号
            deleteAccountFn(sItem){
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