<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
        </div>
        <div class="a-input-group">
            <a-range-picker class="basic-range-picker-width"
                            :placeholder="['开始日期','结束日期']"
                            @change="onRangePickerChange"
            />
            <a-space>
                <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
            </a-space>
        </div>
        <div class="a-input-group">
            <a-button type="primary" @click="confirmExecute">确认结算</a-button>
        </div>
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
                    <div class="statement-detail-content red">¥{{mainDta.cashPayMoney}}</div>
                </li>
                <li class="statement-detail-item">
                    <div class="statement-detail-label">微信收入总计</div>
                    <div class="statement-detail-content red">¥</div>
                </li>
                <li class="statement-detail-item">
                    <div class="statement-detail-label">支付宝收入总计</div>
                    <div class="statement-detail-content red">¥</div>
                </li>
                <li class="statement-detail-item footing">
                    <div class="statement-detail-label">本页合计</div>
                    <div class="statement-detail-content red">¥</div>
                </li>
                <li class="statement-detail-item footing">
                    <div class="statement-detail-label">总合计</div>
                    <div class="statement-detail-content red">¥{{mainDta.totalMoney}}</div>
                </li>
            </ul>
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
    import GoBackButton from '@/components/goBackButton.vue';
    import { onRangePickerChange } from '../../utils/monthly';
    import { requestSettlementMonthOverSelect, requestSettlementMosSave } from '../../api/statement/monthly';

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 100,
        },
        {
            title: '订单号',
            dataIndex: 'prescriptionCode',
            width: 100,
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
                //  分页信息
                pagination: paginationInit(),
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  搜索数据
                searchData: {
//                    settleStarttime: null,
//                    settleEndtime: null,
                    'settleEndtime': '2020-10-25',
                    'settleStarttime': '2020-09-25'
                },
                //  主要对象
                mainDta: {
                    totalMoney: 0,
                    cashPayMoney: 0,
                }
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestSettlementMonthOverSelect(Object.assign({},
                    { param: this.searchData },
                    paginationEncode(this.pagination)
                ))
                    .then(v => {
                        const { data } = v;
                        console.log(data);
                        const {
                            totalMoney,
                            cashPayMoney,
                            settlementList,
                        } = data;
                        Object.assign(this.mainDta, {
                            totalMoney,
                            cashPayMoney
                        });
                        settlementList.forEach((item, index) => {
                            item.key = item.id;
                            item.index = index + 1;
                        });
                        console.log(this.mainData);
                    });
            },

            //  确认结算
            confirmExecute(){
                this.$confirm({
                    title: `确认结算?`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        return requestSettlementMosSave(this.searchData)
                            .then(v => {
                                this.$message.success('操作成功');
                                this.$router.push({ name: 'monthly' });
                            })
                            .catch(v => {
                                this.$message.error('操作失败');
                            });
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
            pageChange,
            onShowSizeChange,
            onRangePickerChange,
        }
    };
</script>
<style scoped>
    @import "~@/css/statement.css";
</style>
