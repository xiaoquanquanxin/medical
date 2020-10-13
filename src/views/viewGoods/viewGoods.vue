<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="searchData.commodityName" placeholder="请输入商品名称"/>
                </a-col>
                <a-col :span="5">
                    <a-input v-model="searchData.itemNo" placeholder="请输入商品货号"/>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.brand"
                            style="width:100%;"
                            placeholder="请选择品牌"
                    >
                        <a-select-option value="1600">1600</a-select-option>
                        <a-select-option value="160">160</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.classification"
                            style="width:100%;"
                            placeholder="请选择分类"
                    >
                        <a-select-option value="1600">1600</a-select-option>
                        <a-select-option value="160">160</a-select-option>
                    </a-select>
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
            <!--市场价-->
            <div slot="marketPrice" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="viewMarketPrice(sItem)">查看</a>
                </a-space>
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="onShelf(sItem)">上架</a>
                    <a @click="offShelf(sItem)">下架</a>
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
        <!--查看价格莫泰框-->
        <a-modal v-model="dialogDataViewMarketPrice.visible"
                 v-if="dialogDataViewMarketPrice.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="查看价格"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="viewMarketPriceModalCheck('refViewPrice')">
            <ViewPrice ref="refViewPrice"/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '../../utils/tableScroll';
    import ViewPrice from '@/components/commodity/viewPrice.vue';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';

    const columns = [
        {
            title: '商品货号',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '商品名称',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '通用名',
            dataIndex: 'bbb',
            width: 100,
        },
        {
            title: '商品分类',
            dataIndex: 'ccc',
            width: 100,
        },
        {
            title: '基本单位',
            dataIndex: 'dddd',
            width: 100,
        },
        {
            title: '规格',
            dataIndex: 'eeee',
            width: 100,
        },
        {
            title: '市场价',
            width: 100,
            scopedSlots: { customRender: 'marketPrice' }
        },
        {
            title: '生产厂家',
            dataIndex: 'gg',
            width: 100,
        },
        {
            title: '品牌',
            dataIndex: 'hhh',
            width: 100,
        },
        {
            title: '供应商',
            dataIndex: 'iii',
            width: 100,
        },
        {
            title: '更新时间',
            dataIndex: 'jjjj',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: '许晓飞',
            sex: '男',
            familyGroup: 'xxx',
            marketPrice: 3223,
        });
    }
    //  商品查看
    export default {
        components: {
            ViewPrice,
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

                //  价格莫泰框
                dialogDataViewMarketPrice: this.initModal(DIALOG_TYPE.VIEW_MARKET_PRICE),
            };
        },

        methods: {
            //  莫泰框方法
            ...dialogMethods,
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

            //  上架
            onShelf(sItem){
                this.$confirm({
                    title: `确定上架${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    //  content: (h)=>{h(test)},
                    okText: '确认',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  下架
            offShelf(sItem){
                this.$confirm({
                    title: `确定下架${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    //  content: (h)=>{h(test)},
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            //  查看市场价
            viewMarketPrice(sItem){
                //  console.log(sItem);
                this.showModal(DIALOG_TYPE.VIEW_MARKET_PRICE);
            },
            //  确认市场价格
            viewMarketPriceModalCheck(refViewPrice){
                const promise = this.$refs[refViewPrice].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.VIEW_MARKET_PRICE);
                }).catch(error => {
                    console.log('有错');
                });
            },
        }
    };
</script>