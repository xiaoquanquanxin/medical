<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.channelBusinessName" placeholder="请输入渠道商名称"/>
            <a-input class="lengthen-input-width" v-model="searchData.channelBusinessNumber" placeholder="请输入渠道商代码"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="addDistributors">
                新增渠道商
            </a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="area" slot-scope="scope,sItem,sIndex,extra">
                {{scope.province}}-{{scope.city}}
            </div>
            <!--状态选项-->
            <div slot="a-switch"
                 slot-scope="scope,sItem,sIndex,extra"
            >
<!--                :default-checked="!!sItem.status"-->
                <a-switch checked-children="开" un-checked-children="关"
                          v-model="sItem.statusBooleanFormat"
                          @change="aSwitchChange(sItem,$event)"
                />
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editDistributors(sItem)">编辑</a>
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
        <!--莫泰框-->
        <a-modal v-model="dialogDataDistributors.visible"
                 v-if="dialogDataDistributors.visible"
                 :confirm-loading="dialogDataDistributors.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 :title="dialogDataDistributors.title"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck('refAddOrEditDistributors')">
            <AddOrEditDistributors ref="refAddOrEditDistributors"/>
        </a-modal>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    //  新增或编辑渠道商
    import AddOrEditDistributors from '@/components/addOrEditDistributors.vue';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { requestChannelBusinessChangeStatus, requestChannelBusinessPage } from '../../api/distributors';

    const columns = [
        {
            title: '渠道商名称',
            dataIndex: 'channelBusinessName',
            width: 120,
        },
        {
            title: '渠道商代码',
            dataIndex: 'channelBusinessNumber',
            width: 120,
        },
        {
            title: '渠道商地区',
            width: 120,
            dataIndex: 'region',
            //  scopedSlots: { customRender: 'area' },
        },
        {
            title: '状态',
            scopedSlots: { customRender: 'a-switch' },
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];

    //  渠道商管理
    export default {
        components: {
            AddOrEditDistributors,
        },
        data(){
            return {
                //  搜索相关
                searchData: {},

                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  新增、编辑渠道商
                dialogDataDistributors: this.initModal(DIALOG_TYPE.DISTRIBUTORS),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestChannelBusinessPage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            //  状态需要布尔值
                            item.statusBooleanFormat = item.status === 0;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(data.records[2])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            //  渠道商store
            ...mapActions('distributors', [
                'setChannelId',
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

            //  切换状态
            aSwitchChange(sItem, checked){
                requestChannelBusinessChangeStatus(sItem.id)
                    .then(v => {
                        this.$message.success('操作成功');
                        this.searchFn();
                    })
                    .catch(err => {
                        sItem.statusBooleanFormat = !checked;
                        this.$message.error('操作失败');
                    });
            },

            //  新增渠道商
            addDistributors(){
                this.setChannelId(0);
                this.setDialogTitle(DIALOG_TYPE.DISTRIBUTORS, '新增渠道商');
                this.showModal(DIALOG_TYPE.DISTRIBUTORS);
            },

            //  编辑渠道商
            editDistributors(sItem){
                this.setChannelId(sItem.id);
                this.setDialogTitle(DIALOG_TYPE.DISTRIBUTORS, '编辑渠道商');
                this.showModal(DIALOG_TYPE.DISTRIBUTORS);
            },
            //  检查莫泰框的值
            modalCheck(refAddOrEditDistributors){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.DISTRIBUTORS, true);
                const promise = this.$refs[refAddOrEditDistributors].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.DISTRIBUTORS);
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.DISTRIBUTORS, false);
                });
            },
        },
    };
</script>