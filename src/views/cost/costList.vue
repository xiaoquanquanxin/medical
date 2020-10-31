<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.prescriptionCode" placeholder="请输入处方号"/>
            <a-input class="basic-input-width" v-model="searchData.name" placeholder="请输入患者姓名"/>
            <a-select class="lengthen-select-width" v-model="searchData.payStatus" placeholder="请选择支付状态">
                <a-select-option value="0">待支付</a-select-option>
                <a-select-option value="1">已支付</a-select-option>
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
            <!--支付状态(0,待支付,1,已支付)-->
            <div slot="payStatus" slot-scope="scope,sItem,sIndex,extra">
                <span v-if="scope.payStatus == 0">待支付</span>
                <span v-if="scope.payStatus == 1">已支付</span>
            </div>
            <!--操作-->
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <!--{{scope.isRefund}}-->
                <!--退费了，支付状态不变，处方状态也不变，缴费方式变，是缴费，还是退费-->
                <a-space>
                    <router-link :to="{name:'costDetail',params:{detailId:sItem.id}}">详情</router-link>
                    <a @click="payCost(sItem)" v-if="scope.payStatus == 0">缴费</a>
                    <span v-if="scope.isRefund == 0">
                    <a @click="returnCost(sItem)" v-if="scope.payStatus == 1">退费</a>
                        </span>
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
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';
    import { dialogMethods, DIALOG_TYPE } from '@/utils/dialog';
    import { mapGetters, mapActions } from 'vuex';
    import PayCostForm from '@/components/cost/payCostForm.vue';
    import { requestBillingsBillingPage } from '../../api/cost/costList';

    const columns = [
        {
            title: '处方号',
            dataIndex: 'prescriptionCode',
            width: 200,
        },
        {
            title: '患者姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'deptName',
            width: 100,
        },
        {
            title: '床号',
            dataIndex: 'bedCode',
            width: 100,
        },
        {
            title: '缴费金额',
            dataIndex: 'amountPayable',
            width: 100,
        },
        {
            title: '支付状态',
            scopedSlots: { customRender: 'payStatus' },
            width: 100,
        },
        {
            title: '收费时间',
            dataIndex: 'payTime',
            width: 100,
        },
        {
            title: '收费人',
            dataIndex: 'doctorName',
            width: 100,
        },
        {
            title: '操作',
            width: 200,
            scopedSlots: { customRender: 'operation' },
        },
    ];

    export default {
        components: {
            PayCostForm,
        },
        data(){
            return {
                data: [],
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
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestBillingsBillingPage(Object.assign({},
                    { param: this.searchData },
                    paginationEncode(this.pagination))
                )
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(data.records[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },
            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('cost', [
                //  弹框id
                'setSelectCostData',
                //  操作类型	0,缴费，1退款
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
                this.setSelectCostData(sItem);
                this.setCostType(0);
                this.setDialogTitle(DIALOG_TYPE.PAY_COST, '缴费');
                this.showModal(DIALOG_TYPE.PAY_COST);
            },
            //  退费
            returnCost(sItem){
                this.setSelectCostData(sItem);
                this.setCostType(1);
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