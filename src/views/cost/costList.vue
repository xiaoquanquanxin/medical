<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入订单编号"/>
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入处方号"/>
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入患者姓名"/>
            <a-select class="lengthen-select-width" v-model="searchData.status" placeholder="请选择支付状态">
                <a-select-option value="">
                    状态
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
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
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space>
                    <router-link :to="{name:'auditDetail',params:{auditDetailId:sIndex}}">详情</router-link>
                    <a @click="payCost(sItem)">缴费</a>
                    <a @click="returnCost(sItem)">退费</a>
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
        <!--缴费莫泰框-->
        <a-modal v-model="dialogPayCost.visible"
                 v-if="dialogPayCost.visible"
                 :confirm-loading="dialogPayCost.confirmLoading"
                 :maskClosable="false"
                 centered
                 :width="800"
                 :title="dialogPayCost.title"
                 ok-text="确认并打印票据"
                 cancel-text="取消"
                 @ok="payCostModalCheck('refPayCostForm')">
            <PayCostForm ref="refPayCostForm"/>
        </a-modal>
        <!--退费莫泰框-->
        <!--        <a-modal v-model="dialogReturnCost.visible"-->
        <!--                 v-if="dialogReturnCost.visible"-->
        <!--                 :confirm-loading="dialogReturnCost.confirmLoading"-->
        <!--                 :maskClosable="false"-->
        <!--                 centered-->
        <!--                 :width="800"-->
        <!--                 title="退费"-->
        <!--                 ok-text="确认并打印票据"-->
        <!--                 cancel-text="取消"-->
        <!--                 @ok="returnCostModalCheck('refReturnCostForm')">-->
        <!--            <PayCostForm ref="refReturnCostForm"/>-->
        <!--        </a-modal>-->
        <div v-show="false">
            <a-button class="basic-button-width" type="primary" v-print="printObj" id="printButton">打印</a-button>
            <div id="paper">
                <ul class="paper-list">
                    <li>
                        <a-row type="flex" justify="space-between" align="middle" class="table-group-title">
                            用户信息
                        </a-row>
                    </li>
                    <li class="paper-item paper-item-flex">
                        <div>住院号：</div>
                        <div>xxx</div>
                        <div>姓名：</div>
                        <div>xxx</div>
                    </li>
                    <li class="paper-item paper-item-flex">
                        <div>身份证号：</div>
                        <div class="w-3">283939393939393939</div>
                    </li>
                    <li class="paper-item paper-item-flex">
                        <div>账号余额：</div>
                        <div class="red w-3">￥3600</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { paginationInit } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import PayCostForm from '@/components/cost/payCostForm.vue';

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '处方号',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '患者姓名',
            dataIndex: '通用名',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '床号',
            dataIndex: 'specifications',
            width: 100,
        },
        {
            title: '缴费金额',
            dataIndex: 'marketPrice',
            width: 100,
        },
        {
            title: '支付状态',
            dataIndex: '222',
            width: 100,
        },
        {
            title: '收费时间',
            dataIndex: 'manufacturer',
            width: 100,
        },
        {
            title: '收费人',
            dataIndex: 'update',
            width: 100,
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
            commodity: `xx商品`,
            city: '上海',
            status: String(i % 2),
            icon: '商品图标',
            aaa: '商品货号',
            通用名: '通用名',
            商品分类: '商品分类',
            unit: '基本单位',
            specifications: '规格',
            manufacturer: '生产厂家',
        });
    }

    export default {
        components: {
            PayCostForm,
        },
        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {},

                //  选择日期的值的对象
                selectDateMoment: null,

                //  缴费莫泰框
                dialogPayCost: this.initModal(DIALOG_TYPE.PAY_COST),
                //  退费莫泰框
//                dialogReturnCost: this.initModal(DIALOG_TYPE.RETURN_COST),

                //  打印对象
                printObj: {
                    id: '#paper',
                    popTitle: '票据',
                },
            };
        },
        methods: {
            //  主要请求
            searchFn(){

            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('cost', [
                //  弹框id
                'setSelectCostId',
                //	操作类型	缴费1 、退费-1
                'setCostType',
            ]),
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
            //  缴费
            payCost(sItem){
                this.setSelectCostId('11111');
                this.setCostType(1);
                this.setDialogTitle(DIALOG_TYPE.PAY_COST, '缴费');
                this.showModal(DIALOG_TYPE.PAY_COST);
            },
            //  退费
            returnCost(sItem){
                this.setSelectCostId('-1111');
                this.setCostType(-1);
                this.setDialogTitle(DIALOG_TYPE.PAY_COST, '退费');
                this.showModal(DIALOG_TYPE.PAY_COST);
            },
            //  确认缴费
            payCostModalCheck(refPayCostForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.PAY_COST, true);
                const promise = this.$refs[refPayCostForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PAY_COST);
                    //  打印票据
                    const printButton = document.getElementById('printButton');
                    console.log(printButton);
                    printButton.click();
                }).catch(error => {
                    console.log('有错');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.PAY_COST, false);
                });
            },
            //  确认退费
//            returnCostModalCheck(refReturnCostForm){
//                //  防止连点
//                this.setConfirmLoading(DIALOG_TYPE.RETURN_COST, true);
//                const promise = this.$refs[refReturnCostForm].handleSubmit();
//                promise.then(v => {
//                    this.hideModal(DIALOG_TYPE.RETURN_COST);
//                }).catch(error => {
//                    console.log('有错');
//                }).then(v => {
//                    //  最后设置可以再次点击
//                    this.setConfirmLoading(DIALOG_TYPE.RETURN_COST, false);
//                });
//            },
        }
    };
</script>
<style scoped>
    /*票据*/
    #paper {
        width: 600px;
        margin: 20px auto;
        border: 1px solid #e8e8e8;
    }
    
    .paper-list {
    
    }
    
    .paper-item {
        border-bottom: 1px solid #e8e8e8;
        line-height: 40px;
    }
    
    .paper-item:last-child {
        border: none;
    }
    
    .paper-item > div {
        border-left: 1px solid #e8e8e8;
        width: 25%;
        text-indent: 1em;
    }
    
    .paper-item > div.w-3 {
        width: 75%;
    }
    
    .paper-item > div:first-child {
        border: none;
    }
    
    .paper-item-flex {
        display: flex;
        justify-content: space-between;
    }
</style>