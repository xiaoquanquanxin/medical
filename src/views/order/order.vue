<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.orderNumber" placeholder="请输入订单号"/>
            <a-input class="basic-input-width" v-model="searchData.prescriptionsNumber" placeholder="请输入处方单号"/>
            <a-input class="basic-input-width" v-model="searchData.patientName" placeholder="请输入患者姓名"/>
            <a-select class="lengthen-select-width" v-model="searchData.status" placeholder="请选择支付状态">
                <a-select-option value="1600">1600</a-select-option>
                <a-select-option value="160">160</a-select-option>
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
                <a-space size="small">
                    <router-link :to="{name:'orderDetail',params:{orderDetailId:'322323'}}">详情</router-link>
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
    import { paginationInit, paginationDecode, paginationEncode } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '订单号',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '处方单号',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '医院名称',
            dataIndex: 'bbb',
            width: 100,
        },
        {
            title: '处方医生',
            dataIndex: 'ccc',
            width: 100,
        },
        {
            title: '缴费金额',
            dataIndex: 'coun',
            width: 100,
        },
        {
            title: '支付状态',
            dataIndex: 'dddd',
            width: 100,
        }, {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' }
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: '许晓飞',
            sex: 1,
            familyGroup: 'xxx',
            aaa: '处方单号',
            bbb: '医院名称',
            ccc: '处方医生',
            coun: '缴费金额',
            dddd: '支付状态',

        });
    }
    //  订单管理
    export default {
        data(){
            return {
                data,
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
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
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
        }
    };
</script>