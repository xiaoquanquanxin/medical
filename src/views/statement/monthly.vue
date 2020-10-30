<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-range-picker class="basic-range-picker-width"
                            :placeholder="['开始日期','结束日期']"
                            @change="onRangePickerChange"
            />
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="executeFn">
                执行月结
            </a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <!--月结执行时间-->
            <div slot="settleTimeRange" slot-scope="scope,sItem,sIndex,extra">
                {{scope.settleStarttime}}至<br> {{scope.settleEndtime}}
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space>
                    <router-link :to="{name:'monthlyDetail',params:{monthlyDetailId:sItem.id}}">详情</router-link>
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
    </div>
</template>
<script>
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import { requestSettlementPage } from '../../api/statement/monthly';
    import { onRangePickerChange } from '../../utils/monthly';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '月结日期',
            dataIndex: 'settleTime',
            width: 200,
        },
        {
            title: '月结部门',
            dataIndex: 'settleDeptname',
            width: 100,
        },
        {
            title: '操作人',
            dataIndex: 'optionName',
            width: 100,
        },
        {
            title: '月结执行时间',
            scopedSlots: { customRender: 'settleTimeRange' },
            width: 240,
        },
        {
            title: '月结总额',
            dataIndex: 'settleMoney',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    export default {
        data(){
            return {
                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {
                    settleStarttime: null,
                    settleEndtime: null,
                },
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestSettlementPage(Object.assign({},
                    { param: this.searchData },
                    paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(this.data[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },

            //  执行月结
            executeFn(){
                this.$router.push({ name: 'monthlyExecute' });
            },
            pageChange,
            onShowSizeChange,
            onRangePickerChange,
        }
    };
</script>