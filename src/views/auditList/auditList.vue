<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入处方条码"/>
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入处方医生"/>
            <a-input class="basic-input-width" v-model="searchData.commodityName" placeholder="请输入患者姓名"/>
            <a-select v-model="searchData.brand" class="basic-select-width" placeholder="请选择科室">
                <a-select-option value="">
                    品牌
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-select v-model="searchData.status" class="basic-select-width" placeholder="请选择状态">
                <a-select-option value="">
                    状态
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-button type="primary" class="basic-button-width">搜索</a-button>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <router-link :to="{name:'auditDetail',params:{auditDetailId:sIndex}}">详情</router-link>
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
        },
        {
            title: '处方名称',
            dataIndex: 'aaa',
        },
        {
            title: '处方医生',
            dataIndex: '通用名',
        },
        {
            title: '开具时间',
            dataIndex: '商品分类',
        },
        {
            title: '科室',
            dataIndex: 'unit',
        },
        {
            title: '姓名',
            dataIndex: 'specifications',
        },
        {
            title: '性别',
            dataIndex: 'marketPrice',
        },
        {
            title: '年龄',
            dataIndex: 'manufacturer',
        },
        {
            title: '状态',
            dataIndex: 'update',
        },
        {
            title: '操作',
            dataIndex: 'operation',
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
                searchData: {},
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
        }
    };
</script>