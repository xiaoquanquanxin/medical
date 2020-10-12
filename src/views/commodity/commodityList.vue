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
                    <a-select v-model="searchData.brand" style="width:100%;" placeholder="请选择品牌">
                        <a-select-option value="">
                            品牌
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select v-model="searchData.classification" style="width:100%;" placeholder="请选择分类">
                        <a-select-option value="">
                            分类
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select v-model="searchData.status" style="width:100%;" placeholder="请选择状态">
                        <a-select-option value="">
                            状态
                        </a-select-option>
                        <a-select-option value="Option2">
                            Option2
                        </a-select-option>
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
            <a-col :span="5">
                <router-link :to="{name:'addCommodity'}">
                    <a-button type="primary">
                        新增商品
                    </a-button>
                </router-link>
            </a-col>
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
                    <a @click="editCommodity(sItem)">编辑</a>
                    <a @click="authorization(sItem)">授权</a>
                    <a @click="onShelf(sItem)">上架</a>
                    <a @click="offShelf(sItem)">下架</a>
                </a-space>
            </div>
            <div slot="marketPrice" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="viewMarketPrice(sItem)">查看</a>
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
        <!--授权莫泰框-->
        <a-modal v-model="dialogDataAuthorization.visible"
                 v-if="dialogDataAuthorization.visible"
                 :confirm-loading="dialogDataAuthorization.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="授权"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="authorizationModalCheck('refShuttleBox')">
            <ShuttleBox ref="refShuttleBox"/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '../../utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import ShuttleBox from '@/components/shuttleBox.vue';
    import ViewPrice from '@/components/commodity/viewPrice.vue';
    import { SHUTTLE_BOX } from '../../store/modules/shuttleBox';

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '商品货号',
            dataIndex: '1s ',
            width: 100,
        },
        {
            title: '通用名',
            dataIndex: '通用名',
            width: 100,
        },
        {
            title: '商品分类',
            dataIndex: 'city',
            width: 100,
        },
        {
            title: '基本单位',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '规格',
            dataIndex: 'specifications',
            width: 100,
        },

        {
            title: '市场价',
            dataIndex: 'marketPrice',
            width: 100,
            scopedSlots: { customRender: 'marketPrice' },
        },
        {
            title: '生产厂家',
            dataIndex: 'manufacturer',
            width: 100,
        },
        {
            title: '品牌',
            dataIndex: 'brand',
            width: 100,
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            width: 100,
        },

        {
            title: '更新时间',
            dataIndex: 'update',
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
            commodity: `xx商品`,
            city: '上海',
            status: String(i % 2),
            icon: '商品图标',

        });
    }

    //  查看详情的表格
    const countTableData = [
        {
            key: Math.random(),
            name: '山西省人民医院',
            relative: '10克',
            unit: '勺',
            shoppingType: 'A商品',
            price: null,
        },
        {
            key: Math.random(),
            name: '山西省人民医院',
            relative: '10克',
            unit: 'ml',
            shoppingType: 'B商品',
            price: null,
        },
        {
            key: Math.random(),
            name: '山西省肿瘤医院',
            relative: '110克',
            unit: '勺',
            shoppingType: 'A商品',
            price: null,
        },
        {
            key: Math.random(),
            name: '山西省肿瘤医院',
            relative: '110克',
            unit: 'ml',
            shoppingType: 'B商品',
            price: null,
        },
    ];

    export default {
        components: {
            ShuttleBox,
            ViewPrice,
        },
        data(){
            const countTableColumns = [
                {
                    dataIndex: 'name',
                    title: 'Name',
                    width: 200,
                    customRender: (text, row, index) => {
                        const obj = {
                            children: text,
                            attrs: {},
                        };
                        if (index === 0) {
                            obj.attrs.rowSpan = 2;
                        } else if (index === 2) {
                            obj.attrs.rowSpan = 2;
                        } else {
                            obj.attrs.rowSpan = 0;
                        }
                        return obj;
                    },
                },
                {
                    //  单位
                    title: '单位',
                    key: 'unit',
                    dataIndex: 'unit',
                },
                {
                    //  单位关系
                    title: '单位关系',
                    key: 'relative',
                    dataIndex: 'relative',
                },
                {
                    //  价格
                    title: '价格',
                    key: 'price',
                    dataIndex: 'price',
                    width: 300,
                    scopedSlots: { customRender: 'unit' },
                },
            ];
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,

                //  分页信息
                pagination,
                //  价格莫泰框
                dialogDataViewMarketPrice: this.initModal(DIALOG_TYPE.VIEW_MARKET_PRICE),
                //  授权莫泰框
                dialogDataAuthorization: this.initModal(DIALOG_TYPE.AUTHORIZATION),
                //  弹框表格的数据
                countTableColumns,
                countTableData,

                //  搜索数据
                searchData: {},
            };
        },
        created(){
            //  this.dialogData.visible = true;
            //  console.log(this.dialogDataAuthorization);
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('shuttleBox', [
                //  设置穿梭框类型
                'setShuttleBoxType',
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

            //  查看市场价
            viewMarketPrice(sItem){
                //  console.log(sItem);
                this.showModal(DIALOG_TYPE.VIEW_MARKET_PRICE);
            },
            //  编辑商品
            editCommodity(sItem){
                this.$router.push({ name: 'editCommodity', params: { commodityId: '1232' } });
            },
            //  授权
            authorization(sItem){
                this.showModal(DIALOG_TYPE.AUTHORIZATION);
                this.setShuttleBoxType(SHUTTLE_BOX.DIALOG_AUTHORIZATION);
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
            //  确认市场价格
            viewMarketPriceModalCheck(refViewPrice){
                const promise = this.$refs[refViewPrice].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.VIEW_MARKET_PRICE);
                }).catch(error => {
                    console.log('有错');
                });
            },
            //  确认权限
            authorizationModalCheck(refShuttleBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.AUTHORIZATION, true);
                const promise = this.$refs[refShuttleBox].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.AUTHORIZATION);
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.AUTHORIZATION, false);
                });
            }
        }
    };
</script>
<style scoped lang="stylus">
</style>
