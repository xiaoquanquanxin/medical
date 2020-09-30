<template>
    <div class="layout-content-inner-main">
        <p>用户管理</p>
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="name" placeholder="请输入姓名"/>
                </a-col>
                <a-col :span="5">
                    <a-input v-model="doctor" placeholder="请输入主治医生"/>
                </a-col>
                <a-col :span="5">
                    <a-input v-model="hospital" placeholder="请输入医院"/>
                </a-col>
                <a-col :span="5">
                    <a-input v-model="department" placeholder="请输入科室"/>
                </a-col>
                <a-col :span="4">
                    <a-button type="primary" @click="searchBtn()">搜索</a-button>
                </a-col>
            </a-row>
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
                    slot="familyGroup"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <router-link :to="{name: 'familyGroup', params:{familyGroup: sIndex}}">
                    {{sItem.familyGroup}}
                </router-link>
            </div>
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editUser(sItem,sIndex,extra)">编辑</a>
                    <a @click="deleteUser(sItem)">删除</a>
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
    import { oneRowSearch } from '../../utils/tableScroll';

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
        },
        {
            title: '医院',
            dataIndex: '',
            width: 100,
        },
        {
            title: '科室',
            dataIndex: '',
            width: 100,
        },
        {
            title: '主治医生',
            dataIndex: '',
            width: 100,
        },
        {
            title: '家庭组',
            dataIndex: 'familyGroup',
            width: 100,
            scopedSlots: { customRender: 'familyGroup' }
        },
        {
            title: '小程序id',
            dataIndex: 'applets',
            width: 100,
        },
        {
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            scopedSlots: { customRender: 'tags' },
        },
    ];
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            department: `xx科室`,
            status: String(i % 2),
            familyGroup: 'xxx',
            tags: ['编辑', '删除', '关联疾病'],
        });
    }
    //  用户管理
    export default {
        data(){
            return {
                name: null,
                doctor: null,
                hospital: null,
                department: null,

                data,
                columns,
                selectedRowKeys: [], // Check here to configure the default column

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  分页信息
                pagination,
            };
        },
        methods: {
            //  搜索
            searchBtn(){
                console.log(this.name);
                console.log(this.doctor);
                console.log(this.hospital);
                console.log(this.department);
            },
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
            //  编辑用户
            editUser(sItem, sIndex){
                this.$router.push({ name: 'editUser', params: { userId: sIndex } });
            },
            //  删除用户
            deleteUser(sItem){
                console.log(sItem);
                this.$confirm({
                    title: `确定删除${sItem.disease}`,
                    //  content: 'Bla bla ...',
                    okText: '确认',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk(){
                        return new Promise((resolve, reject) => {
                            console.log('发请求');
                            setTimeout(Math.random() > 0.5 ? resolve : reject, 1111);
                        }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel(){
                        console.log('取消');
                    },
                });
            },
        }
    };
</script>
<style lang="stylus">
</style>