<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group" v-if="false">
            <!--            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入订单号"/>-->
            <!--            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入住院号"/>-->
            <!--            <a-select v-model="searchData.status" class="lengthen-select-width" placeholder="请选择缴费类型">-->
            <!--                <a-select-option value="">-->
            <!--                    状态-->
            <!--                </a-select-option>-->
            <!--                <a-select-option value="Option2">-->
            <!--                    Option2-->
            <!--                </a-select-option>-->
            <!--            </a-select>-->
        </div>
        <div class="a-input-group">
            <!--<a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>-->
            <!--返回按钮-->
            <GoBackButton/>
            <a-button class="basic-button-width" type="primary" v-print="printObj">打印</a-button>
        </div>
        <div id="printContent">
            <!--表格-->
            <a-table
                    :columns="columns"
                    :data-source="data"
                    :scroll="scroll"
                    :pagination="false"
            >
            </a-table>
            <div>
                <ul class="statement-detail-list">
                    <li class="statement-detail-item">
                        <div class="statement-detail-label">现金收入总计</div>
                        <div class="statement-detail-content red">¥{{mainData.cashPayMoney}}</div>
                    </li>
                    <li class="statement-detail-item" v-if="false">
                        <div class="statement-detail-label">微信收入总计</div>
                        <div class="statement-detail-content red">¥</div>
                    </li>
                    <li class="statement-detail-item" v-if="false">
                        <div class="statement-detail-label">支付宝收入总计</div>
                        <div class="statement-detail-content red">¥</div>
                    </li>
                    <li class="statement-detail-item footing">
                        <div class="statement-detail-label">本页合计</div>
                        <div class="statement-detail-content red">¥{{mainData.totalMoney}}</div>
                    </li>
                    <li class="statement-detail-item footing">
                        <div class="statement-detail-label">总合计</div>
                        <div class="statement-detail-content red">¥{{mainData.totalMoney}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { oneRowSearch } from '@/utils/tableScroll';
    import GoBackButton from '@/components/goBackButton.vue';
    import { requestSettlementyjxq } from '../../api/statement/monthly';
    import { noPaginationData } from '../../utils/pagination';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '订单号',
            dataIndex: 'prescriptionCode',
            width: 200,
        },
        {
            title: '姓名',
            dataIndex: 'natureName',
            width: 100,
        },
        {
            title: '住院号',
            dataIndex: 'hospitalCode',
            width: 100,
        },
        {
            title: '类型',
            dataIndex: 'isRefund',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'marketPrice',
            width: 100,
        },
        {
            title: '缴费金额',
            dataIndex: 'payMoney',
            width: 100,
        },
        {
            title: '退费金额',
            dataIndex: 'refundPrice',
            width: 100,
        },
        {
            title: '缴退方式',
            dataIndex: 'payWay',
            width: 100,
        },
    ];

    export default {
        components: {
            GoBackButton,
        },
        data(){
            return {
                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  搜索数据
                searchData: {
                    settleStarttime: null,
                    settleEndtime: null,
                },

                //  路由id
                dailyDetailId: this.$route.params.dailyDetailId,
                monthlyDetailId: this.$route.params.monthlyDetailId,

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '日结详情',
                },

                //  主要对象
                mainData: {
                    totalMoney: 0,
                    cashPayMoney: 0,
                }
            };
        },
        created(){
            console.log('日结id', this.dailyDetailId);
            console.log('月结id', this.monthlyDetailId);
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestSettlementyjxq(Object.assign({}, noPaginationData, {
                    param: {
                        statementId: this.monthlyDetailId
                    },
                }))
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const {
                            totalMoney,
                            cashPayMoney,
                            settlementList,
                        } = data;
                        Object.assign(this.mainData, {
                            totalMoney,
                            cashPayMoney
                        });
                        settlementList.forEach((item, index) => {
                            item.key = item.id;
                            item.index = index + 1;
                            item.refundPrice = item.refundPrice || 0;
                        });
                        this.data = settlementList;
                        console.log(this.mainData);
                    });
            },
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
        }
    };
</script>
<style scoped>
    @import "~@/css/statement.css";
</style>
