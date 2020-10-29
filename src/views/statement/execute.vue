<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <!--返回按钮-->
            <GoBackButton/>
        </div>
        <div class="a-input-group">
            <a-select class="lengthen-select-width" v-model="searchData.aaaa" placeholder="请选择会计部门">
                <a-select-option value="1">
                    这里有问题？这是什么列表
                </a-select-option>
                <a-select-option value="2">
                    这里有问题？这是什么列表
                </a-select-option>
            </a-select>
            <a-range-picker class="basic-range-picker-width"
                            :placeholder="['开始日期','结束日期']"
                            @change="onRangePickerChange"
            />
            <a-space>
                <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
                <a-button type="primary" @click="confirmExecute">确认结算</a-button>
            </a-space>
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
                    <div class="statement-detail-content red">¥32</div>
                </li>
                <li class="statement-detail-item">
                    <div class="statement-detail-label">微信收入总计</div>
                    <div class="statement-detail-content red">¥32</div>
                </li>
                <li class="statement-detail-item">
                    <div class="statement-detail-label">支付宝收入总计</div>
                    <div class="statement-detail-content red">¥32</div>
                </li>
                <li class="statement-detail-item footing">
                    <div class="statement-detail-label">本页合计</div>
                    <div class="statement-detail-content red">¥32</div>
                </li>
                <li class="statement-detail-item footing">
                    <div class="statement-detail-label">总合计</div>
                    <div class="statement-detail-content red">¥32</div>
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
    import { requestSettlementMonthOverSelect } from '../../api/statement/monthly';

    const columns = [
        {
            title: '序号',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '订单号',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '姓名',
            dataIndex: '通用名',
            width: 100,
        },
        {
            title: '住院号',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '类型',
            dataIndex: 'specifications',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: 'marketPrice',
            width: 100,
        },
        {
            title: '缴费金额',
            dataIndex: '222',
            width: 100,
        },
        {
            title: '缴费金额',
            dataIndex: '2223',
            width: 100,
        },
        {
            title: '退费金额',
            dataIndex: '2222',
            width: 100,
        },
        {
            title: '缴退方式',
            dataIndex: '22222',
            width: 100,
        },
        {
            title: '日期',
            dataIndex: '122222',
            width: 100,
        },
        {
            title: '收费员',
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
                    settleStarttime: null,
                    settleEndtime: null,
                },
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
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },

            //  确认结算
            confirmExecute(){
                this.$confirm({
                    title: `确认结算${'xxx'}`,
                    //  content: 'Bla bla ...',
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
            pageChange,
            onShowSizeChange,
            onRangePickerChange,
        }
    };
</script>
<style scoped>
    @import "~@/css/statement.css";
</style>
