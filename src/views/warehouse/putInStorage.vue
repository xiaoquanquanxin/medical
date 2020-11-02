<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.commodityName" placeholder="请输入入库单号"/>
            <a-input class="lengthen-input-width" v-model="searchData.itemNo" placeholder="请输入商品货号"/>
            <a-select class="basic-select-width" v-model="searchData.hospital" placeholder="请选择医院"
            >
                <a-select-option value="1600">1600</a-select-option>
                <a-select-option value="160">160</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="putInStorageClick">入库</a-button>
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
        <!--入库莫泰框-->
        <a-modal v-model="dialogDataPutInStorageForm.visible"
                 v-if="dialogDataPutInStorageForm.visible"
                 :confirm-loading="dialogDataPutInStorageForm.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="入库"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="putInStorageModalCheck('refPutInStorageForm')">
            <PutInStorageForm ref="refPutInStorageForm"/>
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
    import PutInStorageForm from '@/components/warehouse/putInStorageForm';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';

    const columns = [
        {
            title: '入库单号',
            dataIndex: 'commodityName',
            width: 150,
        },
        {
            title: '入库医院',
            dataIndex: '入库医院',
            width: 150,
        },
        {
            title: '入库商品名称',
            dataIndex: '入库商品名称',
            width: 150,
        },
        {
            title: '商品货号',
            dataIndex: '商品货号',
            width: 200,
        },
        {
            title: '入库数量',
            dataIndex: '入库数量',
            width: 150,
        },
    ];

    //  入库
    export default {
        components: {
            PutInStorageForm,
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

                //  入库操作
                dialogDataPutInStorageForm: this.initModal(DIALOG_TYPE.PUT_IN_STORE_ID),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
//                requestChannelBusinessPage(paginationEncode(this.pagination))
//                    .then(v => {
//                        const { data } = v;
//                        console.log(data);
//                data.records.forEach((item, index) => {
//                    item.key = index;
//                    item.createTime = item.createTime.substr(0, 10);
//                });
//                        this.data = data.records;
//                        this.pagination = paginationDecode(this.pagination, data);
//                    });
            },
            //  莫泰框方法
            ...dialogMethods,

            //  展示的每一页数据变换
            onShowSizeChange(current, pageSize){
                this.pagination.pageSize = pageSize;
                this.pagination.current = 1;
                this.searchFn();
            },
            //  切换分页页码
            pageChange(current){
                this.pagination.current = current;
                this.searchFn();
            },

            //  入库
            putInStorageClick(){
                this.showModal(DIALOG_TYPE.PUT_IN_STORE_ID);
            },

            //  确认市场价格
            putInStorageModalCheck(refPutInStorageForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.PUT_IN_STORE_ID, true);
                const promise = this.$refs[refPutInStorageForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PUT_IN_STORE_ID);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.PUT_IN_STORE_ID, false);
                });
            },
        }
    };
</script>