<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group lengthen-search-group">
            <a-select v-model="searchData.status" class="lengthen-select-width" placeholder="请选择会计部门">
                <a-select-option value="">
                    状态
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-date-picker
                    class="lengthen-select-width"
                    placeholder="请选择开始日期"
                    v-model="searchData.startDateMoment"
                    @change="onStartDateChange"
            />
            <!--            <a-date-picker-->
            <!--                    class="lengthen-select-width"-->
            <!--                    placeholder="请选择结束日期"-->
            <!--                    v-model="searchData.endDateMoment"-->
            <!--                    @change="onEndDateChange"-->
            <!--            />-->
            <a-space>
                <a-button type="primary">
                    搜索
                </a-button>
                <a-button type="primary" @click="executeFn">执行日结</a-button>
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
                    <router-link :to="{name:'dailyDetail',params:{dailyDetailId:sIndex}}">详情</router-link>
                </a-space>
            </div>
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-pagination">
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
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '序号',
            dataIndex: 'commodity',
            width: 100,
        },
        {
            title: '日结日期',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '日结部门',
            dataIndex: '通用名',
            width: 100,
        },
        {
            title: '操作人',
            dataIndex: 'unit',
            width: 100,
        },
        {
            title: '日结执行时间',
            dataIndex: 'specifications',
            width: 150,
        },
        {
            title: '日结总额',
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
            dataIndex: 'operation',
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
                scroll: oneRowSearch,
                //  分页信息
                pagination,
                //  搜索数据
                searchData: {
                    startDateMoment: null,
                    endDateMoment: null,
                },
            };
        },
        methods: {
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
            //  选择过期日期
            onStartDateChange(value, selectDateValue){
                console.log(selectDateValue);
            },
//            //  选择过期日期
//            onEndDateChange(value, selectDateValue){
//                console.log(selectDateValue);
//            },
            //  执行日结
            executeFn(){
                this.$router.push({ name: 'dailyExecute', params: { dailyExecuteId: '33' } });
            }
        }
    };
</script>