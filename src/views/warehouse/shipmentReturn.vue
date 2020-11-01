<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="longer-input-width" v-model="searchData.commodityName" placeholder="请输入出货退货单号"/>
            <a-input class="lengthen-input-width" v-model="searchData.itemNo" placeholder="请输入商品货号"/>
            <a-select class="basic-select-width" v-model="searchData.hospital" placeholder="请选择医院">
                <a-select-option value="1600">1600</a-select-option>
                <a-select-option value="160">160</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="shipmentReturnClick">出货退货</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
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
        <!--出货退货莫泰框-->
        <a-modal v-model="dialogDataShipmentReturnForm.visible"
                 v-if="dialogDataShipmentReturnForm.visible"
                 :confirm-loading="dialogDataShipmentReturnForm.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="出货退货"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="shipmentReturnModalCheck('refShipmentReturnFormForm')">
            <ShipmentReturnFormForm ref="refShipmentReturnFormForm"/>
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
    import { twoRowSearch } from '@/utils/tableScroll';
    import ShipmentReturnFormForm from '@/components/warehouse/shipmentReturnForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { requestGoodsGoodsStock16 } from '../../api/warehouse/shipmentReturn';

    const columns = [
        {
            title: '出货退货单号',
            dataIndex: 'commodityName',
            width: 150,
        },
        {
            title: '商品名称',
            dataIndex: '11',
            width: 150,
        },
        {
            title: '商品货号',
            dataIndex: 'unit',
            width: 150,
        },
        {
            title: '出货退货数量',
            dataIndex: 'barCode',
            width: 150,
        },
    ];

    //  出货退货
    export default {
        components: {
            ShipmentReturnFormForm,
        },
        data(){
            return {
                data: [],
                columns,
                //  搜索数据
                searchData: {},

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),

                //  出货退货操作
                dialogDataShipmentReturnForm: this.initModal(DIALOG_TYPE.SHIPMENT_RETURN_FORM),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestGoodsGoodsStock16(paginationEncode(this.pagination))
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },

            //  出货退货
            shipmentReturnClick(){
                this.showModal(DIALOG_TYPE.SHIPMENT_RETURN_FORM);
            },

            //  确认出货退货
            shipmentReturnModalCheck(refShipmentReturnFormForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.SHIPMENT_RETURN_FORM, true);
                const promise = this.$refs[refShipmentReturnFormForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.SHIPMENT_RETURN_FORM);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.SHIPMENT_RETURN_FORM, false);
                });
            },

            //  莫泰框方法
            ...dialogMethods,
            pageChange,
            onShowSizeChange,
        }
    };
</script>