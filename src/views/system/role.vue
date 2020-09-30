<template>
    <div class="layout-content-inner-main">
        <p>角色管理</p>
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input default-value=""/>
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
                <!--                <router-link :to="{name:'addHospital'}">-->
                <a-button type="primary" @click="showModal()">
                    新建角色
                </a-button>
                <!--                </router-link>-->
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
                    slot="permissions"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a @click="toViewPermissions(sItem,sIndex)">查看</a>
            </div>
            <div slot="tags" slot-scope="scope,sItem,sIndex,extra">
                <a-space size="small">
                    <a @click="editPermissions(sItem,sIndex)">编辑</a>
                    <a @click="deletePermissions(sItem,sIndex)">删除</a>
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
        <!--莫泰框-->
        <a-modal v-model="dialogVisible"
                 v-if="dialogVisible"
                 :maskClosable="false"
                 :centered="true"
                 :width="800"
                 title="关联科室"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="modalCheck()">
            <RoleBox ref="refRoleBox"/>
        </a-modal>
    </div>
</template>
<script>
    import RoleBox from '@/components/roleBox.vue';
    import { dialogMethods } from '@/utils/methods';
    import { pagination } from '@/utils/pagination.js';

    const columns = [
        {
            title: '角色名称',
            dataIndex: 'hospital',
            width: 100,
        },
        {
            title: '角色描述',
            dataIndex: 'city',
            width: 100,
        },
        {
            title: '创建时间',
            dataIndex: 'status',
            width: 100,
        },
        {
            title: '创建人',
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: '权限',
            dataIndex: 'icon1',
            width: 100,
            scopedSlots: { customRender: 'permissions' },
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
            hospital: `xx医院`,
            city: '上海',
            status: String(i % 2),
            icon: '医院图标',
            tags: ['编辑', '关联科室'],
        });
    }
    export default {
        components: {
            RoleBox,
        },
        data(){
            return {
                data,
                columns,
                selectedRowKeys: [], // Check here to configure the default column

                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: { x: 820, y: 'calc(100vh - 398px)' },
                //  分页信息
                pagination,
                //  展示莫泰框
                dialogVisible: false,
            };
        },
        methods: {
            ...dialogMethods,
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

            //  检查莫泰框的值
            modalCheck(){
                const promise = this.$refs.refRoleBox.handleSubmit();
                promise.then(v => {
                    this.hideModal();
                }).catch(error => {
                    console.log('有错');
                });
            },
            //  查看权限
            toViewPermissions(){
                this.showModal();
            },
            //  编辑权限
            editPermissions(sItem){
                this.showModal();
            },
            //  删除权限
            deletePermissions(sItem){
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
<style scoped lang="stylus">
</style>
