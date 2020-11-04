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
            <!--方案类型-->
            <div slot="prescriptionType" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="sItem.prescriptionType == 1">院内配置</span>
                <span v-if="sItem.prescriptionType == 2">门诊领药</span>
            </div>
            <!--审核状态(1.待审核，2已审核，3已驳回)-->
            <div slot="auditStatus" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="sItem.auditStatus == 1">待审核</span>
                <span v-if="sItem.auditStatus == 2">已审核</span>
                <span v-if="sItem.auditStatus == 3">已驳回</span>
            </div>
            <!--支付状态((1.待签收，2，待配置，3.已配置，4，待领取，5，已领取))-->
            <div slot="orderStatus" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="sItem.orderStatus == 1">待签收</span>
                <span v-if="sItem.orderStatus == 2">待配置</span>
                <span v-if="sItem.orderStatus == 3">已配置</span>
                <span v-if="sItem.orderStatus == 4">待领取</span>
                <span v-if="sItem.orderStatus == 5">已领取</span>
            </div>
            <!--支付状态(0待支付,1已支付)-->
            <div slot="payStatus" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="sItem.payStatus == 0">待支付</span>
                <span v-if="sItem.payStatus == 1">已支付</span>
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <router-link :to="{name:'interventionDetail',params:{detailId:sItem.id}}">详情</router-link>
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
    import { threeRowSearch } from '@/utils/tableScroll';
    import { requestPrescriptionPage } from '../../../api/userList/intervention';
    import { noPaginationData } from '../../../utils/pagination';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '方案名称',
            dataIndex: 'prescriptionName',
            width: 200,
        },
        {
            title: '方案周期（天）',
            dataIndex: 'protein',
            width: 150,
        },
        {
            title: '生成时间',
            dataIndex: 'orderTime',
            width: 200,
        },
        {
            title: '营养师',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '方案类型',
            scopedSlots: { customRender: 'prescriptionType' },
            width: 100,
        },
        {
            title: '状态',
            scopedSlots: { customRender: 'auditStatus' },
            width: 100,
        },
        {
            title: '支付状态',
            dataIndex: 'payStatus',
            scopedSlots: { customRender: 'payStatus' },
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
                //  病人的id
                patientId: this.$route.params.patientId,

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
                requestPrescriptionPage(Object.assign({
                    param: Object.assign({ patientId: this.patientId }, this.searchData)
                }, noPaginationData))
                    .then(v => {
                        const { data } = v;
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                    });
            },
               onShowSizeChange,
            pageChange,
            //  选择日期范围
            onRangePickerChange(value, selectDateValue){
                console.log(selectDateValue);
                this.searchData.startTime = selectDateValue[0];
                this.searchData.endTime = selectDateValue[1];
            },
        }
    };
</script>