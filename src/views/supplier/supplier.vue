<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input class="lengthen-input-width" v-model="searchData.supplierName" placeholder="请输入供应商名称"/>
            <a-input class="lengthen-input-width" v-model="searchData.supplierNumber" placeholder="请输入供应商代码"/>
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
            <!--渠道商地区-->
            <div slot="area" slot-scope="scope,sItem,sIndex,extra">
                {{scope.province}}-{{scope.city}}
            </div>
            <!--切换状态-->
            <div slot="a-switch" slot-scope="scope,sItem,sIndex,extra">
                <a-switch checked-children="开" un-checked-children="关"
                          :checked="!!sItem.status"
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
    import {
        paginationInit,
        paginationDecode,
        paginationEncode,
        pageChange,
        onShowSizeChange
    } from '@/utils/pagination.ts';
    import { twoRowSearch } from '@/utils/tableScroll';
    import { requestSupplierChangeStatus, requestSupplierPage } from '../../api/supplier';

    const columns = [
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
            width: 120,
        },
        {
            title: '供应商代码',
            dataIndex: 'supplierNumber',
            width: 120,
        },
        {
            title: '供应商地区',
            scopedSlots: { customRender: 'area' },
            width: 150,
        },
        {
            title: '状态',
            scopedSlots: { customRender: 'a-switch' },
            width: 100,
        },
        {
            title: '操作',
            scopedSlots: { customRender: 'operation' },
            width: 100,
        },
    ];
    //  供应商管理
    export default {
        data(){
            return {
                //  搜索相关
                searchData: {},

                data: [],
                columns,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: twoRowSearch(columns),
                //  分页信息
                pagination: paginationInit(),
            };
        },
        created(){
            this.searchFn();
        },
        methods: {
            //  主要请求
            searchFn(){
                requestSupplierPage(Object.assign({}, this.searchData, paginationEncode(this.pagination)))
                    .then(v => {
                        const { data } = v;
                        data.records.forEach((item, index) => {
                            item.key = index;
                        });
                        this.data = data.records;
                        console.log(JSON.parse(JSON.stringify(this.data[0])));
                        this.pagination = paginationDecode(this.pagination, data);
                    });
            },

               onShowSizeChange,
            pageChange,

            //  切换状态
            aSwitchChange(sItem, checked){
                requestSupplierChangeStatus(sItem.id)
                    .then(v => {
                        sItem.status = !!checked;
                        this.$message.success('操作成功');
                    })
                    .catch(err => {
                        this.$message.error('操作失败');
                        sItem.status = !checked;
                        console.log(err);
                    });
            },
            //  编辑供应商
            editDistributors(sItem){
                this.$router.push({ name: 'editSupplier', params: { supplierId: sItem.id } });
            },
        },
    };
</script>