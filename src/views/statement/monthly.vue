<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-select class="lengthen-select-width" v-model="searchData.status" placeholder="请选择会计部门">
                <a-select-option value="">
                    状态
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-range-picker class="basic-range-picker-width"
                            :placeholder="['开始日期','结束日期']"
                            @change="onRangePickerChange"
            />
            <a-space>
                <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
                <a-button type="primary" @click="executeFn">
                    执行月结
                </a-button>
            </a-space>
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
                    <router-link :to="{name:'monthlyDetail',params:{monthlyDetailId:sIndex}}">详情</router-link>
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
    </div>
</template>
<script>
    import { paginationInit } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '序号',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '月结日期',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '月结部门',
            dataIndex: '通用名',
            width: 100,
        },
        {
            title: '操作人',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '月结执行时间',
            dataIndex: 'specifications',
            width: 150,
        },
        {
            title: '月结总额',
            dataIndex: 'marketPrice',
            width: 100,
        },
        {
            title: '实际销售金额',
            dataIndex: '222',
            width: 150,
        },
        {
            title: '操作',
            width: 100,
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
        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
                //  搜索数据
                searchData: {
                    startDateMoment: null,
                    endDateMoment: null,
                },
            };
        },
        methods: {
            //  主要请求
            searchFn(){

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
            //  选择日期范围
            onRangePickerChange(value, selectDateValue){
                console.log(selectDateValue);
            },
            //  执行月结
            executeFn(){
                this.$router.push({ name: 'monthlyExecute', params: { monthlyExecuteId: '122' } });
            }
        }
    };
</script>