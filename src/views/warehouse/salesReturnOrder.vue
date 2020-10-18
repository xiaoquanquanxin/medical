<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.passOrderNumber" placeholder="请输入退货单号"/>
            <a-button class="basic-button-width" type="primary">搜索</a-button>
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
                    <a @click="pass(sItem)">通过</a>
                    <a @click="refuse(sItem)">详情</a>
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
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '退货单号',
            dataIndex: 'commodityName1',
            width: 120,
        },
        {
            title: '商品名称',
            dataIndex: 'commodityName',
            width: 120,
        },
        {
            title: '退货医院',
            dataIndex: '11',
            width: 120,
        },
        {
            title: '商品条码',
            dataIndex: 'barCode',
            width: 120,
        },
        {
            title: '单位',
            dataIndex: 'unit',
            width: 120,
        },
        {
            title: '数量',
            dataIndex: 'count',
            width: 120,
        },
        {
            title: '单价',
            dataIndex: 'supplier',
            width: 120,
        },
        {
            title: '总金额',
            dataIndex: 'brand',
            width: 120,
        },
        {
            title: '备注',
            dataIndex: 'manufacturer',
            width: 120,
        },
        {
            title: '操作',
            width: 120,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            hospital: `xx供应商`,
            city: '上海',
            status: String(i % 2),
            totalInventory: 322,
        });
    }

    //  退货订单列表
    export default {
        data(){
            return {
                data,
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,
                //  分页信息
                pagination,
            };
        },
        methods: {

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

            //  通过
            pass(sItem){
                this.$confirm({
                    title: `确定通过${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  拒绝
            refuse(sItem){
                this.$confirm({
                    title: `确定拒绝${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
        }
    };
</script>