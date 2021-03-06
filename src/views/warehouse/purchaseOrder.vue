<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.purchaseOrderCode" placeholder="请输入采购单号"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
            <br>
            <b>列表数据没id，字段对应？</b>
            <br>
            <br>
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
                    <a @click="shipments(sItem)">发货</a>
                    <a @click="procurementDetails(sItem)">详情</a>
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
        <!--发货操作莫泰框-->
        <a-modal v-model="dialogDataShipments.visible"
                 v-if="dialogDataShipments.visible"
                 :confirm-loading="dialogDataShipments.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="发货"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="shipmentsModalCheck('refShipmentsForm')">
            <ShipmentsForm ref="refShipmentsForm"
                           :operation-data="operationData"
            />
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
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import ShipmentsForm from '@/components/warehouse/shipmentsForm';
    import ShipmentsDetail from '@/components/warehouse/shipmentsDetail';
    import { requestPurchaseOrderPages } from '../../api/warehouse/purchaseOrder';

    const columns = [
        {
            title: '发货单号',
            dataIndex: 'purchaseOrderCode',
            width: 100,
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: 100,
        },
        {
            title: '发货医院',
            dataIndex: 'hospitalName',
            width: 150,
        },
        {
            title: '商品条码',
            dataIndex: 'goodsBarCode',
            width: 100,
        },
        {
            title: '单位',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '数量',
            dataIndex: 'purchaseOrderNum',
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
            dataIndex: 'remark',
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];

    //  采购订单列表
    export default {
        components: {
            ShipmentsForm,
            ShipmentsDetail,
        },
        data(){
            return {
                data: [],
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),

                //  发货操作
                dialogDataShipments: this.initModal(DIALOG_TYPE.SHIPMENTS),
                //  采购详情
                dialogDataProcurementDetails: this.initModal(DIALOG_TYPE.PROCUREMENT_DETAILS),

                //  操作对象
                operationData: null,
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestPurchaseOrderPages(Object.assign(
                    {}, this.searchData, paginationEncode(this.pagination)
                ))
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

            //  发货
            shipments(sItem){
                this.operationData = sItem;
                this.showModal(DIALOG_TYPE.SHIPMENTS);
            },
            //  确认发货
            shipmentsModalCheck(ShipmentsForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.SHIPMENTS, true);
                const promise = this.$refs[ShipmentsForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.SHIPMENTS);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.SHIPMENTS, false);
                });
            },

            //  采购详情
            procurementDetails(sItem){
                this.setProcurementId(sItem.id);
                this.showModal(DIALOG_TYPE.PROCUREMENT_DETAILS);
            },
            //  确认详情
            procurementDetailModalCheck(){
                this.hideModal(DIALOG_TYPE.PROCUREMENT_DETAILS);
            },
            //  莫泰框方法
            ...dialogMethods,

            ...mapActions('warehouse', [
                //  被选中的采购订单id
                'setProcurementId',
            ]),

            pageChange,
            onShowSizeChange,
        }
    };
</script>