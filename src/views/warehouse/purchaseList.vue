<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="6">
                    <a-input v-model="searchData.purchaseOrderNumber" placeholder="请输入采购单号"/>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.status"
                            style="width:100%;"
                            placeholder="请选择状态"
                    >
                        <a-select-option value="全部">全部</a-select-option>
                        <a-select-option value="待发货">待发货</a-select-option>
                        <a-select-option value="待签收">待签收</a-select-option>
                        <a-select-option value="已签收">已签收</a-select-option>
                    </a-select>
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
                    <a @click="remindDelivery(sItem)">提醒发货</a>
                    <a @click="determineSign(sItem)">确定签收</a>
                    <a @click="procurementDetails(sItem)">详情</a>
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
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import DetermineSign from '@/components/warehouse/determineSign';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import ShipmentsDetail from '@/components/warehouse/shipmentsDetail';

    const columns = [
        {
            title: '采购单号',
            dataIndex: 'commodityName',
            width: 150,
        },
        {
            title: '采购人',
            dataIndex: '11',
            width: 150,
        },
        {
            title: '采购时间',
            dataIndex: 'unit',
            width: 150,
        },
        {
            title: '商品名称',
            dataIndex: 'fea',
            width: 150,
        },
        {
            title: '商品供应商',
            dataIndex: 'barCode',
            width: 150,
        },
        {
            title: '商品品牌',
            dataIndex: 'fefewawa',
            width: 150,
        },
        {
            title: '采购数量（箱）',
            dataIndex: 'fewa',
            width: 150,
        },
        {
            title: '状态',
            dataIndex: 'supplier',
            width: 150,
        },
        {
            title: '操作',
            width: 200,
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodityName: `xx供应商`,
        });
    }

    //  出库
    export default {
        components: {
            DetermineSign,
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

                //  确认签收
                dialogDataDetermineSign: this.initModal(DIALOG_TYPE.DETERMINE_SIGN),
                //  采购详情
                dialogDataProcurementDetails: this.initModal(DIALOG_TYPE.PROCUREMENT_DETAILS),
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,

            ...mapActions('warehouse', [
                //	被选中的采购单的id
                'setPurchaseId',
                //  被选中的采购订单id - 这个是给查看详情用的
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

            //  采购详情
            procurementDetails(sItem){
                this.setProcurementId('4323543');
                this.showModal(DIALOG_TYPE.PROCUREMENT_DETAILS);
            },
            //  确认详情
            procurementDetailModalCheck(){
                this.hideModal(DIALOG_TYPE.PROCUREMENT_DETAILS);
            },
        }
    };
</script>