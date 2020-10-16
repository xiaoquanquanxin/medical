<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input default-value="" placeholder="请输入渠道商名称"/>
                </a-col>
                <a-col :span="5">
                    <a-input default-value="" placeholder="请输入渠道商代码"/>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-col :span="5">
                <a-button type="primary" @click="addDistributors">
                    新增渠道商
                </a-button>
            </a-col>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div
                    slot="a-switch"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a-switch checked-children="开" un-checked-children="关"
                          :default-checked="!!sIndex"
                          @change="aSwitchChange(sItem,$event)"
                />
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editDistributors(sItem)">编辑</a>
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
    import { pagination } from '@/utils/pagination.ts';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { towRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '渠道商名称',
            dataIndex: 'hospital',
            width: 120,
        },
        {
            title: '渠道商代码',
            dataIndex: 'city',
            width: 120,
        },
        {
            title: '渠道商地区',
            dataIndex: 'area',
            width: 120,
        },
        {
            title: '添加人',
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: '添加时间',
            dataIndex: 'time',
            width: 120,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            scopedSlots: { customRender: 'a-switch' },
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
            hospital: `xx渠道商`,
            city: '上海',
            status: String(i % 2),
            icon: '添加人',
            area: '地区',
            time: '2020-10-10'
        });
    }
    //  渠道商管理
    export default {
        components: {
            AddOrEditDistributors,
        },
        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,
                //  分页信息
                pagination,
                //  新增、编辑渠道商
                dialogDataDistributors: this.initModal(DIALOG_TYPE.DISTRIBUTORS),
            };
        },

        methods: {
            //  莫泰框方法
            ...dialogMethods,
            //  渠道商store
            ...mapActions('distributors', [
                'setChannelId',
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

            //  切换状态
            aSwitchChange(sItem, sIndex, checked){
                console.log(sItem, sIndex, checked);
            },

            //  新增渠道商
            addDistributors(){
                this.setChannelId(0);
                this.setDialogTitle(DIALOG_TYPE.DISTRIBUTORS, '新增渠道商');
                this.showModal(DIALOG_TYPE.DISTRIBUTORS);
            },

            //  编辑渠道商
            editDistributors(sItem){
                this.setChannelId(1234567890987654);
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