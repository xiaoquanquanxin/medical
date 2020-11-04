<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.goodsName" placeholder="请输入商品名称"/>
            <a-select class="lengthen-select-width" v-model="searchData.status" placeholder="请选择商品状态">
                <a-select-option :value="0">启用</a-select-option>
                <a-select-option :value="1">停用</a-select-option>
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
            <div slot="totalInventory" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    {{scope.totalInventory}}
                    <a @click="viewInventory(sItem)">查看</a>
                </a-space>
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="procurement(sItem)">采购</a>
                    <a @click="salesReturn(sItem)">退货</a>
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
        <!--查看总库存莫泰框-->
        <a-modal v-model="dialogDataViewTotalInventory.visible"
                 v-if="dialogDataViewTotalInventory.visible"
                 :confirm-loading="dialogDataViewTotalInventory.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="查看总库存"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="viewInventoryModalCheck('refViewTotalInventory')">
            <ViewTotalInventory ref="refViewTotalInventory"
            />
        </a-modal>
        <!--采购操作莫泰框-->
        <a-modal v-model="dialogDataProcurement.visible"
                 v-if="dialogDataProcurement.visible"
                 :confirm-loading="dialogDataProcurement.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="采购"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="procurementModalCheck('refProcurementForm')">
            <ProcurementForm ref="refProcurementForm"/>
        </a-modal>
        <!--退货操作莫泰框-->
        <a-modal v-model="dialogDataSalesReturn.visible"
                 v-if="dialogDataSalesReturn.visible"
                 :confirm-loading="dialogDataSalesReturn.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="退货"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="salesReturnModalCheck('refSalesReturnForm')">
            <SalesReturnForm ref="refSalesReturnForm"/>
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
    import ViewTotalInventory from '@/components/warehouse/viewTotalInventory';
    import ProcurementForm from '@/components/warehouse/procurementForm';
    import SalesReturnForm from '@/components/warehouse/salesReturnForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import { requestGoodsGoodsStock } from '../../api/warehouse/inventory';

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: 150,
        },
        {
            title: '商品货号',
            dataIndex: 'goodsProductCode',
            width: 120,
        },
        {
            title: '单位',
            dataIndex: 'unit',
            width: 120,
        },
        {
            title: '商品条码',
            dataIndex: 'goodsBarCode',
            width: 120,
        },
        {
            title: '商品供应商',
            dataIndex: 'supplierName',
            width: 120,
        },
        {
            title: '商品品牌',
            dataIndex: 'brandName',
            width: 120,
        },
        {
            title: '厂家',
            dataIndex: 'manufactorName',
            width: 120,
        },
        {
            title: '总库存',
            scopedSlots: { customRender: 'totalInventory' },
            width: 120,
        },
        {
            title: '占用库存',
            dataIndex: 'occupyInventory',
            width: 120,
        },
        {
            title: '剩余库存',
            dataIndex: 'remainingInventory',
            width: 120,
        },
        {
            title: '操作',
            width: 120,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    //  商品库存列表
    export default {
        components: {
            ViewTotalInventory,
            ProcurementForm,
            SalesReturnForm,
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

                //  查看总库存
                dialogDataViewTotalInventory: this.initModal(DIALOG_TYPE.VIEW_TOTAL_INVENTORY),
                //  采购操作
                dialogDataProcurement: this.initModal(DIALOG_TYPE.PROCUREMENT),
                //  退货
                dialogDataSalesReturn: this.initModal(DIALOG_TYPE.SALES_RETURN),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestGoodsGoodsStock(Object.assign(
                    {}, this.searchData, paginationEncode(this.pagination)
                ))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            //  item.createTime = item.createTime.substr(0, 10);
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  查看总库存
            viewInventory(sItem){
                this.setWarehouseId('123');
                this.showModal(DIALOG_TYPE.VIEW_TOTAL_INVENTORY);
            },
            //  确认市场价格
            viewInventoryModalCheck(){
                this.hideModal(DIALOG_TYPE.VIEW_TOTAL_INVENTORY);
            },
            //  采购
            procurement(sItem){
                this.setWarehouseId(sItem.id);
                this.showModal(DIALOG_TYPE.PROCUREMENT);
            },
            //  确认采购
            procurementModalCheck(refProcurementForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.PROCUREMENT, true);
                const promise = this.$refs[refProcurementForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PROCUREMENT);
                    this.$message.success('操作成功');
                    this.searchFn();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.PROCUREMENT, false);
                });
            },
            //  退货
            salesReturn(sItem){
                this.setWarehouseId(sItem.id);
                this.showModal(DIALOG_TYPE.SALES_RETURN);
            },
            //  确认退货
            salesReturnModalCheck(refSalesReturnForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.SALES_RETURN, true);
                const promise = this.$refs[refSalesReturnForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.SALES_RETURN);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.SALES_RETURN, false);
                });
            },
            //  莫泰框方法
            ...dialogMethods,

            ...mapActions('warehouse', [
                //  被选中的库存的id
                'setWarehouseId',
            ]),
            onShowSizeChange,
            pageChange,

        }
    };
</script>