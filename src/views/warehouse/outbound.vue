<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.commodityName" placeholder="请输入入库单号"/>
            <a-input class="lengthen-input-width" v-model="searchData.itemNo" placeholder="请输入商品货号"/>
            <a-select class="basic-select-width" v-model="searchData.hospital" placeholder="请选择医院"
            >
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option value="1600">1600</a-select-option>
                <a-select-option value="160">160</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="outboundClick">出库</a-button>
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
        <!--出库莫泰框-->
        <a-modal v-model="dialogDataOutbound.visible"
                 v-if="dialogDataOutbound.visible"
                 :confirm-loading="dialogDataOutbound.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="出库"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="outboundModalCheck('refOutboundForm')">
            <OutboundForm ref="refOutboundForm"/>
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
    import OutboundForm from '@/components/warehouse/outboundForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { requestGoodsGoodsStock13 } from '../../api/warehouse/outbound';

    const columns = [
        {
            title: '出库单号',
            dataIndex: 'commodityName',
            width: 150,
        },
        {
            title: '出库商品名称',
            dataIndex: '出库商品名称',
            width: 100,
        },
        {
            title: '商品货号',
            dataIndex: '商品货号',
            width: 100,
        },
        {
            title: '出库数量',
            dataIndex: '出库数量',
            width: 100,
        },
        {
            title: '状态',
            dataIndex: '状态',
            width: 150,
        },
    ];

    //  出库
    export default {
        components: {
            OutboundForm,
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

                //  出库操作
                dialogDataOutbound: this.initModal(DIALOG_TYPE.OUTBOUND),
                
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestGoodsGoodsStock13(paginationEncode(this.pagination))
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
            //  出库
            outboundClick(){
                this.showModal(DIALOG_TYPE.OUTBOUND);
            },

            //  确认出库
            outboundModalCheck(refOutboundForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.OUTBOUND, true);
                const promise = this.$refs[refOutboundForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.OUTBOUND);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.OUTBOUND, false);
                });
            },
            //  莫泰框方法
            ...dialogMethods,
            pageChange,
            onShowSizeChange,

        }
    };
</script>