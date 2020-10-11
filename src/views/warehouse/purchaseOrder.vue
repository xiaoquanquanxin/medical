<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="searchData.purchaseOrderNumber" placeholder="请输入采购单号"/>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="shipments(sItem)">发货</a>
                    <a @click="procurementDetails(sItem)">详情</a>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-input-group">
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
        <!--发货操作莫泰框-->
        <a-modal v-model="dialogDataShipments.visible"
                 v-if="dialogDataShipments.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="发货"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="shipmentsModalCheck('refShipmentsForm')">
            <ShipmentsForm ref="refShipmentsForm"/>
        </a-modal>
        <!--查看详情莫泰框-->
        <a-modal v-model="dialogDataProcurementDetails.visible"
                 v-if="dialogDataProcurementDetails.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="查看详情"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="procurementDetailModalCheck()">
            <ShipmentsDetail/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '../../utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import ShipmentsForm from '@/components/warehouse/shipmentsForm';
    import ShipmentsDetail from '@/components/warehouse/shipmentsDetail';

    const columns = [
        {
            title: '发货单号',
            dataIndex: 'commodityName1',
            width: 100,
        },
        {
            title: '商品名称',
            dataIndex: 'commodityName',
            width: 100,
        },
        {
            title: '发货医院',
            dataIndex: '11',
            width: 100,
        },
        {
            title: '商品条码',
            dataIndex: 'barCode',
            width: 100,
        },
        {
            title: '单位',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '数量',
            dataIndex: 'count',
            width: 100,
        },
        {
            title: '单价',
            dataIndex: 'supplier',
            width: 100,
        },
        {
            title: '总金额',
            dataIndex: 'brand',
            width: 100,
        },
        {
            title: '备注',
            dataIndex: 'manufacturer',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
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

    //  商品库存列表
    export default {
        components: {
            ShipmentsForm,
            ShipmentsDetail,
        },
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

                //  发货操作
                dialogDataShipments: this.initModal(DIALOG_TYPE.SHIPMENTS),
                //  采购详情
                dialogDataProcurementDetails: this.initModal(DIALOG_TYPE.PROCUREMENT_DETAILS),
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,

            ...mapActions('warehouse', [
                //  被选中的采购订单id
                'setProcurementId',
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

            //  发货
            shipments(sItem){
                this.setProcurementId('766');
                this.showModal(DIALOG_TYPE.SHIPMENTS);
            },
            //  采购详情
            procurementDetails(sItem){
                this.setProcurementId('4323543');
                this.showModal(DIALOG_TYPE.PROCUREMENT_DETAILS);
            },
            //  确认发货
            shipmentsModalCheck(ShipmentsForm){
                const promise = this.$refs[ShipmentsForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.SHIPMENTS);
                }).catch(error => {
                    console.log('有错');
                });
            },
            //  确认详情
            procurementDetailModalCheck(){
                this.hideModal(DIALOG_TYPE.PROCUREMENT_DETAILS);
            },
        }
    };
</script>