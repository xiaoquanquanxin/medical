<template>
    <div class="layout-content-inner-main">
        <div v-if="true">
            <!--搜索相关-->
            <div class="a-input-group">
                <a-input class="basic-input-width" v-model="searchData.prescriptionCode" placeholder="请输入处方号"/>
                <a-input class="basic-input-width" v-model="searchData.name" placeholder="请输入患者姓名"/>
                <a-select class="lengthen-select-width" v-model="searchData.payStatus" placeholder="请选择支付状态">
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option value="0">待支付</a-select-option>
                    <a-select-option value="1">已支付</a-select-option>
                </a-select>
                <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
            </div>
            <!--表格-->
            <a-table
                    :columns="columns"
                    :data-source="data"
                    :scroll="scroll"
                    :pagination="false"
            >
                <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                    <router-link :to="{name:'costDetail',params:{detailId:sItem.id}}">详情</router-link>
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
    import { requestBillingsBillingPage } from '../../api/cost/costList';

    const columns = [

        {
            title: '处方号',
            dataIndex: 'prescriptionCode',
            width: 200,
        },
        {
            title: '患者姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'deptName',
            width: 100,
        },
        {
            title: '床号',
            dataIndex: 'bedCode',
            width: 100,
        },
        {
            title: '退费金额',
            dataIndex: 'xxx',
            width: 100,
        },
        {
            title: '收费时间',
            dataIndex: 'orderTime',
            width: 150,
        },
        {
            title: '收费人',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '操作',
            width: 200,
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
                    //  缴费方式（0缴费，1退款）
                    isRefund: 1,
                },

                //  选择日期的值的对象
                selectDateMoment: null,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestBillingsBillingPage(Object.assign({},
                    this.searchData,
                    paginationEncode(this.pagination))
                )
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            onShowSizeChange,
            pageChange,
        }
    };
</script>
<style scoped>
</style>