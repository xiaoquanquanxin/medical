<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.commodityName" placeholder="请输入报损单号"/>
            <a-input class="lengthen-input-width" v-model="searchData.itemNo" placeholder="请输入商品货号"/>
            <a-select class="basic-select-width" v-model="searchData.hospital" placeholder="请选择医院"
            >
                <a-select-option value="1600">1600</a-select-option>
                <a-select-option value="160">160</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="reportedLostClick">报损</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
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
        <!--报损莫泰框-->
        <a-modal v-model="dialogDataReportedLoss.visible"
                 v-if="dialogDataReportedLoss.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="报损"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="reportedLostModalCheck('refReportedLossForm')">
            <ReportedLossForm ref="refReportedLossForm"/>
        </a-modal>
    </div>
</template>
<script>
    import { paginationInit } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import ReportedLossForm from '@/components/warehouse/reportedLossForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';

    const columns = [
        {
            title: '报损单号',
            dataIndex: 'commodityName',
            width: 100,
        },
        {
            title: '报损商品名称',
            dataIndex: '报损商品名称',
            width: 100,
        },
        {
            title: '商品货号',
            dataIndex: '商品货号',
            width: 100,
        },
        {
            title: '报损数量',
            dataIndex: '报损数量',
            width: 100,
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodityName: `报损单号`,
            报损数量: '报损数量',
            商品货号: '商品货号',
            报损商品名称: '报损商品名称',
        });
    }

    //  报损
    export default {
        components: {
            ReportedLossForm,
        },
        data(){
            return {
                data,
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),

                //  报损操作
                dialogDataReportedLoss: this.initModal(DIALOG_TYPE.REPORTED_LOST),
            };
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            //  莫泰框方法
            ...dialogMethods,

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

            //  报损
            reportedLostClick(){

                this.showModal(DIALOG_TYPE.REPORTED_LOST);
            },

            //  确认市场价格
            reportedLostModalCheck(refReportedLossForm){
                const promise = this.$refs[refReportedLossForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.REPORTED_LOST);
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>