<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="searchData.commodityName" placeholder="请输入商品名称"/>
                </a-col>
                <a-col :span="5">
                    <a-input v-model="searchData.itemNo" placeholder="请输入商品货号"/>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.brand"
                            style="width:100%;"
                            placeholder="请选择品牌"
                    >
                        <a-select-option value="1600">1600</a-select-option>
                        <a-select-option value="160">160</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.classification"
                            style="width:100%;"
                            placeholder="请选择分类"
                    >
                        <a-select-option value="1600">1600</a-select-option>
                        <a-select-option value="160">160</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select
                            v-model="searchData.status"
                            style="width:100%;"
                            placeholder="请选择商品状态"
                    >
                        <a-select-option value="1600">1600</a-select-option>
                        <a-select-option value="160">160</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
        </a-table>
        <!--分页-->
        <a-row type="flex" justify="end" class="a-input-group">
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
    import { oneRowSearch } from '../../utils/tableScroll';

    const columns = [
        {
            title: '商品货号',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '商品名称',
            dataIndex: 'aaa',
            width: 100,
        },
        {
            title: '通用名',
            dataIndex: 'bbb',
            width: 100,
        },
        {
            title: '商品分类',
            dataIndex: 'ccc',
            width: 100,
        },
        {
            title: '基本单位',
            dataIndex: 'dddd',
            width: 100,
        },
        {
            title: '规格',
            dataIndex: 'eeee',
            width: 100,
        },
        {
            title: '市场价',
            dataIndex: 'ffff',
            width: 100,
        },
        {
            title: '生产厂家',
            dataIndex: 'gg',
            width: 100,
        },
        {
            title: '品牌',
            dataIndex: 'hhh',
            width: 100,
        },
        {
            title: '供应商',
            dataIndex: 'iii',
            width: 100,
        }, {
            title: '更新时间',
            dataIndex: 'jjjj',
            width: 100,
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: '权鑫',
            sex: '男',
            familyGroup: 'xxx',
        });
    }
    //  商品查看
    export default {
        data(){
            return {
                data,
                columns,
                searchData: {
                    //  仓库名称
                    //  entrepotName: null,
                    //  仓库代码
                    //  entrepotCode: null,
                },

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  分页信息
                pagination,
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