<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group" data-msg="空"></div>
        <div class="a-input-group">
            <router-link :to="{name:'addQuestionnaire'}">
                <a-button type="primary">
                    新增调查表
                </a-button>
            </router-link>
        </div>
        <!--表格-->
        <a-table
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <router-link :to="{name:'editQuestionnaire',params:{questionnaireId:'2332'}}">编辑</router-link>
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
            title: '评估表名称',
            width: 100,
            dataIndex: 'evaluationSheet',
        },
        {
            title: '操作',
            width: 100,
            scopedSlots: { customRender: 'operation' }
        },
    ];
    const data = [
        {
            key: 1,
            evaluationSheet: `xx调查表`,
        },
        {
            key: 2,
            evaluationSheet: `xx调查表`,
        },
        {
            key: Math.random(),
            evaluationSheet: `xx调查表`,
        },
        {
            key: Math.random(),
            evaluationSheet: `xx调查表`,
        },
        {
            key: Math.random(),
            evaluationSheet: `xx调查表`,
        },
        {
            key: Math.random(),
            evaluationSheet: `xx调查表`,
        },
        {
            key: Math.random(),
            evaluationSheet: `xx调查表`,
        },
        {
            key: Math.random(),
            evaluationSheet: `xx调查表`,
        },

        {
            key: Math.random(),
            evaluationSheet: `xx调查表`,
        },
    ];
    export default {
        data(){
            return {
                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch(columns),

                //  分页信息
                pagination,

            };
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
        }
    };
</script>