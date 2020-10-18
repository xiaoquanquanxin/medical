<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入订单号"/>
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入住院号"/>
            <a-select v-model="searchData.status" class="lengthen-select-width" placeholder="请选择缴费类型">
                <a-select-option value="">
                    状态
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-select v-model="searchData.status" class="lengthen-select-width" placeholder="请选择会计部门">
                <a-select-option value="">
                    状态
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-range-picker
                    class="basic-range-picker-width"
                    :placeholder="['开始日期','结束日期']"
                    @change="onRangePickerChange"
            />
            <a-space>
                <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
                <a-button class="basic-button-width" type="primary" v-print="printObj">打印</a-button>
            </a-space>
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
    </div>
</template>
<script>
    import { oneRowSearch } from '@/utils/tableScroll';

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
    const data = [];
    for (let i = 0; i < 4; i++) {
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

        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,
                //  搜索数据
                searchData: {
                    startDateMoment: null,
                    endDateMoment: null,
                },

                //  路由id
                dailyDetailId: this.$route.params.dailyDetailId,
                monthlyDetailId: this.$route.params.monthlyDetailId,

                //  打印对象
                printObj: {
                    id: '#printContent',
                    popTitle: '日结详情',
                },
            };
        },
        created(){
            console.log('日结id', this.dailyDetailId);
            console.log('月结id', this.monthlyDetailId);
        },
        methods: {
            //  主要请求
            searchFn(){

            },
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
            //  选择日期范围
            onRangePickerChange(value, selectDateValue){
                console.log(selectDateValue);
            },
        }
    };
</script>
<style scoped>
    @import "~@/css/statement.css";
</style>
