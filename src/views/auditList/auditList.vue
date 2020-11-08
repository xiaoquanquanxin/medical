<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.prescriptionCode" placeholder="请输入处方条码"/>
            <a-date-picker
                    class="lengthen-select-width"
                    placeholder="请选择开具日期"
                    :default-value="moment(new Date())"
                    @change="onDatePickerChangeFn"
            />
            <!--审核状态(1.待审核，2，已审核，3，已驳回)-->
            <a-select v-model="searchData.auditStatus" class="basic-select-width" placeholder="请选择状态">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option value="1">待审核</a-select-option>
                <a-select-option value="2">已审核</a-select-option>
                <a-select-option value="3">已驳回</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
            <b>搜索条件没区分</b>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <!--性别-->
            <div slot="sex" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="scope.sex == 1">男</span>
                <span v-if="scope.sex == 0">女</span>
            </div>
            <!--状态-->
            <!--审核状态auditStatus(1.待审核，2，已审核，3，已驳回)-->
            <div slot="auditStatus" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="scope.auditStatus == 1">待审核</span>
                <span v-if="scope.auditStatus == 2">已审核</span>
                <span v-if="scope.auditStatus == 3">已驳回</span>
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <router-link :to="{name:'auditDetail',params:{detailId:sItem.id}}">详情</router-link>
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
    import moment from 'moment';
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import { requestPrescriptionAuditPage } from '../../api/auditList';
    import { requestDeptList } from '../../api/department';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '处方名称',
            dataIndex: 'prescriptionName',
            width: 200,
        },
        {
            title: '处方医生',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '开具时间',
            dataIndex: 'orderTime',
            width: 200,
        },
        {
            title: '科室',
            dataIndex: 'deptName',
            width: 100,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '性别',
            scopedSlots: { customRender: 'sex' },
            width: 100,
        },
        {
            title: '年龄',
            dataIndex: 'birth',
            width: 100,
        },
        {
            title: '状态',
            scopedSlots: { customRender: 'auditStatus' },
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
                deptList: [],
                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
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
                requestPrescriptionAuditPage(Object.assign({},
                    { param: this.searchData },
                    paginationEncode(this.pagination)
                ))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                        });
                        this.data = data.records;
                        console.log(data.records);
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  选择开具日期
            onDatePickerChangeFn(value, orderTime){
                console.log(orderTime);
                this.searchData.orderTime = orderTime;
            },
            onShowSizeChange,
            pageChange,
            moment,
        }
    };
</script>