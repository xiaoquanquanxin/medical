<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.purchaseOrderCode" placeholder="请输入采购单号"/>
            <a-select class="basic-select-width" v-model="searchData.status" placeholder="请选择状态">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option value="全部">全部</a-select-option>
                <a-select-option value="待发货">待发货</a-select-option>
                <a-select-option value="待签收">待签收</a-select-option>
                <a-select-option value="已签收">已签收</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="insertFn">新增</a-button>
        </div>
        <br>
        <b>这个【请选择状态】具体的对应关系0:xx，1：xxx?</b>
        <br>
        <b>列表返回需要采购单位吧？</b>
        <br>
        <b>医院采购订单 和 采购单都是一个详情接口？/api/purchaseOrder/get</b>
        <br>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="remindDelivery(sItem)">提醒发货</a>
                    <a @click="determineSign(sItem)">确定签收</a>
                    <a @click="deliveryRecordDetails(sItem)">发货详情</a>
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
        <!--出库莫泰框-->
        <a-modal v-model="dialogDataDetermineSign.visible"
                 v-if="dialogDataDetermineSign.visible"
                 :confirm-loading="dialogDataDetermineSign.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="确认签收"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="remindDeliveryModalCheck('refDetermine')">
            <DetermineSign ref="refDetermine"/>
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
        <!--查看详情莫泰框-->
        <a-modal v-model="dialogInsert.visible"
                 v-if="dialogInsert.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="新增采购单"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="procurementInsertModalCheck('refInsertPurchaseOrder')">
            <InsertPurchaseOrder ref="refInsertPurchaseOrder"/>
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
    import DetermineSign from '@/components/warehouse/determineSign';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import ShipmentsDetail from '@/components/warehouse/shipmentsDetail';
    import InsertPurchaseOrder from '@/components/warehouse/insertPurchaseOrder';
    import { requestDeliveryRecordGet, requestPurchaseOrderPages } from '../../api/warehouse/purchaseList';

    const columns = [
        {
            title: '采购单号',
            dataIndex: 'purchaseOrderCode',
            width: 150,
        },
//        {
//            title: '采购人',
//            dataIndex: '11',
//            width: 100,
//        },
//        {
//            title: '采购时间',
//            dataIndex: 'unit',
//            width: 150,
//        },
//        {
//            title: '商品名称',
//            dataIndex: 'goodsName',
//            width: 150,
//        },
//        {
//            title: '商品供应商',
//            dataIndex: 'supplierName',
//            width: 150,
//        },
//        {
//            title: '商品品牌',
//            dataIndex: 'brandName',
//            width: 150,
//        },
//        {
//            title: '采购数量（箱）',
//            dataIndex: 'purchaseOrderNum',
//            width: 150,
//        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
        },
        {
            title: '操作',
            width: 200,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  出库
    export default {
        components: {
            DetermineSign,
            ShipmentsDetail,
            InsertPurchaseOrder,
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

                //  确认签收
                dialogDataDetermineSign: this.initModal(DIALOG_TYPE.DETERMINE_SIGN),
                //  采购详情
                dialogDataProcurementDetails: this.initModal(DIALOG_TYPE.PROCUREMENT_DETAILS),
                //  新增采购单
                dialogInsert: this.initModal(DIALOG_TYPE.PROCUREMENT_INSERT),
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

            //  提醒返货
            remindDelivery(sItem){
                this.$success({
                    title: '提醒成功',
                });
            },
            //  确认签收
            determineSign(sItem){
                this.setPurchaseId('123');
                this.showModal(DIALOG_TYPE.DETERMINE_SIGN);
            },

            //  确认 确认签收
            remindDeliveryModalCheck(refDetermine){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.DETERMINE_SIGN, true);
                const promise = this.$refs[refDetermine].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.DETERMINE_SIGN);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.DETERMINE_SIGN, false);
                });
            },

            //  新增采购单
            insertFn(){
                this.showModal(DIALOG_TYPE.PROCUREMENT_INSERT);
            },
            procurementInsertModalCheck(refInsertPurchaseOrder){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.PROCUREMENT_INSERT, true);
                const promise = this.$refs[refInsertPurchaseOrder].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PROCUREMENT_INSERT);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.PROCUREMENT_INSERT, false);
                });
            },
            //  发货详情
            deliveryRecordDetails(sItem){
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
                //	被选中的采购单的id
                'setPurchaseId',
                //  被选中的采购订单id - 这个是给查看详情用的
                'setProcurementId',
            ]),
            pageChange,
            onShowSizeChange,
        }
    };
</script>


