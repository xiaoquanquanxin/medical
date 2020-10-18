<template>
    <div class="layout-content-inner-main">
        <p>宣教管理</p>
        <!--搜索相关-->
        <div class="a-input-group">
            <a-input/>
            <a-select>
                <a-select-option value="Option1">
                    Option1
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-select>
                <a-select-option value="Option1">
                    Option1
                </a-select-option>
                <a-select-option value="Option2">
                    Option2
                </a-select-option>
            </a-select>
            <a-button class="basic-button-width" type="primary" @click="searchFn">搜索</a-button>
        </div>
        <div class="a-input-group">
            <router-link :to="{name:'addMission'}">
                <a-button type="primary">
                    新增宣教
                </a-button>
            </router-link>
        </div>
        <!--表格-->
        <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="columns"
                :data-source="data"
                :scroll="scroll"
                :pagination="false"
        >
            <div slot="operation" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editMission(sItem,sIndex,extra)">编辑</a>
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
    import { towRowSearch } from '@/utils/tableScroll';
    import { pagination } from '@/utils/pagination.ts';

    const columns = [
        {
            title: '文章名称',
            dataIndex: 'hospital',
            width: 100,
        },
        {
            title: '阅读量',
            dataIndex: 'city',
            width: 100,
        },
        {
            title: '文章类型',
            dataIndex: 'status',
            width: 100,
        },
        {
            title: '添加时间',
            dataIndex: 'icon',
            width: 100,
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
            hospital: `xx医院`,
            city: '上海',
            status: String(i % 2),
            icon: '医院图标',

        });
    }
    export default {
        data(){
            return {
                data,
                columns,

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: towRowSearch,
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

            //  编辑
            editMission(sItem, sIndex){
                this.$router.push({ name: 'editMission', params: { missionId: 123 } });
            }
        }
    };
</script>