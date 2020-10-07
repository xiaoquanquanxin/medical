<template>
    <div class="layout-content-inner-main">
        <!--搜索相关-->
        <a-input-group class="a-input-group">
            <a-row :gutter="8">
                <a-col :span="5">
                    <a-input v-model="name" placeholder="请输入姓名"/>
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
            <div
                    slot="familyGroup"
                    slot-scope="scope,sItem,sIndex,extra"
            >
                <a-space size="small">
                    <a @click="viewFamilyGroup(sItem)">查看</a>
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
        <a-modal v-model="dialogData.visible"
                 v-if="dialogData.visible"
                 :maskClosable="false"
                 centered
                 :width="800"
                 title="查看家庭组"
                 ok-text="确认"
                 cancel-text="取消"
                 @ok="hideModal()">
            <FamilyGroup/>
        </a-modal>
    </div>
</template>
<script>
    import { pagination } from '@/utils/pagination.ts';
    import { oneRowSearch } from '../../utils/tableScroll';
    import { dialogMethods, dialogData } from '@/utils/dialog';
    import FamilyGroup from '@/components/familyGroup.vue';
    import { mapGetters, mapActions } from 'vuex';

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
            title: '家庭组',
            dataIndex: 'familyGroup',
            width: 100,
            scopedSlots: { customRender: 'familyGroup' }
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
    //  普通用户
    export default {
        components: {
            FamilyGroup,
        },
        data(){
            return {

                data,
                columns,

                //  姓名
                name: null,
                //  设置横向或纵向滚动，也可用于指定滚动区域的宽和高
                scroll: oneRowSearch,

                //  分页信息
                pagination,
                //  莫泰框
                dialogData,
            };
        },
        methods: {
            //  莫泰框方法
            ...dialogMethods,
            //  家庭组信息
            ...mapActions('familyGroup', [
                'setViewFamilyGroupId',
            ]),
            //  搜索
            searchBtn(){
                console.log(this.name);
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
            //  查看家庭组
            viewFamilyGroup(sItem){
                console.log(sItem);
                this.setViewFamilyGroupId(12456789876543);
                this.showModal();
            },
        }
    };
</script>
<style lang="stylus">
</style>