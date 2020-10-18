<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.entrepotName" placeholder="请输入供应商名称"/>
            <a-input class="lengthen-input-width" v-model="searchData.entrepotCode" placeholder="请输入供应商代码"/>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addSupplier'}">
                <a-button type="primary">
                    新增供应商
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
            <div
                    slot="a-switch"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a-switch checked-children="开" un-checked-children="关"
                          :default-checked="!!sIndex"
                          @change="aSwitchChange(sItem,$event)"
                />
            </div>
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editDistributors(sItem)">编辑</a>
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
    import { twoRowSearch } from '@/utils/tableScroll';

    const columns = [
        {
            title: '供应商名称',
            dataIndex: 'hospital',
            width: 120,
        },
        {
            title: '供应商代码',
            dataIndex: 'code',
            width: 120,
        },
        {
            title: '供应商地区',
            dataIndex: 'area',
            width: 120,
        },
        {
            title: '添加人',
            dataIndex: 'people',
            width: 100,
        },
        {
            title: '添加时间',
            dataIndex: 'time',
            width: 120,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            scopedSlots: { customRender: 'a-switch' },
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            hospital: `xx供应商`,
            code: 'xxx-xx',
            city: '上海',
            status: String(i % 2),
            icon: '供应商图标',
            area: '地区',
            people: '许晓飞',
            time: '2020-10-10'
        });
    }
    //  供应商管理
    export default {
        data(){
            return {
                //  搜索相关
                searchData: {},

                data,
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
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

            //  切换状态
            aSwitchChange(sItem, checked){
                console.log(sItem, checked);
            },
            //  编辑供应商
            editDistributors(sItem){
                console.log(sItem);
                this.$router.push({ name: 'editSupplier', params: { supplierId: '12345' } });
            },
        },
    };
</script>