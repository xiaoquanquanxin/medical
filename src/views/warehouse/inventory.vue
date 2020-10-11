<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="searchData.commodityName" placeholder="请输入商品名称"/>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.status"
                            style="width:100%;"
                            placeholder="请选择商品状态"
                    >
                        <a-select-option value="1600">1600</a-select-option>
                        <a-select-option value="160">160</a-select-option>
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
            <div slot="totalInventory" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    {{scope.totalInventory}}
                    <a @click="viewInventory(sItem)">查看</a>
                </a-space>
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="procurement(sItem)">采购</a>
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
            <ViewTotalInventory ref="refViewTotalInventory"/>
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
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '../../utils/tableScroll';
    import ViewTotalInventory from '@/components/warehouse/viewTotalInventory';
    import ProcurementForm from '@/components/warehouse/procurementForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';

    const columns = [
        {
            title: '总库存',
            scopedSlots: { customRender: 'totalInventory' },
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
            ViewTotalInventory,
            ProcurementForm,
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

                //  查看总库存
                dialogDataViewTotalInventory: this.initModal(DIALOG_TYPE.VIEW_TOTAL_INVENTORY),
                //  采购操作
                dialogDataProcurement: this.initModal(DIALOG_TYPE.PROCUREMENT),
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,

            ...mapActions('warehouse', [
                //  被选中的库存的id
                'setWarehouseId',
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

            //  查看总库存
            viewInventory(sItem){
                this.setWarehouseId('123');
                this.showModal(DIALOG_TYPE.VIEW_TOTAL_INVENTORY);
            },
            //  采购
            procurement(sItem){
                this.setWarehouseId('123');
                this.showModal(DIALOG_TYPE.PROCUREMENT);
            },
            //  确认市场价格
            viewInventoryModalCheck(){
                this.hideModal(DIALOG_TYPE.VIEW_TOTAL_INVENTORY);
            },

            //  确认采购
            procurementModalCheck(refProcurementForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.PROCUREMENT, true);
                const promise = this.$refs[refProcurementForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PROCUREMENT);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.PROCUREMENT, false);
                });
            },
        }
    };
</script>