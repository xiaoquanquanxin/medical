<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-select v-model="searchData.prescriptionType" class="lengthen-select-width" placeholder="请选择方案类型">
                <a-select-option value="1">待签收</a-select-option>
                <a-select-option value="2">待配置</a-select-option>
                <a-select-option value="3">已配置</a-select-option>
                <a-select-option value="4">待领取</a-select-option>
                <a-select-option value="5">已领取</a-select-option>
            </a-select>
            <a-select v-model="searchData.auditStatus" class="lengthen-select-width" placeholder="请选择审核状态">
                <a-select-option value="1">待审核</a-select-option>
                <a-select-option value="2">已审核</a-select-option>
                <a-select-option value="3">已驳回</a-select-option>
            </a-select>
            <a-select v-model="searchData.payStatus" class="lengthen-select-width" placeholder="请选择付款状态">
                <a-select-option value="0">待支付</a-select-option>
                <a-select-option value="1">已支付</a-select-option>
            </a-select>
            <a-range-picker
                    class="basic-range-picker-width"
                    :placeholder="['开始日期','结束日期']"
                    @change="onRangePickerChange"
            />
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addIntervention'}">
                <a-button type="primary">新增</a-button>
            </router-link>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <router-link :to="{name:'interventionDetail',params:{interventionDetailId:sIndex}}">详情</router-link>
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
    import { paginationInit, paginationDecode, paginationEncode } from '@/utils/pagination.ts';
    import { threeRowSearch } from '@/utils/tableScroll';
    import { requestPrescriptionPage } from '../../../api/userList/intervention';
    import { noPaginationData } from '../../../utils/pagination';

    const columns = [
        {
            title: '序号',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '处方名称',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '处方医生',
            dataIndex: '通用名',
            width: 100,
        },
        {
            title: '开具时间',
            dataIndex: '商品分类',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '姓名',
            dataIndex: 'specifications',
            width: 100,
        },
        {
            title: '性别',
            dataIndex: 'marketPrice',
            width: 100,
        },
        {
            title: '年龄',
            dataIndex: 'manufacturer',
            width: 100,
        },
        {
            title: '状态',
            dataIndex: 'update',
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];

    export default {
        data(){
            return {
                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: threeRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {},
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPrescriptionPage(Object.assign({}, {
                    param: this.searchData,
                }, noPaginationData))
                    .then(v => {
                        const { data } = v;
                        console.log(data.records);
                        this.data = data.records;
                    });
            },
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
            //  选择日期范围
            onRangePickerChange(value, selectDateValue){
                console.log(selectDateValue);
                this.searchData.startTime = selectDateValue[0];
                this.searchData.endTime = selectDateValue[1];
            },
        }
    };
</script>