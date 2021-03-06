<template>
    <div class="layout-content-inner-main">
        <div v-if="true">
            <!--搜索相关-->
            <div class="a-input-group">
                <a-input class="basic-input-width" v-model="searchData.prescriptionCode" placeholder="请输入处方号"/>
                <a-input class="basic-input-width" v-model="searchData.name" placeholder="请输入患者姓名"/>
                <a-select class="lengthen-select-width" v-model="searchData.isRefund" placeholder="请选择支付状态">
                    <a-icon slot="suffixIcon" type="caret-down" class="caret-down"/>
                    <a-select-option value="0">已缴费</a-select-option>
                    <a-select-option value="1">已退费</a-select-option>
                </a-select>
                <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
            </div>
            <p>需要告知列表判断是否展示缴费、退费按钮的区分字段；操作的具体字段。</p>
            <b class="red">缴费状态、是否可以缴费的判断可能是错的【前端】</b>
            <!--表格-->
            <a-table
                    :columns="columns"
                    :data-source="data"
                    :scroll="scroll"
                    :pagination="false"
            >
                <!--缴退状态（0,缴费，1,退款）)-->
                <div slot="isRefund" slot-scope="scope,sItem,sIndex,extra">
                    <span v-if="scope.isRefund == 0">已缴费</span>
                    <span v-if="scope.isRefund == 1">已退款</span>
                </div>
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
                        <router-link :to="{name:'costDetail',params:{detailId:scope.id}}">详情</router-link>
                        <a @click="payCost(sItem)" v-if="scope.payStatus == 0">缴费</a>
                        <a @click="returnCost(sItem)" v-if="scope.payStatus == 1">退费</a>
                        <a @click="requestBillingsBillingDetails(sItem.id)">打印</a>
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
        </div>
        <div v-show="false" data-msg="打印缴费凭证">
            <a-button class="basic-button-width" type="primary" v-print="printObj" id="printButton">打印</a-button>
            <div class="print-wrap">
                <div id="paper">
                    <a-row type="flex" justify="center">
                        <h2>缴费凭证</h2>
                    </a-row>
                    <a-row type="flex" justify="space-between" align="middle">
                        <a-col>{{printObj.hospitalName}}</a-col>
                        <a-col>缴费日期：{{printObj.payTime}}</a-col>
                    </a-row>
                    <a-divider/>
                    <div class="print-patient-basic-info">
                        <a-row type="flex" justify="start" align="middle">
                            <b class="weight-label">患者姓名:</b>
                            <span>{{printObj.name}}</span>
                        </a-row>
                        <a-row type="flex" justify="start" align="middle">
                            <b class="weight-label">住院号:</b>
                            <span>{{printObj.bedCode}}</span>
                        </a-row>
                        <a-row type="flex" justify="start" align="middle">
                            <b class="weight-label">科室:</b>
                            <span>{{printObj.deptName}}</span>
                        </a-row>
                        <a-row type="flex" justify="start" align="middle">
                            <b class="weight-label">详情如下:</b>
                        </a-row>
                    </div>
                    <a-table
                            :columns="printColumns"
                            :data-source="printObj.goodsList"
                            :pagination="false"
                            :bordered="true"
                    >
                    </a-table>
                    <a-row type="flex" justify="end" class="a-pagination">
                        amountPaid
                    </a-row>
                    <div class="print-patient-basic-info">
                        <a-row type="flex" justify="start" align="middle">
                            <b class="weight-label">操作人员:</b>
                            <span>{{printObj.createByName}}</span>
                        </a-row>
                        <a-row type="flex" justify="start" align="middle">
                            <b class="weight-label">打印时间:</b>
                            <span>{{printObj.printTime}}</span>
                        </a-row>
                    </div>
                </div>
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
    import { requestBillingsBillingDetails, requestBillingsBillingPage } from '../../api/cost/costList';

    //  数据列表
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
            title: '缴退金额',
            dataIndex: 'amountPayable',
            width: 100,
        },
        {
            title: '缴退状态',
            scopedSlots: { customRender: 'isRefund' },
            width: 100,
        },
        {
            title: '支付状态',
            scopedSlots: { customRender: 'payStatus' },
            width: 100,
        },
        {
            title: '收费时间',
            dataIndex: 'orderTime',
            width: 150,
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
    //  打印数据列表
    const printColumns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '营养产品名称',
            dataIndex: 'goodsName',
            width: 100,
        },
        {
            title: '数量',
            dataIndex: 'num',
            width: 100,
        },
        {
            title: '金额',
            dataIndex: 'price',
            width: 100,
        },
    ];

    export default {
        components: {
            PayCostForm,
        },
        computed: {
            //  操作类型	0,缴费，1退款）
            isRefund(){
                return this.$store.state.cost.isRefund;
            },
            //  支付id
            selectCostId(){
                return this.$store.state.cost.selectCostId;
            },
        },
        data(){
            return {
                data: [],
                columns,
                printColumns,
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

                //  打印对象
                printObj: {
                    id: '#paper',
                    //  popTitle: '票据',
                    hospitalName: undefined,
                    payTime: undefined,
                    name: undefined,
                    bedCode: undefined,
                    deptName: undefined,

                    //  列表数据
                    goodsList: undefined,
                    //  amountPaid: undefined,
                    createByName: undefined,
                    printTime: undefined,
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
                    this.searchData,
                    paginationEncode(this.pagination))
                )
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                            //  console.log(item.isRefund);
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                        console.log(JSON.parse(JSON.stringify(data.records[0])));

                        //  fixme   开发
                        //  this.returnCost(data.records[0]);
                    });
            },
            //  缴费
            payCost(sItem){
                console.log(sItem.id);
                this.setSelectCostId(sItem.id);
                this.setCostType(0);
                this.setDialogTitle(DIALOG_TYPE.PAY_COST, '缴费');
                this.showModal(DIALOG_TYPE.PAY_COST);
            },
            //  确认缴费、退费
            payCostModalCheck(refPayCostForm){
                //  防止连点
                this.setConfirmLoading(DIALOG_TYPE.PAY_COST, true);
                const promise = this.$refs[refPayCostForm].handleSubmit();
                promise.then(v => {
                    this.hideModal(DIALOG_TYPE.PAY_COST);
                    this.searchFn();
                    this.$message.success('操作成功');
                    //  如果是退费
                    if (this.isRefund === 1) {
                        return;
                    }
                    //  如果是缴费，需要先请求详情数据，然后打印
                    this.requestBillingsBillingDetails();
                }).catch(error => {
                    console.log(error);
                    console.log('有错');
                    this.$message.error('操作失败');
                }).then(v => {
                    //  最后设置可以再次点击
                    this.setConfirmLoading(DIALOG_TYPE.PAY_COST, false);
                });
            },
            //  缴费单详情
            requestBillingsBillingDetails(id){
                //  todo    id为开发使用
                requestBillingsBillingDetails(id || this.selectCostId)
                    .then(v => {
                        const { data } = v;
                        const { hospitalName, payTime, name, bedCode, deptName, createByName, printTime, amountPaid } = data;
                        const printObj = this.printObj;
                        printObj.hospitalName = hospitalName;
                        printObj.payTime = payTime;
                        printObj.name = name;
                        printObj.bedCode = bedCode;
                        printObj.deptName = deptName;
                        printObj.createByName = createByName;
                        printObj.printTime = printTime;
                        //  printObj.amountPaid = amountPaid;
                        console.log(hospitalName, payTime, name, bedCode, deptName, createByName, printTime,);
                        console.table(data);
                        data.goodsList.forEach((item, index) => {
                            item.key = index;
                            item.index = index + 1;
                            item.price = `¥${item.price}`;
                            item.num = `${item.quantity} ${item.goodsUnit}`;
                        });
                        data.goodsList.push({
                            key: -1,
                            num: '合计：',
                            price: `¥${amountPaid || 0}`,
                        });
                        //  console.log(JSON.parse(JSON.stringify(data.goodsList[0])));
                        printObj.goodsList = data.goodsList;
                        return;
                        this.$forceUpdate();
                        this.$nextTick(() => {
                            //  打印票据
                            const printButton = document.getElementById('printButton');
                            console.log(printButton);
                            printButton.click();
                        });
                    });
            },
            //  退费
            returnCost(sItem){
                this.setSelectCostId(sItem.id);
                this.setCostType(1);
                this.setDialogTitle(DIALOG_TYPE.PAY_COST, '退费');
                this.showModal(DIALOG_TYPE.PAY_COST);
            },
            //  展示的每一页数据变换
            onShowSizeChange,
            //  切换分页页码
            pageChange,

            //  莫泰框方法
            ...dialogMethods,
            ...mapActions('cost', [
                //  弹框id
                'setSelectCostId',
                //  操作类型	0,缴费，1退款
                'setCostType',
            ]),
        }
    };
</script>
<style scoped>
    .print-wrap {
        margin: 20px auto;
        width: 600px;
    }
    
    /*风格线⚠️保留*/
    .ant-divider-horizontal {
        margin: .6em 0;
    }
    
    /*重点label文字*/
    .weight-label {
        width: 70px;
        margin-right: 1em;
    }
    
    .print-patient-basic-info {
        line-height: 2.4em;
    }
    
    /*@page {*/
    /*    size: 8.5in 11in ;*/
    /*    margin: 2cm;*/
    /*}*/
</style>