<template>
    <div class="layout-content-inner-main">
        <p>供应商管理</p>
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input default-value="" placeholder="请输入供应商名称"/>
                </a-col>
                <a-col :span="5">
                    <a-input default-value="" placeholder="请输入供应商代码"/>
                </a-col>
                <a-col :span="5">
                    <a-button type="primary">
                        搜索
                    </a-button>
                </a-col>
            </a-row>
        </a-input-group>
        <a-input-group class="a-input-group">
            <a-col :span="5">
                <router-link :to="{name:'addSupplier'}">
                    <a-button type="primary">
                        新增供应商
                    </a-button>
                </router-link>
            </a-col>
        </a-input-group>
        <!--表格-->
        <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
                    <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                    <span v-if="props.value === '50'">全部</span>
                </template>
            </a-pagination>
        </a-row>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { towRowSearch } from '../../utils/tableScroll';

    const columns = [
        {
            title: '供应商名称',
            dataIndex: 'hospital',
            width: 120,
        },
        {
            title: '供应商代码',
            dataIndex: 'city',
            width: 120,
        },
        {
            title: '供应商地区',
            dataIndex: 'area',
            width: 120,
        },
        {
            title: '添加人',
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: '添加时间',
            dataIndex: 'index',
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
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            hospital: `xx供应商`,
            city: '上海',
            status: String(i % 2),
            icon: '供应商图标',
            operation: ['编辑', '关联科室'],
        });
    }
    //  供应商管理
    export default {
        data(){
            return {
                data,
                columns,
                selectedRowKeys: [], // Check here to configure the default column
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,
                //  分页信息
                pagination,
            };
        },

        methods: {
            //  选中表格数据
            onSelectChange(selectedRowKeys){
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
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
            //  检查莫泰框的值
            modalCheck(){
                const promise = this.$refs.refAddOrEditDistributors.handleSubmit();
                promise.then(v => {
                    this.hideModal();
                }).catch(error => {
                    console.log('有错');
                });
            },
        },
    };
</script>
<style scoped lang="stylus">
</style>


