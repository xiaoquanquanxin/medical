<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.orderCode" placeholder="请输入订单号"/>
            <a-input class="basic-input-width" v-model="searchData.prescriptionCode" placeholder="请输入处方单号"/>
            <a-input class="basic-input-width" v-model="searchData.patientName" placeholder="请输入患者姓名"/>
            <a-select class="lengthen-select-width" v-model="searchData.payStatus" placeholder="请选择支付状态">
                <a-select-option value="0">待支付</a-select-option>
                <a-select-option value="1">已支付</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <br>
        <b>配置任务那里，订单号 === 处方单号，这里呢？</b>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <router-link :to="{name:'orderDetail',params:{orderDetailId:sItem.id}}">详情</router-link>
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
    import { requestOrderPage } from '../../api/order/order';

    const columns = [
        {
            title: '订单号',
            dataIndex: 'orderCode',
            width: 200,
        },
        {
            title: '处方单号',
            dataIndex: 'prescriptionCode',
            width: 200,
        },
        {
            title: '医院名称',
            dataIndex: 'hospitalName',
            width: 100,
        },
        {
            title: '处方医生',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '缴费金额',
            dataIndex: 'amountPaid',
            width: 100,
        },
        {
            title: '支付状态',
            dataIndex: 'payStatus',
            width: 100,
        }, {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' }
        },
    ];
    //  订单管理
    export default {
        data(){
            return {
                data: [],
                columns,
                //  搜索数据
                searchData: {},//  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),//  分页信息
                pagination: paginationInit(),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestOrderPage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(this.data[0])));
                    });
            },
            onShowSizeChange,
            pageChange,
        }
    };
</script>