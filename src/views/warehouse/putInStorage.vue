<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="6">
                    <a-input v-model="searchData.commodityName" placeholder="请输入入库单号"/>
                </a-col>
                <a-col :span="5">
                    <a-input v-model="searchData.itemNo" placeholder="请输入商品货号"/>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.hospital"
                            style="width:100%;"
                            placeholder="请选择医院"
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
        <a-input-group class="a-input-group">
            <a-button type="primary"
                      @click="outboundClick"
            >入库
            </a-button>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
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
        <!--入库莫泰框-->
        <a-modal v-model="dialogDataOutbound.visible"
                 v-if="dialogDataOutbound.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="入库"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="outboundModalCheck('refPutInStoreBox')">
            <PutInStoreBox ref="refPutInStoreBox"/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '../../utils/tableScroll';
    import PutInStoreBox from '@/components/warehouse/putInStoreBox';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    
    const columns = [
        {
            title: '入库单号',
            dataIndex: 'commodityName',
            width: 150,
        },
        {
            title: '入库医院',
            dataIndex: '112',
            width: 100,
        },
        {
            title: '入库商品名称',
            dataIndex: '11',
            width: 100,
        },
        {
            title: '商品货号',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '入库数量',
            dataIndex: 'barCode',
            width: 100,
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            commodityName: `xx供应商`,
        });
    }

    //  入库
    export default {
        components: {
            PutInStoreBox,
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

                //  入库操作
                dialogDataOutbound: this.initModal(DIALOG_TYPE.OUTBOUND),
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,

//            ...mapActions('warehouse', [
//                //	被选中的入库id
//                'setPutInStoreId',
//            ]),

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

            //  入库
            outboundClick(){
                //  this.setPutInStoreId('32332');
                this.showModal(DIALOG_TYPE.OUTBOUND);
            },

            //  确认市场价格
            outboundModalCheck(refPutInStoreBox){
                const promise = this.$refs[refPutInStoreBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.OUTBOUND);
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>