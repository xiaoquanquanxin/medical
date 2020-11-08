<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.goodsName" placeholder="请输入商品名称"/>
            <a-input class="basic-input-width" v-model="searchData.goodsProductCode" placeholder="请输入商品货号"/>
            <a-select class="basic-select-width" v-model="searchData.brandId" placeholder="请选择品牌">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option :value="item.id"
                                 v-for="item in goodsBrandList"
                >{{item.brandName}}
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" v-model="searchData.categoryId" placeholder="请选择分类">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option :value="item.id"
                                 v-for="item in goodsCategoryList"
                >{{item.categoryName}}
                </a-select-option>
            </a-select>
            <a-select class="basic-select-width" v-model="searchData.status" placeholder="请选择状态" v-if="false">
                <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                <a-select-option value="1">上架</a-select-option>
                <a-select-option value="2">下架</a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addCommodity'}">
                <a-button type="primary">
                    新增商品
                </a-button>
            </router-link>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editCommodity(sItem)">编辑</a>
                    <a @click="authorizationDistributors(sItem)">授权渠道商</a>
                    <a @click="authorizationHospital(sItem)">授权医院</a>
                    <a @click="onShelf(sItem)" v-if="false">上架</a>
                    <a @click="offShelf(sItem)" v-if="false">下架</a>
                    <a @click="deleteFn(sItem)">删除</a>
                </a-space>
            </div>
            <div slot="marketPrice" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="viewMarketPrice(sItem)">查看</a>
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
        <!--授权渠道商莫泰框-->
        <a-modal v-model="dialogDataAuthorization.visible"
                 v-if="dialogDataAuthorization.visible"
                 :confirm-loading="dialogDataAuthorization.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="授权渠道商"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="authorizationDistributorsModalCheck('refShuttleBox')">
            <ShuttleBox ref="refShuttleBox"
                        :origin-list="shuttleOriginList"
                        :origin-target-key="shuttleOriginTargetKey"
            />
        </a-modal>
        <!--授权医院莫泰框-->
        <a-modal v-model="dialogHospital.visible"
                 v-if="dialogHospital.visible"
                 :confirm-loading="dialogHospital.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="授权医院"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="authorizationHospitalModalCheck('refShuttleBox')">
            <ShuttleBox ref="refShuttleBox"
                        :origin-list="shuttleOriginList"
                        :origin-target-key="shuttleOriginTargetKey"
            />
        </a-modal>
    </div>
</template>
<script>
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange,
    } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import ShuttleBox from '@/components/shuttleBox.vue';
    import ViewPrice from '@/components/commodity/viewPrice.vue';
    import { SHUTTLE_BOX } from '../../store/modules/shuttleBox';
    import {
        requestChannelBusinessListGoodsId,
        requestGoodsAuthorize,
        requestGoodsDelete,
        requestGoodsGetGoodsRelationHospital,
        requestGoodsGoodsRelationHospital,
        requestGoodsPage
    } from '../../api/commodity/commodityList';
    import { requestCategoryList } from '../../api/commodity/commodityClassification';
    import { requestBrandList } from '../../api/commodity/brand';
    import { requestChannelBusinessList } from '../../api/distributors';
    import { requestHospitalGetList } from '../../api/hospital';

    const columns = [
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            width: 150,
        },
        {
            title: '商品货号',
            dataIndex: 'goodsProductCode',
            width: 150,
        },
        {
            title: '通用名',
            dataIndex: 'goodsTradeName',
            width: 150,
        },
        {
            title: '商品分类',
            dataIndex: 'goodsCategoryName',
            width: 150,
        },
        {
            title: '基本单位',
            dataIndex: 'unit',
            width: 150,
        },
        {
            title: '规格',
            dataIndex: 'goodsSpecifications',
            width: 150,
        },
//        {
//            title: '市场价',
//            scopedSlots: { customRender: 'marketPrice' },
//            width: 100,
//        },
        {
            title: '生产厂家',
            dataIndex: 'manufactorName',
            width: 150,
        },
        {
            title: '品牌',
            dataIndex: 'goodsBrandName',
            width: 150,
        },
        {
            title: '供应商',
            dataIndex: 'supplierName',
            width: 150,
        },
        {
            title: '更新时间',
            dataIndex: 'update',
            width: 150,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 300,
        },
    ];

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
                //  商品分类list
                goodsCategoryList: [],
                //  商品品牌list
                goodsBrandList: [],
                data: [],
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),

                //  分页信息
                pagination: paginationInit(),
                //  价格莫泰框
                dialogDataViewMarketPrice: this.initModal(DIALOG_TYPE.VIEW_MARKET_PRICE),
                //  授权莫泰框
                dialogDataAuthorization: this.initModal(DIALOG_TYPE.AUTHORIZATION_DISTRIBUTORS),
                //  授权医院莫泰框
                dialogHospital: this.initModal(DIALOG_TYPE.AUTHORIZATION_HOSPITAL),
                //  弹框表格的数据
                countTableColumns,
                countTableData,

                //  搜索数据
                searchData: {},

                //  穿梭框数据
                shuttleOriginList: [],
                //  穿梭框默认值
                shuttleOriginTargetKey: [],
                //  穿梭框操作的sItem
                shuttleBoxData: {},
            };
        },
        created(){
            this.searchFn();
            requestCategoryList()
                .then(goodsCategoryList => {
                    //  商品分类list
                    this.goodsCategoryList = goodsCategoryList;
                });
            requestBrandList()
                .then(goodsBrandList => {
                    //  商品品牌list
                    this.goodsBrandList = goodsBrandList;
                });
        },
        methods: {
            //  主要请求
            searchFn(){
                requestGoodsPage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(this.data[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  查看市场价
            viewMarketPrice(sItem){
                //  console.log(sItem);
                this.showModal(DIALOG_TYPE.VIEW_MARKET_PRICE);
            },
            //  编辑商品
            editCommodity(sItem){
                this.$router.push({ name: 'editCommodity', params: { commodityId: sItem.id } });
            },
            //  授权渠道商
            authorizationDistributors(sItem){
                this.shuttleBoxData = sItem;
                Promise.all([
                    requestChannelBusinessList(),
                    requestChannelBusinessListGoodsId(sItem.id)
                ])
                    .then(v => {
                        const shuttleOriginList = v[0] || [];
                        const shuttleOriginTargetKey = v[1].data.map(String);
                        this.shuttleOriginList = [];
                        shuttleOriginList.forEach(item => {
                            const data = {};
                            data.key = item.id.toString();
                            data.title = item.channelBusinessName;
                            data.description = item.channelBusinessName;
                            this.shuttleOriginList.push(data);
                        });
                        //  console.table(shuttleOriginList);
                        this.shuttleOriginTargetKey = shuttleOriginTargetKey;
                        this.showModal(DIALOG_TYPE.AUTHORIZATION_DISTRIBUTORS);
                        this.setShuttleBoxType(SHUTTLE_BOX.DIALOG_AUTHORIZATION_DISTRIBUTORS);
                    });
            },
            //  授权医院
            authorizationHospital(sItem){
                this.shuttleBoxData = sItem;
                Promise.all([
                    requestHospitalGetList(),
                    requestGoodsGetGoodsRelationHospital(sItem.id)
                ])
                    .then(v => {
                        const shuttleOriginList = v[0] || [];
                        const shuttleOriginTargetKey = v[1].data.map(String);
                        this.shuttleOriginList = [];
                        shuttleOriginList.forEach(item => {
                            const data = {};
                            data.key = item.id.toString();
                            data.title = item.hospitalName;
                            data.description = item.hospitalName;
                            this.shuttleOriginList.push(data);
                        });
                        //  console.table(shuttleOriginList);
                        this.shuttleOriginTargetKey = shuttleOriginTargetKey;
                        this.showModal(DIALOG_TYPE.AUTHORIZATION_HOSPITAL);
                        this.setShuttleBoxType(SHUTTLE_BOX.AUTHORIZATION_HOSPITAL);
                    });
            },
            //  上架
            onShelf(sItem){
                this.$confirm({
                    title: `确定上架${sItem.disease}`,
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
            //  删除
            deleteFn(sItem){
                requestGoodsDelete(sItem.id)
                    .then(v => {
                        this.$message.success('操作成功');
                        this.searchFn();
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
            //  确认授权渠道商
            authorizationDistributorsModalCheck(refShuttleBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.AUTHORIZATION_DISTRIBUTORS, true);
                const promise = this.$refs[refShuttleBox].handleSubmit();
                promise.then(targetKeys => {
                    console.log(targetKeys);
                    console.log(this.shuttleBoxData.id);
                    return requestGoodsAuthorize({
                        goodsId: this.shuttleBoxData.id,
                        channelBusinessId: targetKeys
                    })
                        .then(v => {
                            this.$message.success('操作成功');
                            this.hideModal(DIALOG_TYPE.AUTHORIZATION_DISTRIBUTORS);
                            this.searchFn();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.AUTHORIZATION_DISTRIBUTORS, false);
                });
            },
            //  确认授权医院
            authorizationHospitalModalCheck(refShuttleBox){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.AUTHORIZATION_HOSPITAL, true);
                const promise = this.$refs[refShuttleBox].handleSubmit();
                promise.then(targetKeys => {
                    console.log(targetKeys);
                    console.log(this.shuttleBoxData.id);
                    return requestGoodsGoodsRelationHospital({
                        goodsId: this.shuttleBoxData.id,
                        hospitalId: targetKeys
                    })
                        .then(v => {
                            this.$message.success('操作成功');
                            this.hideModal(DIALOG_TYPE.AUTHORIZATION_HOSPITAL);
                            this.searchFn();
                        })
                        .catch(err => {
                            console.log(err);
                            this.$message.error('操作失败');
                        });
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.AUTHORIZATION_HOSPITAL, false);
                });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('shuttleBox', [
                //  设置穿梭框类型
                'setShuttleBoxType',
            ]),
            pageChange,
            onShowSizeChange,
        }
    };
</script>